/**
 * Contact form handler for www.advspine.org (Advanced Spine and Pain Specialists)
 * Runtime: Node.js 22, called through a Lambda Function URL.
 * Sends the request to the clinic by email using Amazon SES.
 *
 * Two emails are sent: the request to the clinic, and a short confirmation to the person
 * who filled the form (only when they gave an email address).
 *
 * Environment variables (Lambda console > Configuration > Environment variables):
 *   FROM_EMAIL       sender on a domain verified in SES,
 *                    e.g. "Advanced Spine and Pain Specialists <forms@ironhealthsolutions.com>"
 *   TO_EMAILS        comma separated recipients, e.g. info@advspine.org
 *   ALLOWED_ORIGINS  (optional) extra site addresses to allow, comma separated, no trailing slash
 *
 * The function role needs ses:SendEmail (see lambda/README.md).
 * Spam protection: origin check, hidden trap field ("website"), and a minimum fill time ("elapsed", 3 seconds).
 * Privacy: the visitor's details and message are never written to the logs.
 */
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const ses = new SESv2Client({});

/** Sites allowed to use this form. Add more through the ALLOWED_ORIGINS variable if needed. */
const DEFAULT_ORIGINS = ['https://www.advspine.org', 'https://advspine.org', 'http://localhost:4321'];

/** Shown in the confirmation email. */
const CLINIC = {
  name: 'Advanced Spine and Pain Specialists',
  doctor: 'Dr. Andrew M. Khoury',
  phone: '281-868-7246',
  phoneHref: 'tel:+12818687246',
  offices: [
    'The Woodlands: 25305 Interstate 45, The Woodlands, TX 77380 (Mon to Fri, 8:00 AM to 5:00 PM)',
    'Liberty: 2708 Jefferson Dr, Suite B, Liberty, TX 77575 (Tuesdays, 8:00 AM to 5:00 PM)',
  ],
  site: 'https://www.advspine.org',
};

/** Fastest a real person can fill in the form. Anything quicker is treated as a bot. */
const MIN_FILL_MS = 3000;

const esc = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const confirmationText = (name) =>
  [
    `Hello ${name},`,
    '',
    'Thank you for contacting Advanced Spine and Pain Specialists. We have received your appointment request.',
    'A member of our team will call you back within one business day.',
    '',
    `If your matter is urgent, please call us at ${CLINIC.phone}.`,
    'If this is a medical emergency, call 911 or go to the nearest emergency room.',
    '',
    'For your privacy, please do not reply to this email with medical records. We will ask for them securely once we have spoken.',
    '',
    CLINIC.name,
    ...CLINIC.offices,
    CLINIC.phone,
    CLINIC.site,
  ].join('\n');

