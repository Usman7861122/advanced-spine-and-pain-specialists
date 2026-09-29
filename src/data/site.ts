/**
 * All site content lives here. Change text/images once, updates everywhere.
 *
 * Images: photos from the practice's current website (advspine.org) and free photos
 * from Unsplash (unsplash.com/license) are linked from their CDNs for now.
 * Run `npm run images` to download them all into /public/images/advspine and switch
 * these links to local files.
 */

/** Unsplash photo by id, cropped to the width we need. */
const unsplash = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Files on the current advspine.org website. */
const PP = 'https://sa1s3optim.patientpop.com/assets';
const PPI = `${PP}/production/practices/9ad76f4d18372bb977f3707403818f5c30da69d1/images`;

const remote = {
  // Practice (advspine.org)
  logo: `${PP}/images/provider/photos/2535103.png`,
  khouryWorsham: `${PP}/docs/449520.jpg`,
  khoury: `${PP}/docs/449519.jpg`,
  jones: `${PP}/docs/461550.jpg`,
  worsham: `${PP}/docs/449518.jpg`,
  best2025: `${PPI}/2809348.jpg`,
  best2024: `${PPI}/2809353.jpg`,
  memorialHermann: `${PP}/docs/298074.png`,
  houstonMethodist: `${PP}/docs/298075.png`,
  bannerNeck: `${PPI}/1997784.jpg`,
  bannerBack: `${PPI}/1997786.jpg`,
  bannerKnee: `${PPI}/1997787.jpg`,
  bannerWrist: `${PPI}/1997788.jpg`,
  // Unsplash
  consultSmile: unsplash('1631217868264-e5b90bb7e133'),
  consultOffice: unsplash('1758691461935-202e2ef6b69f'),
  consultNotes: unsplash('1758691462878-6edc3d3da1be'),
  consultWoman: unsplash('1758691462858-f1286e5daf40'),
  comfort: unsplash('1758691462071-757bca955439'),
  tablet: unsplash('1666886573531-48d2e3c2b684'),
  legExam: unsplash('1649751361457-01d3a696c7e6'),
  neckGlow: unsplash('1767972463825-96eaa9e0766b'),
  neckTouch: unsplash('1615997380705-504484cd99c4'),
  neckBack: unsplash('1701826510629-051bb954fb8f'),
  headache: unsplash('1714646183974-099d000b6a84'),
  spineModel: unsplash('1772122028898-1640a4dd2d7f'),
  xray: unsplash('1763198302249-db661c45bf7d'),
  waitingRoom: unsplash('1762625570087-6d98fca29531'),
  handPain: unsplash('1769029262388-3ebd4e4e37d0'),
  stretch: unsplash('1540205895360-4ad4cffb3aa8'),
  kneeBrace: unsplash('1619684736572-cf0a43823d87'),
};

/** Set to true by `npm run images` once every photo is saved in /public/images/advspine. */
const USE_LOCAL_IMAGES = true;
const PNG = ['logo', 'memorialHermann', 'houstonMethodist'];
const photo = (
  USE_LOCAL_IMAGES
    ? Object.fromEntries(Object.keys(remote).map((k) => [k, `/images/advspine/${k}.${PNG.includes(k) ? 'png' : 'jpg'}`]))
    : remote
) as typeof remote;

export const images = {
  logo: photo.logo,
  logoDark: photo.logo,
  /** Home hero: Dr. Khoury and Amanda Worsham, FNP-C. */
  hero: '/images/advspine/main.jpg',
  /** Same photo with the backdrop extended upward, for full-screen desktop heroes. */
  heroTall: '/images/advspine/main-tall.jpg',
  /** Wide photo for the About page title band. */
  headshotWide: photo.khouryWorsham,
  /** Portrait of Dr. Khoury. */
  doctorPortrait: photo.khoury,
  spineModel: photo.spineModel,
  /** 7-second Higgsfield animation of the spine model (herniated disc → pain → relief). */
  spineVideoWebm: '/images/advspine/spine-disc.webm',
  spineVideo: '/images/advspine/spine-disc.mp4',
  spineVideoPoster: '/images/advspine/spine-disc-poster.jpg',
  consultSeated: photo.consultOffice,
  consultWindow: photo.consultSmile,
  handshake: photo.comfort,
  handshakeScreen: photo.consultWoman,
  waitingRoom: photo.waitingRoom,
  xray: photo.xray,
  stenosis: photo.xray,
  /** Houston Chronicle Best of the Best badges. */
  awardBadges: [
    { src: photo.best2025, alt: 'Houston Chronicle Best of the Best 2025' },
    { src: photo.best2024, alt: 'Houston Chronicle Best of the Best 2024 Finalist' },
  ],
  gallery: [
    { src: photo.khouryWorsham, alt: 'Dr. Andrew Khoury and Amanda Worsham, FNP-C' },
    { src: photo.waitingRoom, alt: 'A calm, modern waiting room' },
    { src: photo.khoury, alt: 'Dr. Andrew M. Khoury, MD' },
    { src: photo.consultSmile, alt: 'A provider talking with a patient' },
    { src: photo.jones, alt: 'Dr. Amy Jones, MD' },
    { src: photo.spineModel, alt: 'Spine model used to explain treatment options' },
  ],
};

/** Hospital affiliations shown on the old site ("In proud affiliation with"). */
export const affiliations = [
  { name: 'Memorial Hermann', logo: photo.memorialHermann, url: 'https://memorialhermann.org/' },
  { name: 'Houston Methodist', logo: photo.houstonMethodist, url: 'https://www.houstonmethodist.org/' },
];

