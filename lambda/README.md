# Contact form (AWS Lambda)

The "Request an appointment" form posts to an AWS Lambda Function URL, which emails the clinic through Amazon SES.

| Setting | Value |
|---|---|
| Function | `advspine-contact-form` (us-east-1), code in `contact/index.mjs` |
| Function URL | `site.contactApi` in `src/data/site.ts` (auth: NONE, CORS: www.advspine.org, advspine.org, localhost:4321; POST; header content-type) |
| `FROM_EMAIL` | `Advanced Spine and Pain Specialists <info@ironhealthsolutions.com>` (domain verified in SES) |
| `TO_EMAILS` | `info@advspine.org` (comma separate to add more) |
| Role | `advspine-contact-form-role-gsdx0i1c` with inline policy `send-contact-email` (`ses:SendEmail`) |
| Timeout | 10 seconds |

To change the code: edit `contact/index.mjs`, then paste it into the Lambda console code editor and click Deploy.

Spam protection: origin check, hidden `website` trap field (bots fill it in), minimum fill time of 3 seconds (`elapsed`, measured in the browser), input validation. Blocked requests get a fake "ok" and send nothing.
Privacy: the visitor's details are never written to CloudWatch logs.