const confirmationHtml = (name) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#f3f5fa;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f5fa;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e1e6f0;">
<tr><td style="background:#0b1d42;padding:28px 32px;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:22px;">Advanced Spine and Pain Specialists</td></tr>
<tr><td style="padding:32px;font-family:Arial,Helvetica,sans-serif;color:#333333;font-size:16px;line-height:1.6;">
<p style="margin:0 0 16px;font-size:20px;color:#0b1d42;font-family:Georgia,'Times New Roman',serif;">Hello ${esc(name)},</p>
<p style="margin:0 0 16px;">Thank you for contacting our office. We have received your appointment request.</p>
<p style="margin:0 0 16px;">A member of our team will call you back within <strong>one business day</strong>.</p>
<p style="margin:0 0 16px;">If your matter is urgent, please call us at <a href="${CLINIC.phoneHref}" style="color:#2f66d6;">${esc(CLINIC.phone)}</a>. If this is a medical emergency, call 911 or go to the nearest emergency room.</p>
<p style="margin:0;font-size:14px;color:#666666;">For your privacy, please do not reply to this email with medical records. We will ask for them securely once we have spoken.</p>
</td></tr>
<tr><td style="padding:20px 32px;background:#f8f9fc;border-top:1px solid #e1e6f0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#666666;line-height:1.6;">
${esc(CLINIC.doctor)}<br>${CLINIC.offices.map(esc).join('<br>')}<br>${esc(CLINIC.phone)}<br>
<a href="${CLINIC.site}" style="color:#666666;">${CLINIC.site.replace('https://', '')}</a>
</td></tr>
</table>
</td></tr></table>
</body></html>`;

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const clean = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, ' ');
const recipients = () => (process.env.TO_EMAILS ?? '').split(',').map((s) => s.trim()).filter(Boolean);

export const handler = async (event) => {
  const method = event.requestContext?.http?.method;
  if (method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  // Only accept requests that come from our own website.
  const extra = (process.env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean);
  const origin = event.headers?.origin ?? '';
  if (![...DEFAULT_ORIGINS, ...extra].includes(origin)) return json(403, { ok: false, error: 'Not allowed' });

  let data;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body ?? '', 'base64').toString('utf8') : event.body ?? '';
    if (raw.length > 10000) return json(413, { ok: false, error: 'Too large' });
    data = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'Invalid request' });
  }

  // Bot trap 1: a hidden field real people never see or fill in.
  // Bot trap 2: the time the form was open before sending. People need several seconds,
  // bots send instantly (or skip the script that measures it).
  // For both, pretend it worked so the bot gets no hint, and send nothing.
  const elapsed = Number(data.elapsed);
  if (clean(data.website, 200)) {
    console.log('blocked: trap field filled');
    return json(200, { ok: true });
  }
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.log('blocked: sent too fast', Number.isFinite(elapsed) ? Math.round(elapsed) : 'missing');
    return json(200, { ok: true });
  }

  const name = oneLine(data.name, 100);
  const phone = oneLine(data.phone, 30);
  const email = oneLine(data.email, 150);
  const location = oneLine(data.location, 60);
  const provider = oneLine(data.provider, 100);
  const interest = oneLine(data.interest, 100);
  const message = clean(data.message, 2000);

  if (name.length < 2) return json(400, { ok: false, error: 'Please enter your name.' });
  if (!/^[0-9+()\-.\s]{7,30}$/.test(phone)) return json(400, { ok: false, error: 'Please enter a valid phone number.' });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { ok: false, error: 'Please enter a valid email address.' });

  const text = [
    'New appointment request from www.advspine.org',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || 'not given'}`,
    `Preferred office: ${location || 'not given'}`,
    `Provider: ${provider || 'no preference'}`,
    `Interested in: ${interest || 'not sure yet'}`,
    '',
    'Message:',
    message || '(none)',
    '',
    `Sent: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central Time)`,
  ].join('\n');

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: process.env.FROM_EMAIL,
        Destination: { ToAddresses: recipients() },
        ReplyToAddresses: email ? [email] : undefined,
        Content: {
          Simple: {
            Subject: { Data: `Website appointment request: ${name}${location ? ` (${location})` : ''}`, Charset: 'UTF-8' },
            Body: { Text: { Data: text, Charset: 'UTF-8' } },
          },
        },
      }),
    );
    console.log('contact request sent');
  } catch (err) {
    console.error('SES error', err?.name);
    return json(500, { ok: false, error: `We could not send your request. Please call us at ${CLINIC.phone}.` });
  }

  // Confirmation to the person who filled the form. The request above already went through,
  // so a problem here must never make the visitor think the request failed.
  let confirmed = false;
  if (email) {
    try {
      const firstName = name.split(' ')[0];
      const replyTo = recipients()[0];
      await ses.send(
        new SendEmailCommand({
          FromEmailAddress: process.env.FROM_EMAIL,
          Destination: { ToAddresses: [email] },
          ReplyToAddresses: replyTo ? [replyTo] : undefined,
          Content: {
            Simple: {
              Subject: { Data: 'We received your request | Advanced Spine and Pain Specialists', Charset: 'UTF-8' },
              Body: {
                Text: { Data: confirmationText(firstName), Charset: 'UTF-8' },
                Html: { Data: confirmationHtml(firstName), Charset: 'UTF-8' },
              },
            },
          },
        }),
      );
      confirmed = true;
      console.log('confirmation sent');
    } catch (err) {
      console.error('Confirmation error', err?.name);
    }
  }

  return json(200, { ok: true, confirmed });
};
