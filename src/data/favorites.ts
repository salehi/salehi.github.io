// Favorite projects, chosen by the owner, shown in this order.
// `description` overrides the GitHub description on this site only.
// Language, stars and last-update come from the GitHub API at build time.
export type Favorite = {
  repo: string;
  description: string;
  live?: string;
  docker?: string;
};

export const favorites: Favorite[] = [
  {
    repo: 's3proxy_lua',
    description:
      'High-throughput S3 signature proxy on OpenResty/Lua: validates client AWS SigV4 signatures and re-signs requests for origin S3 servers.',
  },
  {
    repo: 's3proxy',
    description:
      'Serve an S3 service under another domain: re-signs AWS SigV4 requests per backend, with health-checked multi-backend failover and streaming.',
    docker: 'https://hub.docker.com/r/s4l3h1/s3proxy',
  },
  {
    repo: 'ParsiAnalyzer',
    description:
      'Persian (Farsi) text-analysis plugin for Elasticsearch: normalization, stop words, light stemming and dictionary lemmatization.',
  },
  {
    repo: 'arvancloud_to_cloudflare',
    description:
      'Back up ArvanCloud DNS records and convert them into a Cloudflare import file, as a Python CLI or a zero-install browser page.',
    live: 'https://salehi.github.io/arvancloud_to_cloudflare/',
  },
  {
    repo: 'bazaar-dl',
    description: 'Resolve Cafe Bazaar app links to direct APK downloads from Bazaar’s own CDN.',
    live: 'https://salehi.github.io/bazaar-dl/',
  },
  {
    repo: 'digipay',
    description:
      'DigiPay UPG lifecycle sandbox: a browser-only stepper plus a stateless Cloudflare Worker proxy to prove the payment API end to end.',
    live: 'https://salehi.github.io/digipay/',
  },
  {
    repo: 'enamad',
    description:
      'Scrapes Iran’s enamad.ir e-commerce trust-seal registry (~140k rows) to CSV and publishes it as a searchable table.',
    live: 'https://salehi.github.io/enamad/',
  },
  {
    repo: 'netscope',
    description:
      'Self-hosted GeoIP and network intelligence: IP, ASN, country, organization and CIDR lookups over a web UI and REST API.',
  },
  {
    repo: 'android-emulator-farm',
    description:
      'Headless Android emulators in Docker, one image per API level (24–36), built and published by GitHub Actions.',
    docker: 'https://hub.docker.com/r/s4l3h1/android-emulator-farm',
  },
  {
    repo: 'mailer',
    description:
      'Send-only SMTP relay with DKIM, SPF and DMARC: a 7.5 MB scratch image that queues, signs and delivers from your own IP.',
    docker: 'https://hub.docker.com/r/s4l3h1/mailer',
  },
  {
    repo: 'tavazon',
    description:
      'Keep an asymmetric hosting quota in balance by sending shaped, distributed traffic. Single static Go binary with a built-in dashboard.',
    docker: 'https://hub.docker.com/r/s4l3h1/tavazon',
  },
  {
    repo: 'meshcheck-android',
    description: 'MeshCheck Android peer-node contributor app, built with Kotlin and Jetpack Compose.',
  },
  {
    repo: 'meshcheck-agent',
    description:
      'MeshCheck node agent: a peer-contributed reachability probe (ping, TCP, HTTP, DNS, TLS, SMTP) with Ed25519-signed results.',
  },
  {
    repo: 'nginx-cors-gate',
    description:
      'Nginx CORS gateway that actually blocks unauthorized origins, not just adds headers. Strict validation and wildcard domains.',
  },
  {
    repo: 'certbot-dns-arvancloud',
    description:
      'Certbot DNS-01 authenticator for ArvanCloud, for Let’s Encrypt wildcard certificates. Ships as a prebuilt Docker image.',
    docker: 'https://hub.docker.com/r/s4l3h1/certbot-dns-arvancloud',
  },
];
