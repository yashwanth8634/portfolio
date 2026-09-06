const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const skillData = {
  next: { name: 'Next.js', copy: 'Used for SSR-powered, real-time club updates and safe incremental deployments for MASTMO.', project: 'MASTMO CLUB WEBSITE' },
  node: { name: 'Node.js', copy: 'The backend foundation for the URL Shortener & Rate Limiter and the CloudNest storage system.', project: 'URL SHORTENER · CLOUDNEST' },
  mongo: { name: 'MongoDB', copy: 'Used for collision checks, registration tracking, and security-conscious storage models across the documented projects.', project: 'ALL THREE PROJECTS' },
  redis: { name: 'Redis', copy: 'Used to create per-user TTL keys for fixed-window request limiting, with no manual cleanup.', project: 'URL SHORTENER & RATE LIMITER' },
  react: { name: 'React.js', copy: 'Used to develop the official, deployed platform for MASTMO club members and events.', project: 'MASTMO CLUB WEBSITE' },
  express: { name: 'Express.js', copy: 'Used to build the URL shortener service and clean REST APIs for CloudNest file workflows.', project: 'URL SHORTENER · CLOUDNEST' },
  jwt: { name: 'JWT', copy: 'Used with bcrypt to protect session routes in the CloudNest storage system.', project: 'CLOUDNEST' },
  supabase: { name: 'Supabase', copy: 'Used for relational tables supporting high-throughput metadata handling in CloudNest.', project: 'CLOUDNEST' },
  python: { name: 'Python', copy: '', project: 'TECHNICAL TOOLKIT' },
  sql: { name: 'SQL', copy: '', project: 'TECHNICAL TOOLKIT' },
  git: { name: 'Git / GitHub', copy: 'Used for safe incremental deployments, version control, rollouts, and root-cause analysis for MASTMO infrastructure.', project: 'MASTMO CLUB / TECHNICAL HEAD' },
  rest: { name: 'REST APIs', copy: 'Used for CloudNest file upload and deletion workflows, alongside the Node and Express service layer.', project: 'CLOUDNEST' },
  docker: { name: 'Docker', copy: '', project: 'TECHNICAL TOOLKIT' },
  cpp: { name: 'C++', copy: '', project: 'TECHNICAL TOOLKIT' },
  javascript: { name: 'JavaScript (ES6+)', copy: 'The language underpinning the documented Node.js, Express, React, Next.js, and EJS project work.', project: 'MASTMO · URL SHORTENER · CLOUDNEST' },
  c: { name: 'C', copy: '', project: 'TECHNICAL TOOLKIT' },
  dsa: { name: 'Data Structures & Algorithms', copy: 'A computer-science fundamental in the academic and technical toolkit.', project: 'ENGINEERING FUNDAMENTALS' },
  oop: { name: 'Object-Oriented Programming', copy: 'A computer-science fundamental in the academic and technical toolkit.', project: 'ENGINEERING FUNDAMENTALS' },
  os: { name: 'Operating Systems', copy: 'A computer-science fundamental in the academic and technical toolkit.', project: 'ENGINEERING FUNDAMENTALS' },
  dbms: { name: 'Database Management Systems', copy: 'A computer-science fundamental supported by an NPTEL certification.', project: 'ENGINEERING FUNDAMENTALS' }
};

