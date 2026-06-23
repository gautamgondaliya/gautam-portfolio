export const projectsData = [
    {
        id: 1,
        name: 'BizzCommSync App',
        description: "Built BizzCommsync, a client management platform using React.js, Node.js, Express.js, and MongoDB. Integrated AWS EC2, S3 for hosting and storage, real-time messaging with Twilio, and CSV uploads with Multer. Automated deployments with AWS CodePipeline and Jenkins. Designed a scalable microservices architecture with Docker and added advanced analytics for client insights.",
        tools: ['Express', 'MongoDB', 'ReactJs', 'Material-UI', 'REST APIs', 'Twilio (OTP)', 'Multer','NodeJs', 'AWS S3', 'Node Mailer','EC2',],
        role: 'Backend Developer',
        code: '',
        demo: '',
    },
    {
        id: 2,
        name: 'Pay-Per-View Boxing League',
        description: 'Architected an end-to-end global Pay-Per-View boxing livestream platform with secure stream access and real-time ticket purchases. Built a scalable microservices architecture (12+ services) on AWS with Application Load Balancer and Auto Scaling Groups (3→20 instances) to absorb live-event traffic spikes. The livestreaming pipeline ingests RTMP, encodes via AWS IVS, secures with AES-128 HLS, and distributes through CloudFront/Akamai — scaling to 200,000+ concurrent viewers at 99.9% availability. Integrated Stripe with IP-based currency localization across 20+ currencies, processing 7,000+ webhook events through Kafka with PCI compliance and zero data vulnerabilities. Validated with k6 load tests at 200k concurrent users (p95 ~340ms) and monitored via Prometheus/Grafana dashboards tracking 50+ infra and app metrics.',
        tools: ['ReactJs', 'NodeJs', 'AWS IVS', 'Kafka', 'Redis', 'Stripe', 'CloudFront', 'AWS ALB', 'Auto Scaling', 'Prometheus', 'Grafana', 'k6', 'HLS', 'RTMP', 'Microservices'],
        role: 'Team Lead & Full Stack Developer',
        code: '',
        demo: 'https://allstarinfluencers.com/',
    },
    {
        id: 3,
        name: 'Social Gaming Platform',
        description: 'Built scalable backend microservices for a sweepstakes-based social gaming platform supporting virtual currency and real-time user engagement. Implemented real-time chat and notification infrastructure over WebSockets, and constructed a rakeback and wagering tracking engine that dynamically computes user rewards from gameplay activity. Transactional services built with NestJS and PostgreSQL, with throughput boosted via Redis caching and pub/sub. Integrated Sumsub KYC for automated, secure identity onboarding. Containerized services with Docker, deployed on AWS, and collaborated with Next.js frontend teams to deliver real-time APIs and interactive features.',
        tools: ['Nextjs', 'NestJs', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker', 'AWS', 'Sumsub KYC', 'Microservices', 'Pub/Sub'],
        code: '',
        role: 'Team Lead & Full Stack Developer',
        demo: 'https://winwinsweeps.com/',
    },
    {
        id: 4,
        name: 'Wulf Casino',
        description: "Built an online casino platform from scratch to production — currently live in the US. Engineered the full bonus engine including rakeback, cashback, and instant rebate logic. Integrated dual KYC identity verification via Sumsub and Seon for secure onboarding and fraud prevention, plus payment processing through Coinflow and Breeze. Deployed on AWS with auto-scaling and load balancing for traffic spikes, Redis for caching, and a CDN for fast global content delivery, alongside geo-blocking for regulatory compliance. Beta launch completed and load-tested with 1,000+ concurrent users.",
        tools: ['NestJs','NextJs', 'AWS', 'Auto Scaling', 'Load Balancing', 'Redis', 'CDN', 'Sumsub', 'Seon', 'Coinflow', 'Breeze', 'Geo-blocking', 'Microservices'],
        code: '',
        demo: 'https://www.wulfcasino.com/en',
        role: 'Team Lead & Full Stack Developer',
    }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
// },