import sidequest from '../assets/covers/sidequest.jpg';
import cnta from '../assets/covers/cnta.png';
import phishninja from '../assets/covers/phishninja.png';
import narutorpg from '../assets/covers/narutorpg.png';

export const person = {
  name: 'Umraz Khan',
  role: 'Full-stack Engineer',
  location: 'Bengaluru, India',
  email: 'kumraz858@gmail.com',
  title: 'Umraz Khan | Reformed hacker, full-time builder',
  description:
    'Umraz Khan is a full-stack engineer in Bengaluru who builds fast products with React, TypeScript, Python and FastAPI. Work includes Sidequest, PhishNinja, CNTA and a dashboard serving 500,000+ users.',
  lede: 'Full-stack engineer building fast products end to end, and a reformed hacker who used to break them for sport.',
  statement:
    'I take products from the database to the last pixel and make them fast at every layer. I architected a dashboard that now serves 500,000+ users, and turned a vibe-coded prototype into a social app for real-world quests that 13,000+ people joined in its first four months.',
  about:
    'Python was my first language and security was my first obsession. These days I work mostly in React and TypeScript, own features from API to release, and build the design systems that keep products consistent.',
  resume: '/Umraz_Khan_CV.pdf',
};

export const social = {
  github: 'https://github.com/umrazx',
  linkedin: 'https://www.linkedin.com/in/assassinumz',
  x: 'https://twitter.com/assassinumz',
  discord: 'https://discord.gg/3nfQadt',
  medium: 'https://medium.com/pixiters',
  hackthebox: 'https://app.hackthebox.com/users/28564',
  codewars: 'https://www.codewars.com/users/Assassinumz',
};

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Off the clock', href: '#off-the-clock' },
];

export const heroMeta = [
  { label: 'Reach', value: "500K+ users across products I've built" },
  { label: 'Off hours', value: 'CTFs, Discord bots and games' },
  { label: 'Based', value: 'Bengaluru, India' },
  { label: 'Since', value: 'Shipping production code since 2022' },
];

export const marquee = [
  'React', 'Next.js', 'TypeScript', 'Core Web Vitals', 'Design Systems', 'React Native', 'Python', 'Security',
];

export const stats = [
  { value: '500K+', caption: 'Users served by a platform I architected and scaled' },
  { value: '35%', caption: 'Operational efficiency gained through data and code splitting', hot: true },
  { value: '14K+', caption: 'Discord servers running NarutoRPG, a bot I built' },
  { value: '13K+', caption: 'People who signed up to Sidequest in its first four months' },
];

export const projects = [
  {
    no: '01',
    title: 'Sidequest',
    year: '2026',
    image: sidequest,
    alt: 'Sidequest artwork: a collage of a city street with a person leaping, XP badges and instant photos of people on quests',
    description:
      'A social app for real-world quests: finish one, post the proof, earn XP. I rebuilt it from a vibe-coded prototype into a native app and API. 13,600+ signups in four months across 228 cities, with its largest audience in the US.',
    stack: ['React Native', 'FastAPI', 'MongoDB', 'Cloudflare R2'],
    href: 'https://thesidequest.world',
    wide: true,
  },
  {
    no: '02',
    title: 'CNTA',
    year: '2023',
    image: cnta,
    alt: 'A bowl of vegetables and grains beside a wooden height ruler and a phone showing a growth chart',
    description:
      'Child nutrition tracking with ML screening for early malnutrition. Built in 48 hours; top finalist of 100+ teams.',
    stack: ['Django', 'React', 'PWA', 'ML'],
    href: 'https://devfolio.co/projects/child-nutrition-tracking-appcnta-a3a3',
    wide: false,
  },
  {
    no: '03',
    title: 'PhishNinja',
    year: '2024',
    image: phishninja,
    alt: 'A glowing fishing hook piercing a glass browser address bar over a radar grid',
    description:
      'ML phishing detection that reads URLs and page behaviour. 92% accuracy on test data, validated with 50+ students.',
    stack: ['Flask', 'React', 'MongoDB', 'ML', 'AWS'],
    href: 'https://github.com/umrazx/PhishNinja',
    wide: false,
  },
  {
    no: '04',
    title: 'NarutoRPG',
    year: '2019',
    image: narutorpg,
    alt: 'Illustration of a ninja crouched on a rooftop in front of a huge moon',
    description: 'A Discord RPG bot running in 14,000+ servers with 100,000+ player profiles.',
    stack: ['Python', 'discord.py', 'MongoDB'],
    href: 'https://top.gg/bot/592967798133620736',
    wide: true,
  },
];

