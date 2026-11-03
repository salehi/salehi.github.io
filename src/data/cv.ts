// Résumé content. Transcribed from Muhammad_Salehi_DevOps_Engineer_CV.pdf.
// The phone number is intentionally left out of the public site and PDF.
export const cv = {
  name: 'Muhammad Salehi',
  title: 'Principal Engineer — DevOps, SRE, backend & networking',
  summary:
    '10+ years building and operating production infrastructure across Linux, networking, containers, CI/CD, observability, backend systems and distributed network tooling.',
  location: 'Istanbul, Türkiye',
  contacts: [
    { label: 'salehi1994@gmail.com', href: 'mailto:salehi1994@gmail.com' },
    { label: 'linkedin.com/in/s4l3h1', href: 'https://www.linkedin.com/in/s4l3h1' },
    { label: 'github.com/salehi', href: 'https://github.com/salehi' },
    { label: 'salehi.github.io', href: 'https://salehi.github.io' },
  ],
  profile:
    'Linux-first infrastructure engineer with a background that grew from systems administration into DevOps, production reliability, automation and backend engineering. Experienced with containerized and microservice environments, GitLab CI/CD, production observability, networking, security hardening, Elasticsearch, and performance-oriented infrastructure work.',
  capabilities: [
    { area: 'Infrastructure', items: ['Linux', 'Docker', 'Nginx', 'HAProxy', 'SSH', 'System administration', 'Infrastructure automation'] },
    { area: 'Delivery', items: ['GitLab CI/CD', 'Jenkins', 'Automated test / staging / production environments'] },
    { area: 'Observability', items: ['Prometheus', 'Grafana', 'Graylog', 'Netdata', 'Elasticsearch'] },
    { area: 'Networking', items: ['TCP/IP', 'DNS', 'TLS', 'HTTP', 'WebRTC', 'STUN/TURN', 'Reverse proxies', 'Container networking'] },
    { area: 'Engineering', items: ['Python', 'Django', 'Go', 'Starlette / FastAPI', 'REST APIs', 'Performance optimization'] },
    { area: 'Reliability', items: ['High availability', 'Failure isolation', 'SPOF reduction', 'Health checks', 'Monitoring', 'Security hardening'] },
  ],
  selectedWork: [
    { name: 'MeshCheck', text: 'Distributed network reachability and diagnostics platform. Remote checks span ping, TCP, HTTP, DNS, TLS and SMTP, with a Go-based node agent speaking the MeshCheck agent protocol.' },
    { name: 'NetScope / net.meshcheck.io', text: 'Network intelligence and diagnostic service covering IP, ASN, CIDR, country and organization-oriented lookup capabilities with an offline GeoIP database.' },
    { name: 'S3 Proxy', text: 'Starlette-based proxy work involving AWS Signature V4, multiple backends, HA/load-balancing patterns, health checks and streaming.' },
    { name: 'AutoSSH container', text: 'Persistent SSH/SOCKS5 tunneling with automatic recovery and health-oriented container operation.' },
    { name: 'Nginx CORS Gateway', text: 'Containerized reverse-proxy gateway with origin validation, preflight handling, upstream configuration and health endpoints.' },
  ],
  experience: [
    { company: 'Lendo', role: 'DevOps Engineer', period: 'Apr 2020 — Sep 2026', points: ['Production infrastructure, reliability, automation and operational engineering.'] },
    { company: 'Pingi', role: 'Principal Engineer', period: 'Jul 2024 — Apr 2025', points: ['Backend maintainability and performance; CI/CD and infrastructure automation; security hardening and firewall configuration; mentoring on development and operational workflows.'] },
    { company: 'Zeero', role: 'DevOps Engineer', period: 'Jan 2023 — Feb 2025', points: ['DevOps and production infrastructure responsibilities.'] },
    { company: 'GAMA EdTech', role: 'Technical Consultant', period: 'Jan 2020 — Mar 2024', points: ['Database clustering and performance optimization; worked on high-volume production systems with peak periods reaching millions of requests.'] },
    { company: 'Timcheh.com', role: 'DevOps Engineer', period: 'Oct 2020 — Oct 2023', points: ['Production DevOps and infrastructure engineering.'] },
    { company: 'Bookapo', role: 'Backend Developer', period: 'Oct 2021 — Dec 2022', points: ['Reworked a legacy Joomla/PHP application into Django REST Framework + Next.js; designed the database migration plan and a backward-compatible API layer.'] },
    { company: 'AzPezeshk', role: 'DevOps Engineer', period: 'Jan 2020 — Dec 2022', points: ['Dockerized microservices; GitLab CI/CD; staging/production environments; WebRTC infrastructure using STUN/TURN.'] },
    { company: 'Snappfood', role: 'DevOps Engineer', period: 'Jan 2018 — Dec 2019', points: ['Containerization, CI/CD, automated test environments, SPOF reduction, Linux administration, CDN work, Elasticsearch tuning, and infrastructure/software monitoring.'] },
    { company: 'Map', role: 'DevOps Engineer', period: 'Jul 2017 — Jan 2018', points: ['DevOps engineering.'] },
  ],
  earlier: 'Earlier technical background: systems and infrastructure work preceding the DevOps-focused roles. Education intentionally omitted.',
  languages: ['English', 'RoboCup Simulation'],
};