export const locations = [
  {
    name: 'Spring',
    line1: '25305 Interstate 45',
    line2: 'Spring, TX 77380',
    mapsUrl: 'https://maps.google.com/?q=25305+Interstate+45+Spring+TX+77380',
    embed: 'https://www.google.com/maps?q=25305+Interstate+45+Spring+TX+77380&output=embed',
  },
  {
    name: 'Liberty',
    line1: '2708 Jefferson Dr, Suite B',
    line2: 'Liberty, TX 77575',
    mapsUrl: 'https://maps.google.com/?q=2708+Jefferson+Dr+Suite+B+Liberty+TX+77575',
    embed: 'https://www.google.com/maps?q=2708+Jefferson+Dr+Suite+B+Liberty+TX+77575&output=embed',
  },
];

export const site = {
  name: 'Advanced Spine and Pain Specialists',
  shortName: 'Advanced Spine & Pain',
  doctor: 'Dr. Andrew M. Khoury',
  role: 'Interventional Pain Management · Spring & Liberty, TX',
  tagline: 'Treat pain at its source',
  description:
    'Advanced Spine and Pain Specialists is an interventional pain management practice in Spring and Liberty, Texas, led by board-certified anesthesiologist and pain specialist Dr. Andrew M. Khoury.',
  phone: '281-868-7246',
  phoneHref: 'tel:+12818687246',
  /** First location, used where only one address fits. */
  address: locations[0],
  rating: { score: '4.91', count: 437 },
  portalUrl: 'https://mycw178.ecwcloud.com/portal30059/jsp/login.jsp',
  forms: [
    { label: 'Pre-procedure instructions', url: 'https://sa1s3.patientpop.com/assets/docs/416745.pdf' },
    { label: 'Medical records release form', url: 'https://sa1s3.patientpop.com/assets/docs/416801.pdf' },
  ],
  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
};

/** Providers (About page and home Team section). */
export const team = [
  {
    name: 'Andrew M. Khoury, MD',
    role: 'Founder · Double board-certified pain specialist',
    photo: photo.khoury,
    bio: 'Dr. Khoury founded Advanced Spine and Pain Specialists to treat chronic pain at its source. He has extensive experience with minimally invasive techniques including kyphoplasty, spinal cord and DRG stimulation, peripheral nerve stimulation, intrathecal pump therapy and indirect lumbar decompression, and runs an in-office ketamine infusion protocol for hard-to-treat pain.',
  },
  {
    name: 'Amy Jones, MD',
    role: 'Board-certified primary care sports medicine physician',
    photo: photo.jones,
    bio: 'Dr. Jones specializes in non-operative orthopedic care for active people and athletes, from weekend warriors to former pros. She trained at UTMB, where she was chief resident, and completed a sports medicine fellowship at Houston Methodist Willowbrook with a focus on ultrasound-guided diagnosis and procedures.',
  },
  {
    name: 'Amanda Worsham, MSN, APRN, FNP-C',
    role: 'Family nurse practitioner',
    photo: photo.worsham,
    bio: 'Amanda has practiced in pain management since earning her nurse practitioner license from the University of Texas at Tyler. She is passionate about patient education and long-term relationships with patients. Her favorite therapies include spinal cord stimulation, ReActiv8 and the intrathecal pain pump.',
  },
];

/** Long-form content for a service detail page. Optional per service. */
export interface ServiceContent {
  /** Photos used across the page: [hero, overview, candidates]. */
  photos: string[];
  intro: string;
  whatIs: { title: string; text: string[] };
  candidates: { title: string; text: string; conditions: string[]; symptoms: string[] };
  benefits: { title: string; text: string; items: { title: string; text: string }[] };
  recovery: { title: string; text: string; steps: { label: string; title: string; text: string }[] };
  safety: { title: string; text: string };
  faqs: { q: string; a: string }[];
}

const epiduralContent: ServiceContent = {
  photos: [photo.bannerBack, photo.xray, photo.consultNotes],
  intro:
    'An epidural steroid injection places anti-inflammatory medicine right next to an irritated spinal nerve. It is one of the most common and effective ways to calm neck, back and leg pain without surgery.',
  whatIs: {
    title: 'What is an epidural steroid injection?',
    text: [
      'The epidural space surrounds the spinal nerves. When a disc bulges or the spinal canal narrows, nerves in this space become inflamed and send pain into the neck, arms, back or legs.',
      'Using live X-ray guidance, Dr. Khoury places a thin needle into the epidural space and delivers a mix of steroid and numbing medicine exactly where the inflammation is. Injections can be done in the neck (cervical), mid back (thoracic) or lower back (lumbar, caudal and transforaminal approaches).',
    ],
  },
  candidates: {
    title: 'Who is a candidate?',
    text: 'Epidural injections help people whose pain comes from an inflamed nerve root and has not improved enough with rest, medication or physical therapy.',
    conditions: ['Herniated or bulging disc', 'Sciatica', 'Spinal stenosis', 'Degenerative disc disease', 'Post-surgical back or leg pain'],
    symptoms: ['Pain that travels into an arm or leg', 'Numbness or tingling', 'Burning or shooting nerve pain', 'Pain when sitting, standing or walking'],
  },
  benefits: {
    title: 'What are the benefits?',
    text: 'For many patients an epidural brings enough relief to sleep, work and take part in physical therapy, which helps the spine heal for the long term.',
    items: [
      { title: 'Targets the source', text: 'Medicine goes straight to the inflamed nerve, not through the whole body.' },
      { title: 'Quick procedure', text: 'Most injections take 15 to 30 minutes and you go home the same day.' },
      { title: 'Helps you rehab', text: 'Less pain makes it easier to stay active and do therapy.' },
      { title: 'Can avoid surgery', text: 'Many patients never need an operation once inflammation settles.' },
    ],
  },
  recovery: {
    title: 'What is recovery like?',
    text: 'There is no real downtime. You may feel a little sore where the needle went in for a day or two.',
    steps: [
      { label: 'Same day', title: 'Rest and go home', text: 'Most people rest for the day and have someone drive them home.' },
      { label: '2 to 7 days', title: 'Steroid starts working', text: 'The numbing medicine wears off in hours. The steroid usually starts working within a few days.' },
      { label: 'Follow-up', title: 'Check your progress', text: 'We review your relief and decide together if another injection or a different treatment makes sense.' },
    ],
  },
  safety: {
    title: 'Is it safe?',
    text: 'Epidural steroid injections are among the most commonly performed pain procedures. X-ray guidance makes them precise. Side effects are uncommon and usually mild, such as temporary soreness, a flushed face or a short rise in blood sugar. Serious problems like infection or nerve injury are rare.',
  },
  faqs: [
    { q: 'Does the injection hurt?', a: 'The skin is numbed first, so most patients feel pressure rather than sharp pain. Light sedation may be available.' },
    { q: 'How long does relief last?', a: 'Relief can last weeks to many months. It depends on the cause of your pain and how your body responds.' },
    { q: 'How many injections can I have?', a: 'Most patients need one to three injections. Dr. Khoury limits how often steroids are given to keep you safe.' },
  ],
};

