-- Seed data from Biruk Ephrem's resume

-- Projects
INSERT INTO projects (title, slug, description, tech_stack, github_url, live_url, image_url) VALUES
('CoC Exam Tracking & Certificate Management', 'coc-exam-tracking', 'Built for a Certificate of Competence training center in Addis Ababa to streamline exam tracking and certificate management. Tracks registrant completion status, monitors the overall certification process, analyzes agent performance by success rate with filtering capabilities. Features user management, attendance tracking, broker analytics, training center management, certificate generation, and comprehensive reporting. Deployed with GitHub CI/CD pipeline to VPS.', 'Next.js, TypeScript, Node.js, Prisma, PostgreSQL, shadcn/ui, GitHub CI/CD', NULL, 'https://michule.com/', NULL),
('Attendance, Warehouse and Finance Management System', 'attendance-warehouse-finance', 'A comprehensive system built for Muntaha Foundation that automates beneficiary registration, attendance tracking, warehouse inventory management, and donation/payment tracking.', 'Node.js, MySQL, React', NULL, 'https://michule.com/', '/images/portfolio/michule.webp'),
('Restaurant Order Automation', 'restaurant-order-automation', 'Developed for Luna Group. Automates restaurant order processing and generates financial reports integrated with cash register systems.', 'Node.js, MySQL', NULL, NULL, NULL),
('Amharic Corpus Data', 'amharic-corpus-data', 'Collected Amharic language corpus data from web sources, PDFs, and social media. Published as an open-source dataset on HuggingFace for NLP research.', 'Python, Scrapy, Web Scraping', NULL, NULL, NULL),
('Rental Property Management System', 'rental-management', 'A comprehensive full-stack rental property management system for Ethiopian commercial real estate. Features Ethiopian calendar integration (13-month system), custom SMS gateway via Socket.IO, automated payment scheduling, bank transfer verification, PDF report generation with Ethiopian font support, and role-based access control. Digitalizes the complete rental lifecycle from tenant onboarding to payment reconciliation.', 'Next.js 15, React 19, Node.js, TypeScript, Express.js, TypeORM, MySQL, Socket.IO, TailwindCSS, Zustand, PM2, Nginx', NULL, NULL, NULL);

-- Experiences
INSERT INTO experiences (company, role, location, start_date, end_date, description, sort_order) VALUES
('ETTA Solutions PLC', 'DevOps Engineer', 'Addis Ababa', '2025-01', NULL, 'Implement CI/CD pipelines to automate deployments and improve release cycles. Design and maintain scalable cloud infrastructure for client solutions. Improve system integrations and ensure high availability of services.', 1),
('Faris Technologies', 'Senior Software Engineer', 'Addis Ababa', '2023-12', '2025-02', 'Developed ICT solutions for diverse business requirements. Collected Amharic language data through web scraping using Puppeteer, Scrapy, and Selenium. Published dataset on HuggingFace and contributed to LLM fine-tuning efforts. Built and maintained full-stack applications using modern frameworks.', 2),
('Netib Consult', 'Full Stack Developer', 'Addis Ababa', '2021-12', '2023-12', 'Designed and implemented user interfaces for web applications. Developed and managed backend servers and databases. Delivered end-to-end solutions for client projects.', 3),
('Desert Rose', 'Web/Game Developer', 'Addis Ababa', '2020-11', '2021-06', 'Digitized an existing board game for online multiplayer access. Designed UI/UX and implemented frontend and backend systems. Integrated game servers with Telegram bot for user engagement.', 4);

-- Skills
INSERT INTO skills (name, category) VALUES
-- Cloud & DevOps
('AWS', 'Cloud & DevOps'),
('Docker', 'Cloud & DevOps'),
('Kubernetes', 'Cloud & DevOps'),
('Serverless', 'Cloud & DevOps'),
('Nginx', 'Cloud & DevOps'),
('Linux Server', 'Cloud & DevOps'),
('Git', 'Cloud & DevOps'),
('GitHub', 'Cloud & DevOps'),
-- Frontend
('React', 'Frontend'),
('Vue.js', 'Frontend'),
('Nuxt.js', 'Frontend'),
('Next.js', 'Frontend'),
('TailwindCSS', 'Frontend'),
('HTML5', 'Frontend'),
('CSS3', 'Frontend'),
('SCSS', 'Frontend'),
('TypeScript', 'Frontend'),
('JavaScript', 'Frontend'),
-- Backend
('Node.js', 'Backend'),
('Python', 'Backend'),
('Laravel', 'Backend'),
('TypeORM', 'Backend'),
('Prisma', 'Backend'),
('RESTful API', 'Backend'),
-- Databases
('MySQL', 'Databases'),
('PostgreSQL', 'Databases'),
('MongoDB', 'Databases'),
('VectorDB', 'Databases'),
-- AI & Data
('LangChain', 'AI & Data'),
('Ollama', 'AI & Data'),
('Transformers', 'AI & Data'),
('LLM', 'AI & Data'),
('Scrapy', 'AI & Data'),
('Puppeteer', 'AI & Data'),
('Web Scraping', 'AI & Data'),
-- Other
('Java', 'Other'),
('C', 'Other'),
('C++', 'Other'),
('Photoshop', 'Other'),
('WordPress', 'Other');

-- Websites
INSERT INTO websites (title, url, description, image_url) VALUES
('The Luna Groups', 'https://thelunagroups.com/', 'Official website for Luna Group.', '/images/portfolio/luna-groups.webp'),
('Fresh Corner', 'https://freshcorneret.com/', 'E-commerce platform for fresh produce.', '/images/portfolio/fresh-corner.webp'),
('Promise Land Generation', 'https://promiselandgeneration.org/', 'Non-profit organization website.', '/images/portfolio/promise-land.webp');