export const archive = [
  { no: '05', name: 'Myxable', desc: 'Open-source file converter', stack: 'Django · FFmpeg', year: '2021', href: 'https://github.com/umrazx/myxable' },
  { no: '06', name: 'StudentBuzz', desc: 'Campus platform, Reva Hack 2022 winner', stack: 'Node · Express · Firebase', year: '2022', href: 'https://github.com/umrazx/studentbuzz' },
  { no: '07', name: 'krutrimPY', desc: 'Python wrapper for the Krutrim LLM', stack: 'Python · PyPI', year: '2024', href: 'https://github.com/umrazx/krutrimpy' },
  { no: '08', name: 'Simple Payload Generator', desc: 'CLI for msfvenom payloads', stack: 'Python · Metasploit', year: '2018', href: 'https://github.com/umrazx/simple-payload-generator' },
  { no: '09', name: 'MongoPWN', desc: 'Finds exposed MongoDB instances', stack: 'Python · Shodan · Masscan', year: '2019', href: 'https://github.com/umrazx/mongoPWN' },
  { no: '10', name: 'IRC Participant App', desc: 'Registration for a robotics competition', stack: 'React · Firebase', year: '2023', href: 'https://irc-web-app.web.app/' },
  { no: '11', name: 'PhD Management System', desc: 'Tracks research publications', stack: 'Django · Tailwind', year: '2024', href: 'https://github.com/umrazx/PhD_Management' },
  { no: '12', name: 'Clepher', desc: 'Stock market data dashboard', stack: 'React · TypeScript · Vite', year: '2024', href: 'https://github.com/umrazx/clepher' },
  { no: '13', name: 'Lethal Esports', desc: 'Roster site with an admin panel', stack: 'Django', year: '2022', href: 'https://github.com/umrazx/LethalEsports' },
  { no: '14', name: 'Animus', desc: 'AIML chatbot for Discord', stack: 'Python · discord.py', year: '2019', href: 'https://github.com/umrazx/Animus' },
  { no: '15', name: 'Assembly', desc: 'Campus social network for clubs and events', stack: 'FastAPI · React Native · Azure', year: '2024', href: null },
];

export const jobs = [
  {
    from: '2026',
    to: 'Now',
    current: true,
    role: 'Frontend Engineer',
    company: 'More Retail Private Limited (Amazon backed)',
    dates: 'June 2026 to present',
    bullets: [
      'Built internal operations apps that give area managers visibility across stores, replacing legacy workflows.',
      'Shipped modules in the consumer B2C app, owning each feature from API integration to release.',
      'Set up a reusable design system now used across the products.',
    ],
  },
  {
    from: '2024',
    to: '2026',
    current: false,
    role: 'Software Engineer, Full Stack',
    company: 'Collective Artists Network, Under 25',
    dates: 'August 2024 to May 2026',
    bullets: [
      'Architected and scaled a dashboard serving 500,000+ users, improving operational efficiency by 35%.',
      'Put Core Web Vitals monitoring into CI/CD so regressions are caught before production.',
      'Built high-traffic event websites with a performance-first approach.',
    ],
  },
  {
    from: '2022',
    to: '2024',
    current: false,
    role: 'SDE Intern',
    company: 'Under 25',
    dates: 'August 2022 to July 2024',
    bullets: [
      'Developed and optimized responsive event and marketing websites.',
      'Designed reusable email templates for campaigns reaching 100K+ users.',
      'Worked with design and product to ship UI improvements.',
    ],
  },
];

export const education = {
  degree: 'B.Tech, Computer Science and Engineering',
  details: 'Presidency University, Bengaluru · 2020 to 2024 · CGPA 7.6',
};

export const stack = [
  { title: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Node.js', 'Java', 'C / C++', 'Dart'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'React Native', 'Tailwind CSS', 'HTML / CSS'], hot: true },
  { title: 'Backend', items: ['Django', 'FastAPI', 'Flask', 'Express', 'Spring Boot', 'Socket.IO', 'JWT / OAuth'] },
  { title: 'AI / ML', items: ['LangChain', 'RAG', 'Prompt engineering', 'OpenAI API', 'Anthropic API'] },
  { title: 'Data & Cloud', items: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase', 'AWS', 'Azure', 'Docker', 'Linux'] },
];

export const offLinks = [
  { label: 'Hack The Box', href: social.hackthebox },
  { label: 'Codewars', href: social.codewars },
  { label: 'Medium', href: social.medium },
];

export const achievements = [
  { title: 'National Winner, Reva Hack 2022', desc: 'Designed, built and deployed a community product in 48 hours.', tag: 'Hackathon' },
  { title: 'Led the university CTF team', desc: 'Led Presidency University to multiple wins and national finals.', tag: 'Security' },
  { title: 'Technical Head, R&D', desc: 'Ran core technical initiatives for Team Vikasana.', tag: 'Leadership' },
  { title: 'Top finalist of 100+ teams', desc: 'With CNTA, a 48-hour build for child nutrition.', tag: 'Hackathon' },
  { title: '24 stars on a payload CLI', desc: 'Simple Payload Generator, one of several open-source security tools.', tag: 'Open source' },
];

export const footerLinks = [
  { label: 'GitHub', href: social.github },
  { label: 'LinkedIn', href: social.linkedin },
  { label: 'X / Twitter', href: social.x },
  { label: 'Discord', href: social.discord },
  { label: 'Medium', href: social.medium },
];