const projectData = {
  mastmo: {
    index: 'PROJECT / 01',
    title: 'MASTMO Club Website , VITS',
    summary: 'An official React-based platform for a 500-member Mathematical & Statistical Modeling club at VITS, designed to track registrations across 10+ active live events.',
    problem: 'The club needed a digital platform to support registration tracking and its active event calendar for a large member community.',
    solution: 'Developed and deployed the platform with Next.js and MongoDB. Registration workflows processed 500+ form submissions with zero manual intervention. Logging, monitoring, and Next.js SSR supported real-time NoSQL updates.',
    client: 'React',
    service: 'Next.js SSR',
    data: 'MongoDB',
    tags: ['Next.js', 'React.js', 'MongoDB', 'SSR', 'Git'],
    result: 'Processed 500+ form submissions with zero manual intervention while supporting 10+ active live events.'
  },
  shortener: {
    index: 'PROJECT / 02',
    title: 'URL Shortener & Rate Limiter',
    summary: 'A URL shortener with custom aliases, expiry controls, collision checks, and a Redis-backed request guard.',
    problem: 'Generate short links safely while protecting the service from excessive request traffic and identifying performance bottlenecks before deployment.',
    solution: 'Built custom aliases, TTL-based expiry, and MongoDB collision checks before short-code generation. Implemented a Redis rate limiter using per-user TTL keys for fixed-window limits with zero manual cleanup.',
    client: 'Requests',
    service: 'Express.js',
    data: 'MongoDB + Redis',
    tags: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Autocannon'],
    result: 'Autocannon load testing reached 1,500 req/sec at 60ms p95 latency under 100 concurrent users.'
  },
  cloudnest: {
    index: 'PROJECT / 03',
    title: 'CloudNest',
    summary: 'A JavaScript cloud storage system for secure client-side file upload and deletion.',
    problem: 'Create a secure storage workflow with clean file APIs, protected session routes, and controlled multipart uploads.',
    solution: 'Built clean REST APIs with Node.js and Express. Integrated JWT authentication and bcrypt hashing, used security-conscious MongoDB storage models with Supabase relational tables for metadata, and configured Multer for multipart uploads.',
    client: 'EJS',
    service: 'Node + Express',
    data: 'MongoDB + Supabase',
    tags: ['EJS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'bcrypt', 'Multer', 'Supabase'],
    result: 'Delivered secure client-side file upload and deletion workflows with protected session routes.'
  }
};

function readyPage() {
  document.querySelector('.loading-screen')?.classList.add('loaded');
  document.body.classList.add('ready');
}
window.setTimeout(readyPage, 800);
window.addEventListener('load', () => window.setTimeout(readyPage, 100));

// Reveal chapters only once, keeping reduced-motion users on the visible state.
const reveals = document.querySelectorAll('.reveal');
if (prefersReducedMotion) {
  reveals.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach((item) => revealObserver.observe(item));
}

// Glass navigation switches tone as the page moves between light and dark chapters.
const header = document.querySelector('.site-header');
const lightSections = document.querySelectorAll('.intro, .projects, .education, .achievements, .contact');
const lightSectionVisibility = new Map();
const navToneObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => lightSectionVisibility.set(entry.target, entry.isIntersecting));
  const onLight = [...lightSectionVisibility.values()].some(Boolean);
  header?.classList.toggle('on-light', onLight);
}, { rootMargin: '-12% 0px -80% 0px', threshold: 0 });
lightSections.forEach((section) => navToneObserver.observe(section));

// Refined mobile navigation.
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
}
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu?.classList.toggle('open', !isOpen);
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

// Skill cards are intentionally contextual instead of showing made-up percentages.
const skillName = document.querySelector('#skill-name');
const skillCopy = document.querySelector('#skill-copy');
const skillProject = document.querySelector('#skill-project');
document.querySelectorAll('.skill-pill').forEach((button) => {
  button.addEventListener('click', () => {
    const data = skillData[button.dataset.skill];
    if (!data) return;
    document.querySelectorAll('.skill-pill').forEach((pill) => pill.classList.remove('active'));
    button.classList.add('active');
    skillName.textContent = data.name;
    skillCopy.textContent = data.copy;
    skillProject.textContent = data.project;
  });
});

// Public GitHub activity is refreshed in the visitor's browser, so the count does not go stale in the source code.
const contributionCount = document.querySelector('#github-contributions');
async function refreshGitHubContributions() {
  if (!contributionCount) return;
  try {
    const response = await fetch('https://github-contributions-api.jogruber.de/v4/yashwanth8634?y=last', { cache: 'no-store' });
    if (!response.ok) throw new Error('Contribution service unavailable');
    const activity = await response.json();
    const total = Array.isArray(activity.contributions)
      ? activity.contributions.reduce((sum, day) => sum + Number(day.count || 0), 0)
      : 0;
    if (!total) throw new Error('No activity total returned');
    contributionCount.textContent = new Intl.NumberFormat('en-IN').format(total);
    contributionCount.setAttribute('aria-label', `${total} GitHub contributions in the past year`);
  } catch {
    contributionCount.textContent = '—';
    contributionCount.setAttribute('aria-label', 'Live GitHub contribution count unavailable');
  }
}
refreshGitHubContributions();