const rfaContent: ServiceContent = {
  photos: [photo.bannerNeck, photo.neckGlow, photo.consultWoman],
  intro:
    'Radiofrequency ablation (RFA) uses gentle heat to quiet the small nerves that carry pain signals from arthritic joints in the spine, sacroiliac joint, knees and more. Relief often lasts from several months to more than a year.',
  whatIs: {
    title: 'What is radiofrequency ablation?',
    text: [
      'Worn facet joints in the spine and other arthritic joints send pain through small sensory nerves called medial branch or genicular nerves. RFA turns these nerves off without affecting muscle strength.',
      'First we confirm the source with a diagnostic nerve block. If the block brings good short-term relief, Dr. Khoury uses X-ray guidance to place a thin probe next to the nerve and heats it with radiofrequency energy so it can no longer send pain signals.',
    ],
  },
  candidates: {
    title: 'Who is a candidate?',
    text: 'RFA is a good fit for long-lasting joint pain that responded well to a diagnostic nerve block.',
    conditions: ['Facet joint arthritis (neck, mid or low back)', 'Sacroiliac joint pain', 'Knee and hip arthritis', 'Some headaches from the neck', 'Chronic pain after spine surgery'],
    symptoms: ['Aching pain that does not travel far', 'Pain when twisting or leaning back', 'Stiffness in the morning', 'Pain that returns after steroid injections wear off'],
  },
  benefits: {
    title: 'What are the benefits?',
    text: 'RFA gives longer relief than an injection alone and can be repeated if the nerve grows back.',
    items: [
      { title: 'Long-lasting relief', text: 'Many patients get six months to over a year of relief.' },
      { title: 'No incision', text: 'It is done through a needle, so there are no stitches.' },
      { title: 'Less medicine', text: 'Many people can cut back on pain pills after RFA.' },
      { title: 'Repeatable', text: 'If pain returns, the treatment can safely be done again.' },
    ],
  },
  recovery: {
    title: 'What is recovery like?',
    text: 'You go home the same day. Some soreness is normal for a week or two while the nerve settles down.',
    steps: [
      { label: 'Day 1', title: 'Rest', text: 'Take it easy for the rest of the day. Ice can help with soreness.' },
      { label: '1 to 3 weeks', title: 'Relief builds', text: 'Pain relief usually builds over two to three weeks.' },
      { label: 'Ongoing', title: 'Stay active', text: 'Use this window to strengthen with exercise or therapy for longer benefit.' },
    ],
  },
  safety: {
    title: 'Is RFA safe?',
    text: 'RFA has a long safety record. X-ray guidance and test stimulation make sure the probe is in the right place before any heat is used. Temporary soreness or numbness in the skin is possible. Serious problems are rare.',
  },
  faqs: [
    { q: 'Why do I need a test block first?', a: 'The block confirms which nerves carry your pain. It makes RFA much more likely to work.' },
    { q: 'Will it affect my movement or strength?', a: 'No. The nerves treated carry sensation from the joint, not signals to your muscles.' },
    { q: 'Can the pain come back?', a: 'Nerves can slowly regrow over months. If pain returns, RFA can be repeated.' },
  ],
};

const scsContent: ServiceContent = {
  photos: [photo.xray, photo.tablet, photo.consultSmile],
  intro:
    'Spinal cord stimulation uses a small implanted device to change how pain signals travel to the brain. It helps people with long-term nerve pain who have not found relief with other treatments, and you can try it first before committing.',
  whatIs: {
    title: 'What is spinal cord stimulation?',
    text: [
      'A spinal cord stimulator has thin wires (leads) placed in the epidural space and a small battery placed under the skin. It sends mild electrical pulses that block or change pain signals before they reach the brain. Many modern systems cause no tingling at all.',
      'Dr. Khoury also offers dorsal root ganglion (DRG) stimulation for focused pain in the foot, knee, groin or chest wall, and peripheral nerve stimulation for pain from a single nerve.',
    ],
  },
  candidates: {
    title: 'Who is a candidate?',
    text: 'Stimulation is for chronic nerve pain that has lasted months and has not improved enough with medicine, injections or therapy.',
    conditions: ['Pain after back or neck surgery', 'Complex regional pain syndrome (CRPS)', 'Diabetic and other neuropathy', 'Chronic sciatica or radiculopathy', 'Chronic back and leg pain'],
    symptoms: ['Burning or electric pain', 'Pain in the legs or arms', 'Pain that limits walking or sleep', 'Relying on strong pain medicine'],
  },
  benefits: {
    title: 'What are the benefits?',
    text: 'Stimulation is one of the few chronic pain treatments you can test drive before a permanent implant.',
    items: [
      { title: 'Try it first', text: 'A one-week trial shows how much it helps before you decide.' },
      { title: 'Less medicine', text: 'Many patients reduce or stop opioid pain medicine.' },
      { title: 'You control it', text: 'Adjust your therapy with a small remote or phone app.' },
      { title: 'Reversible', text: 'The system can be turned off or removed if needed.' },
    ],
  },
  recovery: {
    title: 'How does the process work?',
    text: 'The process happens in two steps: a short trial, then a permanent implant if the trial works well.',
    steps: [
      { label: 'Trial', title: 'Test for about a week', text: 'Temporary leads are placed through a needle in a short outpatient procedure. You go home and track your pain.' },
      { label: 'Implant', title: 'Outpatient procedure', text: 'If the trial gave good relief, the permanent system is placed through small incisions.' },
      { label: '4 to 6 weeks', title: 'Back to normal life', text: 'Avoid heavy lifting and twisting while the leads settle. Then enjoy daily life with less pain.' },
    ],
  },
  safety: {
    title: 'Is spinal cord stimulation safe?',
    text: 'Spinal cord stimulation has been used for decades and is FDA-approved for chronic pain. The trial lowers the risk of choosing a treatment that does not work for you. Possible risks include infection, lead movement or discomfort at the battery site. These are uncommon and can usually be fixed.',
  },
  faqs: [
    { q: 'Will I feel the stimulator?', a: 'Some settings create a mild tingling. Many newer settings have no tingling at all. You can change programs with your remote.' },
    { q: 'Can I have an MRI?', a: 'Most modern systems are MRI-compatible under certain conditions. We will choose a device that fits your needs.' },
    { q: 'How long does the battery last?', a: 'It depends on the device. Rechargeable batteries can last many years, and some systems need no recharging.' },
  ],
};

const mildContent: ServiceContent = {
  photos: [photo.neckBack, photo.spineModel, photo.consultOffice],
  intro:
    'The MILD® procedure (minimally invasive lumbar decompression) treats lumbar spinal stenosis through a tiny opening, with no general anesthesia, no implants and no stitches. It helps people stand and walk longer with less pain.',
  whatIs: {
    title: 'What is the MILD® procedure?',
    text: [
      'In lumbar spinal stenosis, a thick ligament in the back of the spinal canal presses on the nerves. This causes pain, heaviness and numbness in the back and legs, especially when standing or walking.',
      'During MILD, Dr. Khoury uses X-ray guidance and small tools through a port the size of a baby aspirin to remove small pieces of the thickened ligament. This makes more space for the nerves. Related options such as Vertiflex™ spacers are also offered.',
    ],
  },
  candidates: {
    title: 'Who is a candidate?',
    text: 'MILD is designed for people with lumbar spinal stenosis caused by a thickened ligament, confirmed on MRI or CT.',
    conditions: ['Lumbar spinal stenosis', 'Neurogenic claudication', 'Thickened ligamentum flavum'],
    symptoms: ['Leg pain when standing or walking', 'Need to sit or lean forward for relief', 'Heaviness or weakness in the legs', 'Lower back pain that limits activity'],
  },
  benefits: {
    title: 'What are the benefits?',
    text: 'MILD treats a main cause of stenosis while keeping the spine stable and leaving future options open.',
    items: [
      { title: 'Tiny incision', text: 'Done through a port about 5 mm wide, with no stitches.' },
      { title: 'No implants', text: 'Nothing is left behind in your spine.' },
      { title: 'Fast recovery', text: 'Most patients go home the same day and walk soon after.' },
      { title: 'Stand and walk longer', text: 'Most patients report they can stand and walk longer with less pain.' },
    ],
  },
  recovery: {
    title: 'What is recovery like?',
    text: 'Recovery is quick because no muscles are cut and no hardware is placed.',
    steps: [
      { label: 'Same day', title: 'Walk and go home', text: 'You go home a few hours after the procedure with a small bandage.' },
      { label: '1 to 2 weeks', title: 'Light activity', text: 'Avoid heavy lifting for a short time. Walking is encouraged.' },
      { label: 'Months after', title: 'Lasting results', text: 'Studies show relief that lasts for years in many patients.' },
    ],
  },
  safety: {
    title: 'Is MILD safe?',
    text: 'MILD has a strong safety record in clinical studies, with no major device-related complications reported. Because it avoids general anesthesia and implants, it can be a good choice for older adults or people with other health conditions.',
  },
  faqs: [
    { q: 'Is MILD surgery?', a: 'It is a minimally invasive outpatient procedure done through a very small port. No general anesthesia and no stitches are needed.' },
    { q: 'How do I know if I have the right kind of stenosis?', a: 'Dr. Khoury reviews your MRI or CT to measure the ligament and see if MILD fits your anatomy.' },
    { q: 'Does it rule out other treatments later?', a: 'No. MILD leaves the spine stable, so other treatments remain possible.' },
  ],
};