// The project detail layer provides an accessible, cinematic case-study transition.
const dialog = document.querySelector('.project-dialog');
const dialogClose = document.querySelector('.dialog-close');
const dialogTitle = document.querySelector('#dialog-title');
const dialogSummary = document.querySelector('.dialog-summary');
const dialogIndex = document.querySelector('.dialog-index');
const dialogProblem = document.querySelector('.dialog-problem');
const dialogSolution = document.querySelector('.dialog-solution');
const dialogResult = document.querySelector('.dialog-result');
const dialogTags = document.querySelector('.dialog-tags');
const archClient = document.querySelector('.arch-client');
const archService = document.querySelector('.arch-service');
const archData = document.querySelector('.arch-data');

function openProject(projectId) {
  const project = projectData[projectId];
  if (!project || !dialog) return;
  dialogIndex.textContent = project.index;
  dialogTitle.textContent = project.title;
  dialogSummary.textContent = project.summary;
  dialogProblem.textContent = project.problem;
  dialogSolution.textContent = project.solution;
  dialogResult.textContent = project.result;
  archClient.textContent = project.client;
  archService.textContent = project.service;
  archData.textContent = project.data;
  dialogTags.replaceChildren(...project.tags.map((tag) => {
    const item = document.createElement('span');
    item.textContent = tag;
    return item;
  }));
  document.body.classList.add('dialog-open');
  dialog.showModal();
  dialogClose?.focus();
}
function closeProject() {
  dialog?.close();
  document.body.classList.remove('dialog-open');
}
document.querySelectorAll('.project-open').forEach((button) => button.addEventListener('click', () => openProject(button.dataset.project)));
dialogClose?.addEventListener('click', closeProject);
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) closeProject();
});
dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

// Desktop-only cursor and tactile magnetic response.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const ringText = ring?.querySelector('span');
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });
  const followCursor = () => {
    ringX += (mouseX - ringX) * .16;
    ringY += (mouseY - ringY) * .16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(followCursor);
  };
  followCursor();
  document.querySelectorAll('a, button, input, textarea').forEach((interactive) => {
    interactive.addEventListener('mouseenter', () => {
      ring.classList.add('hovering');
      if (ringText) ringText.textContent = interactive.classList.contains('project-open') ? 'VIEW' : 'OPEN';
    });
    interactive.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      element.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
    });
    element.addEventListener('mouseleave', () => { element.style.transform = ''; });
  });
}

// CSS 3D objects respond gently to the user and tell the scroll story.
if (!prefersReducedMotion) {
  const projectStack = document.querySelector('#hero-stack');
  const stackStage = document.querySelector('.hero-stack-stage');
  const tiltCards = document.querySelectorAll('.tilt-card');
  let pendingFrame = false;
  let pointerX = 0;
  let pointerY = 0;
  window.addEventListener('pointermove', (event) => {
    pointerX = (event.clientX / window.innerWidth - .5) * 2;
    pointerY = (event.clientY / window.innerHeight - .5) * 2;
    if (!pendingFrame) {
      pendingFrame = true;
      requestAnimationFrame(() => {
        if (projectStack) projectStack.style.transform = `rotateX(${12 - pointerY * 6}deg) rotateY(${-18 + pointerX * 9}deg) rotateZ(${-8 + pointerX * 2}deg)`;
        tiltCards.forEach((card) => { card.style.transform = `perspective(800px) rotateX(${-pointerY * 3}deg) rotateY(${pointerX * 4}deg)`; });
        pendingFrame = false;
      });
    }
  });
  let scrollFrame = false;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = true;
    requestAnimationFrame(() => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      if (stackStage) {
        stackStage.style.transform = `translate(-50%, calc(-50% + ${progress * 35}px)) scale(${1 - progress * .14})`;
        stackStage.style.opacity = String(1 - progress * .35);
      }
      scrollFrame = false;
    });
  }, { passive: true });
}