const kyphoplastyContent: ServiceContent = {
  photos: [photo.spineModel, photo.xray, photo.consultWoman],
  intro:
    'Kyphoplasty repairs painful compression fractures in the spine. A small balloon lifts the broken bone and medical cement holds it in place, often bringing fast relief and helping prevent a hunched posture.',
  whatIs: {
    title: 'What is kyphoplasty?',
    text: [
      'Compression fractures happen when a bone in the spine collapses, often because of osteoporosis, a fall or cancer weakening the bone. They can cause sharp back pain and loss of height.',
      'Through a small needle, Dr. Khoury places a balloon into the broken bone, inflates it to restore space, then fills the space with bone cement. The cement hardens in minutes and stabilizes the fracture. Dr. Khoury also offers Intracept® basivertebral nerve ablation for chronic low back pain that starts in the vertebra itself.',
    ],
  },
  candidates: {
    title: 'Who is a candidate?',
    text: 'Kyphoplasty helps people with a recent, painful compression fracture confirmed on imaging.',
    conditions: ['Osteoporotic compression fracture', 'Fracture from a fall or injury', 'Fracture from cancer in the spine', 'Vertebrogenic low back pain (Intracept®)'],
    symptoms: ['Sudden, sharp back pain', 'Pain that gets worse when standing', 'Loss of height', 'Rounded or hunched posture'],
  },
  benefits: {
    title: 'What are the benefits?',
    text: 'Stabilizing the fracture often brings quick relief and helps people get moving again.',
    items: [
      { title: 'Fast relief', text: 'Many patients feel better within a day or two.' },
      { title: 'Restores height', text: 'The balloon can help lift the collapsed bone.' },
      { title: 'Get moving', text: 'Less pain means less time in bed and fewer complications.' },
      { title: 'Minimally invasive', text: 'Done through a needle, often as an outpatient.' },
    ],
  },
  recovery: {
    title: 'What is recovery like?',
    text: 'Most people walk the same day. We also look at bone health so future fractures are less likely.',
    steps: [
      { label: 'Same day', title: 'Walk and go home', text: 'You can usually walk within an hour or two and go home the same day.' },
      { label: 'First weeks', title: 'Normal activity', text: 'Most daily activities return quickly. Avoid heavy lifting for a few weeks.' },
      { label: 'Long term', title: 'Protect your bones', text: 'We help you plan bone health care with your primary doctor.' },
    ],
  },
  safety: {
    title: 'Is kyphoplasty safe?',
    text: 'Kyphoplasty is a well-studied, widely used procedure. Live X-ray guidance helps keep the cement inside the bone. Risks such as cement leakage or infection are uncommon.',
  },
  faqs: [
    { q: 'How soon should a fracture be treated?', a: 'Results are best when the fracture is recent, often within the first few months. Call us early if you have sudden back pain.' },
    { q: 'Is it painful?', a: 'Numbing medicine and sedation keep you comfortable. Soreness at the needle site fades in a few days.' },
    { q: 'Can it prevent more fractures?', a: 'It treats the broken bone. Bone health care, like osteoporosis treatment, helps prevent new fractures.' },
  ],
};

const regenerativeContent: ServiceContent = {
  photos: [photo.bannerKnee, photo.kneeBrace, photo.legExam],
  intro:
    'Regenerative medicine uses your own body to support healing. Platelet-rich plasma (PRP) and Regenexx® procedures, along with joint injections and hyaluronic acid (gel) injections, can ease joint and tendon pain and help you stay active.',
  whatIs: {
    title: 'What is regenerative medicine?',
    text: [
      'PRP is made from a small sample of your own blood. It is spun to concentrate platelets, which carry growth factors that help repair tissue. It is then injected into the injured joint, tendon or ligament under ultrasound or X-ray guidance.',
      'Regenexx® uses advanced lab processing of your own cells for joints and the spine. For arthritis we also offer steroid joint injections for the shoulder, hip and knee, and viscosupplementation (hyaluronan gel) to cushion the knee.',
    ],
  },
  candidates: {
    title: 'Who is a candidate?',
    text: 'These treatments suit active people with joint or soft-tissue pain who want to delay or avoid surgery.',
    conditions: ['Knee, hip and shoulder arthritis', 'Tendon injuries (tennis elbow, rotator cuff)', 'Ligament sprains', 'Sports injuries', 'Some disc and spine pain'],
    symptoms: ['Joint pain with activity', 'Stiffness and swelling', 'Pain that lingers after an injury', 'Reduced range of motion'],
  },
  benefits: {
    title: 'What are the benefits?',
    text: 'Using your own tissue makes these treatments natural and low risk.',
    items: [
      { title: 'Uses your own cells', text: 'Very low risk of allergic reaction.' },
      { title: 'Supports healing', text: 'Aims to repair tissue, not just mask pain.' },
      { title: 'Image guided', text: 'Ultrasound or X-ray places the treatment exactly.' },
      { title: 'May delay surgery', text: 'Many patients put off or avoid joint replacement.' },
    ],
  },
  recovery: {
    title: 'What is recovery like?',
    text: 'Healing takes time. Improvement often builds over weeks to months.',
    steps: [
      { label: 'First days', title: 'Rest the area', text: 'Some soreness is normal as healing begins. Avoid anti-inflammatory pills if we ask you to.' },
      { label: '2 to 6 weeks', title: 'Gentle rehab', text: 'Guided exercise helps the treated tissue get stronger.' },
      { label: '3 months', title: 'Full effect', text: 'Most patients notice the biggest change around three months.' },
    ],
  },
  safety: {
    title: 'Is it safe?',
    text: 'PRP and Regenexx® use your own blood or cells, so the risk of reaction is very low. As with any injection, there is a small risk of infection or temporary flare in pain.',
  },
  faqs: [
    { q: 'Is PRP covered by insurance?', a: 'Coverage varies and PRP is often not covered. Our team will explain costs before treatment.' },
    { q: 'How many treatments will I need?', a: 'Many people need one to three treatments depending on the problem.' },
    { q: 'Which joint injection is right for me?', a: 'Dr. Khoury and Dr. Jones look at your imaging, activity level and goals to recommend the best option.' },
  ],
};

export const services: {
  slug: string;
  image: string;
  title: string;
  short: string;
  description: string;
  content?: ServiceContent;
}[] = [
  {
    slug: 'epidural-steroid-injections',
    image: photo.bannerBack,
    title: 'Epidural Steroid Injections',
    short: 'Calm inflamed spinal nerves to relieve neck, back and leg pain.',
    description: 'X-ray guided injections that place anti-inflammatory medicine next to irritated spinal nerves.',
    content: epiduralContent,
  },
  {
    slug: 'radiofrequency-ablation',
    image: photo.bannerNeck,
    title: 'Radiofrequency Ablation',
    short: 'Gentle heat quiets pain nerves for months of relief from joint pain.',
    description: 'Radiofrequency ablation turns off the small nerves that carry pain from arthritic joints.',
    content: rfaContent,
  },
  {
    slug: 'spinal-cord-stimulation',
    image: photo.xray,
    title: 'Spinal Cord Stimulation',
    short: 'A small device that changes pain signals. Try it first for a week.',
    description: 'Spinal cord, DRG and peripheral nerve stimulation for chronic nerve pain.',
    content: scsContent,
  },
  {
    slug: 'mild-procedure',
    image: photo.neckBack,
    title: 'MILD® Procedure',
    short: 'Minimally invasive relief for lumbar spinal stenosis. No implants, no stitches.',
    description: 'Minimally invasive lumbar decompression for spinal stenosis through a tiny port.',
    content: mildContent,
  },
  {
    slug: 'kyphoplasty',
    image: photo.spineModel,
    title: 'Kyphoplasty',
    short: 'Repairs painful spine compression fractures, often with fast relief.',
    description: 'Balloon kyphoplasty and vertebral augmentation for compression fractures.',
    content: kyphoplastyContent,
  },
  {
    slug: 'regenerative-medicine',
    image: photo.bannerKnee,
    title: 'Regenerative Medicine & Joints',
    short: 'PRP, Regenexx® and joint injections to help joints and tendons heal.',
    description: 'PRP, Regenexx®, joint injections and viscosupplementation for joint pain.',
    content: regenerativeContent,
  },
];

/** Full list of treatments offered (from advspine.org), grouped. Shown on the Treatments page. */
export const treatmentGroups = [
  {
    title: 'Neck & back pain',
    items: [
      'Cervical, lumbar, caudal & transforaminal epidural steroid injections',
      'Cervical, thoracic & lumbar facet joint / medial branch blocks',
      'Facet radiofrequency ablation (denervation)',
      'Disc-FX® minimally invasive lumbar discectomy',
      'Discography',
      'Intracept® basivertebral nerve ablation',
      'Intrathecal drug delivery pump (pain pump)',
      'Kyphoplasty (vertebroplasty)',
      'Minimally invasive lumbar decompression (MILD®)',
      'Platelet-rich plasma (PRP)',
      'ReActiv8® implantable restorative neurostimulation',
      'Sacroiliac joint radiofrequency ablation',
      'Sacroiliac joint fusion',
      'Selective nerve root block',
      'Spinal cord stimulation & DRG stimulation',
      'Spinal Simplicity Minuteman®',
      'Southern Spine Stabilink®',
      'Vertiflex™',
    ],
  },
  {
    title: 'Neuropathy & nerve pain',
    items: [
      'Carpal tunnel injections',
      'Celiac plexus block',
      'Ganglion impar block',
      'Peripheral nerve block / RFA',
      'Peripheral nerve stimulation',
      'Qutenza® (capsaicin) topical',
      'Stellate ganglion nerve block',
      'Thoracic / lumbar sympathetic block',
      'Superior hypogastric plexus block',
      'Ketamine infusion',
    ],
  },
  {
    title: 'Joint pain',
    items: [
      'Bursa injections',
      'Custom bracing',
      'Joint fluid aspiration',
      'Regenerative medicine (PRP, Regenexx®)',
      'Steroid joint injections (shoulder, hip, knee)',
      'Radiofrequency ablation (RFA)',
      'Tenjet (Hydrocision®) tenotomy',
      'Hyaluronic acid injection (viscosupplementation)',
    ],
  },
  {
    title: 'Headache & facial pain',
    items: [
      'Botox® injections for migraine',
      'Cervical facet block / RFA',
      'Epidural blood patch',
      'Occipital nerve block',
      'Sphenopalatine ganglion (SPG) block',
      'Trigeminal nerve block',
    ],
  },
  {
    title: 'Post-surgical pain',
    items: [
      'Epidural steroid injection',
      'Peripheral nerve block / RFA',
      'Spinal cord stimulation',
      'Dorsal root ganglion (DRG) stimulation',
      'Intrathecal drug delivery pump (pain pump)',
    ],
  },
];

/** Conditions treated, grouped for the Conditions mega menu and page. */
export const conditionGroups = [
  {
    id: 'spine',
    title: 'Spine & back',
    overview: 'Pain from the discs, joints and nerves of the spine. The most common reason patients visit us.',
    items: [
      { slug: 'back-pain', title: 'Back pain', kind: 'Pain', summary: 'Low and mid back pain from discs, joints, muscles or nerves. We find the source first, then treat it with the least invasive option that works, such as injections, RFA or stimulation.' },
      { slug: 'neck-pain', title: 'Neck pain', kind: 'Pain', summary: 'Neck pain can come from worn facet joints, discs or pinched nerves and may spread to the shoulders, arms or head. Facet blocks, RFA and cervical epidurals often help.' },
      { slug: 'sciatica', title: 'Sciatica', kind: 'Nerve', summary: 'Sciatica is pain that shoots from the lower back down the leg when a nerve root is irritated. Epidural steroid injections are a common first step.' },
      { slug: 'herniated-disc', title: 'Herniated disc', kind: 'Disc', summary: 'When the soft center of a disc pushes out, it can press on nearby nerves. Most herniated discs improve without surgery with injections and therapy.' },
      { slug: 'spinal-stenosis', title: 'Spinal stenosis', kind: 'Narrowing', summary: 'Narrowing of the spinal canal that squeezes nerves, often causing leg pain when standing or walking. Options include epidurals, MILD® and Vertiflex™.' },
      { slug: 'compression-fractures', title: 'Compression fractures', kind: 'Fracture', summary: 'Collapsed spinal bones, often from osteoporosis, cause sudden sharp back pain. Kyphoplasty can stabilize the bone and bring fast relief.' },
    ],
  },
  {
    id: 'nerve',
    title: 'Nerve pain',
    overview: 'Burning, electric or tingling pain from damaged or overactive nerves.',
    items: [
      { slug: 'neuropathy', title: 'Neuropathy', kind: 'Nerve damage', summary: 'Nerve damage, often from diabetes, that causes burning, numbness or tingling in the feet and hands. Treatments include Qutenza®, nerve blocks and stimulation.' },
      { slug: 'crps-type-1', title: 'CRPS type 1 (reflex sympathetic dystrophy)', kind: 'Nerve', summary: 'A severe, long-lasting pain condition usually in an arm or leg after an injury. Sympathetic blocks, DRG stimulation and ketamine infusions can help.' },
      { slug: 'crps-type-2', title: 'CRPS type 2 (causalgia)', kind: 'Nerve', summary: 'Like CRPS type 1 but linked to a known nerve injury. Treatment focuses on calming the nervous system and restoring function.' },
      { slug: 'carpal-tunnel-syndrome', title: 'Carpal tunnel syndrome', kind: 'Pinched nerve', summary: 'Pressure on the median nerve in the wrist causes numbness, tingling and weakness in the hand. Guided injections can reduce symptoms.' },
    ],
  },
  {
    id: 'joint',
    title: 'Joint pain',
    overview: 'Arthritis and wear in the knees, hips, shoulders and sacroiliac joints.',
    items: [
      { slug: 'arthritis', title: 'Arthritis', kind: 'Wear and tear', summary: 'Joint inflammation and cartilage wear cause pain and stiffness. Joint injections, gel injections, PRP and RFA can keep you moving.' },
      { slug: 'joint-pain', title: 'Joint pain (shoulder, hip, knee)', kind: 'Joint', summary: 'Pain from injury, overuse or arthritis in the large joints. Dr. Jones and Dr. Khoury offer image-guided injections and regenerative options.' },
      { slug: 'sacroiliac-joint-pain', title: 'Sacroiliac joint pain', kind: 'Joint', summary: 'The SI joint links the spine and pelvis and can cause low back and buttock pain. Options include injections, RFA and minimally invasive SI joint fusion.' },
    ],
  },
  {
    id: 'head',
    title: 'Head & face',
    overview: 'Headaches, migraines and facial nerve pain.',
    items: [
      { slug: 'migraines', title: 'Migraines', kind: 'Headache', summary: 'Recurring, often severe headaches with nausea or light sensitivity. Botox® injections and nerve blocks can reduce how often they happen.' },
      { slug: 'headaches', title: 'Headaches', kind: 'Headache', summary: 'Headaches can start in the neck or nerves at the back of the head. Occipital nerve blocks and cervical facet treatment can help.' },
      { slug: 'facial-pain', title: 'Facial pain', kind: 'Nerve', summary: 'Facial pain, such as trigeminal neuralgia, can be sharp and sudden. Trigeminal and SPG nerve blocks may bring relief.' },
    ],
  },
  {
    id: 'visceral',
    title: 'Chest, abdomen & pelvis',
    overview: 'Pain from the chest wall and organs that has not responded to usual care.',
    items: [
      { slug: 'atypical-chest-pain', title: 'Atypical chest pain', kind: 'Chest wall', summary: 'Chest wall or nerve pain not caused by the heart. Nerve blocks and stimulation are options once heart causes are ruled out.' },
      { slug: 'abdominal-pain', title: 'Abdominal pain', kind: 'Visceral', summary: 'Chronic abdominal pain, including pain from the pancreas, may respond to a celiac plexus block.' },
      { slug: 'pelvic-pain', title: 'Pelvic pain', kind: 'Visceral', summary: 'Long-lasting pelvic pain may be helped by a superior hypogastric plexus or ganglion impar block.' },
    ],
  },
  {
    id: 'chronic',
    title: 'Chronic & post-surgical pain',
    overview: 'Pain that continues after surgery, or pain that has not responded to other treatments.',
    items: [
      { slug: 'post-surgical-pain', title: 'Post-surgical pain', kind: 'After surgery', summary: 'Ongoing pain after back, neck or joint surgery. Spinal cord stimulation, DRG stimulation and pain pumps are proven options.' },
      { slug: 'intractable-pain', title: 'Hard-to-treat chronic pain', kind: 'Chronic', summary: 'Pain that has not improved with other care. Dr. Khoury uses his anesthesiology training to offer in-office ketamine infusions and advanced therapies.' },
    ],
  },
];

/** Flat list of every condition (used by the Services menu and the conditions page). */
export const conditions = conditionGroups.flatMap((g) => g.items);

/** Short list shown in the Treatments mega menu side column. */
export const featuredConditions = ['back-pain', 'neck-pain', 'sciatica', 'spinal-stenosis', 'neuropathy', 'migraines']
  .map((slug) => conditions.find((c) => c.slug === slug))
  .filter((c): c is (typeof conditions)[number] => Boolean(c));

export const education = [
  { stage: 'Undergraduate', place: 'B.S. Biomedical Engineering, University of Houston' },
  { stage: 'Medical School', place: 'University of Texas Medical School at Houston' },
  { stage: 'Internship', place: 'General Surgery, Baylor College of Medicine' },
  { stage: 'Residency', place: 'Anesthesiology, University of Texas Medical Branch, Galveston' },
  { stage: 'Fellowship', place: 'Multidisciplinary Pain Medicine, University of Florida' },
];

export const boards = ['American Board of Anesthesiology', 'Interventional Pain Management'];

export const awards = [
  { title: 'Houston Chronicle Best of the Best', year: '2025' },
  { title: 'Best of the Best Finalist', year: '2024' },
];

/** Professional memberships (listed in the About section). */
export const appointments = [
  'American Society of Pain and Neuroscience',
  'American Society of Interventional Pain Physicians',
  'Texas Pain Society',
  'Texas Medical Association',
];

export const whyChoose = [
  {
    title: 'Board-certified expertise',
    text: 'Dr. Khoury is board-certified in anesthesiology and interventional pain management, and fellowship-trained at the University of Florida.',
  },
  {
    title: 'Advanced, minimally invasive options',
    text: 'From spinal cord and DRG stimulation to MILD®, kyphoplasty, Intracept® and ketamine infusions: treatments that target the source of pain.',
  },
  {
    title: 'Compassion first',
    text: '“For without compassion, medicine is merely science.” We listen, explain your options clearly and decide together.',
  },
];

export const testimonials = [
  {
    name: 'Beatrice W.',
    treatment: 'Patient of Dr. Khoury',
    quote:
      'Dr Khoury was so patient and listened to me about previous treatments that I had and failed. He gave me options so that I could make an informed decision.',
  },
  {
    name: 'Lydia Y.',
    treatment: 'Procedure patient',
    quote:
      'As soon as Dr. Khoury walked in my prep room his gentle greeting brought me immediately calmness.',
  },
  {
    name: 'Minnie K.',
    treatment: 'Patient of Dr. Jones',
    quote:
      'A very pleasant experience. Dr Jones is quite knowledgeable and approachable, allowing your concerns to be heard and addressed. Highly recommended.',
  },
  {
    name: 'Patricia G.',
    treatment: 'Patient of Dr. Khoury',
    quote:
      'Dr Khoury is always nice and listens closely when you share the issues. He is truly sincere about relieving your pains.',
  },
  {
    name: 'Philip P.',
    treatment: 'Verified patient',
    quote:
      'I would recommend Dr Khoury and the entire staff to everyone. My experience with everyone was great, everyone was so friendly and supportive.',
  },
];

export const posts = [
  {
    slug: 'spinal-cord-stimulation-trial',
    title: 'Spinal cord stimulation: why you get to try it before you commit',
    excerpt:
      'A one-week trial lets you see how much a stimulator helps your pain before anything is permanent. Here is what the trial is like.',
    date: '2026-08-20',
    readTime: '5 min read',
    category: 'Treatments',
    image: photo.xray,
  },
  {
    slug: 'sciatica-relief-spring-tx',
    title: 'Pain shooting down your leg? Sciatica relief in Spring, TX',
    excerpt:
      'Most sciatica gets better without surgery. Learn the warning signs, what to try first, and when to see a pain specialist.',
    date: '2026-07-30',
    readTime: '4 min read',
    category: 'Conditions',
    image: photo.bannerBack,
  },
  {
    slug: 'mild-procedure-spinal-stenosis',
    title: 'Can’t stand or walk for long? What the MILD® procedure can do',
    excerpt:
      'Lumbar spinal stenosis makes walking hard. The MILD procedure makes room for the nerves through a port the size of a baby aspirin.',
    date: '2026-07-02',
    readTime: '6 min read',
    category: 'Procedures',
    image: photo.spineModel,
  },
];

/** Header navigation. `mega` names the mega menu an item opens. */
export const nav: { label: string; href: string; mega?: 'services' | 'conditions' }[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Team', href: '/about' },
  { label: 'Treatments', href: '/services', mega: 'services' },
  { label: 'Conditions', href: '/conditions', mega: 'conditions' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/** Sections tracked by the "spine rail" on the home page (in page order). */
export const homeSections = [
  { id: 'hero', label: 'Welcome' },
  { id: 'about', label: 'About' },
  { id: 'team', label: 'Team' },
  { id: 'services', label: 'Treatments' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'why', label: 'Why us' },
  { id: 'legacy', label: 'Awards' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Patients' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];
