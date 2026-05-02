import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const runSeed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

        const db = mongoose.connection.db;

        const user = await db.collection("users").findOne({});

        if (!user) {
            throw new Error("No user found. Please create a user first.");
        }

        await db.collection("blogs").insertMany([
            {
                title: "How to Build a Production-Ready MERN Blog Platform",
                summary:
                    "A detailed guide to building a complete MERN blog platform with authentication, admin publishing, SEO, custom HTML rendering, and deployment readiness.",
                coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Full Stack Development</p>
  <h1>How to Build a Production-Ready MERN Blog Platform</h1>
  <p class="lead">Building a blog app is easy. Building a real publishing platform that feels professional, scalable, secure, and SEO-friendly requires better planning.</p>

  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Modern developer workspace" />

  <h2>1. Introduction</h2>
  <p>A modern blog platform is not only about creating, editing, and deleting posts. In a real-world application, you need authentication, protected dashboards, public pages, image handling, SEO metadata, slug-based routing, publishing states, preview systems, and clean UI.</p>
  <p>The main goal of this project is to create a complete system where admins can write and publish blogs, while visitors can browse clean, readable blog pages similar to professional content platforms.</p>
  <p>This type of app is very useful for agencies, SaaS companies, personal portfolios, technical writers, and businesses that want full control over their content without depending on WordPress or third-party CMS tools.</p>

  <h2>2. Choosing the MERN Stack</h2>
  <p>The MERN stack is a great choice because it allows the entire application to be written in JavaScript. MongoDB stores flexible blog documents, Express handles APIs, React builds the user interface, and Node.js powers the backend.</p>
  <p>MongoDB is especially useful for blog content because every blog may contain different fields like tags, custom CSS, SEO details, HTML content, status, images, and author information.</p>
  <p>React helps us create reusable UI components such as blog cards, detail pages, protected routes, dashboard layouts, editor forms, and preview panels.</p>

  <h2>3. Backend Architecture</h2>
  <p>The backend should be organized properly from the beginning. A clean folder structure may include controllers, models, routes, middleware, utils, config files, and validation files.</p>
  <p>The blog model should include title, summary, slug, cover image, HTML content, custom CSS, meta title, meta description, tags, author, status, created date, and updated date.</p>
  <p>This structure allows us to separate draft blogs from published blogs. Admin users can continue editing draft posts without showing incomplete content to public users.</p>

  <h2>4. Authentication and Authorization</h2>
  <p>Authentication is important because only logged-in users or admins should be able to create and manage blogs. JWT authentication is a common and reliable approach for this kind of application.</p>
  <p>After login, the backend returns a token. The frontend stores this token and sends it with protected API requests. Middleware on the backend verifies the token and allows access only when the user is valid.</p>
  <p>Authorization is also important. A normal user should not be able to delete blogs or access admin features. Role-based access control solves this by checking the user role before performing sensitive actions.</p>

  <h2>5. Blog Slug System</h2>
  <p>A slug is the clean URL version of the blog title. For example, a title like “How to Build a Blog Platform” becomes “how-to-build-a-blog-platform”.</p>
  <p>Slug-based routing is better for SEO and user experience. Instead of showing a blog with an ID in the URL, we can show a readable URL like /blog/how-to-build-a-blog-platform.</p>
  <p>It is important to keep slugs unique. If two blogs have the same title, the backend should either reject the duplicate slug or add a unique suffix.</p>

  <h2>6. Custom HTML and CSS Rendering</h2>
  <p>One of the strongest features of this platform is storing custom HTML and CSS for each blog. This allows each article to behave like a custom-designed landing page.</p>
  <p>Instead of forcing all blogs into one plain text layout, we can allow rich sections, styled headings, callout boxes, quote blocks, image grids, code blocks, and custom content layouts.</p>
  <blockquote>When blog content is treated as a designed page, the reading experience becomes much more premium.</blockquote>
  <p>However, custom HTML must be handled carefully. In production, you should sanitize HTML content before rendering it to avoid security problems.</p>

  <h2>7. Frontend Blog Listing Page</h2>
  <p>The public blog listing page should not simply show large images stacked vertically. A better UI uses Medium-style layouts, featured posts, clean cards, proper spacing, readable typography, and balanced image sizes.</p>
  <p>For desktop screens, you can show two or three cards per row. For mobile screens, each card should stack neatly with proper spacing and optimized image height.</p>
  <p>The homepage should quickly communicate article title, short summary, author, date, tags, and reading intent.</p>

  <h2>8. Blog Detail Page</h2>
  <p>The detail page is where users actually read the full article. This page should feel calm, focused, and readable. Avoid unnecessary borders, heavy colors, or distracting elements.</p>
  <p>A strong blog detail page usually includes a title, short intro, cover image, author information, reading date, content body, related posts, and optional sharing buttons.</p>
  <p>Typography matters a lot here. Line height should be comfortable. Paragraph width should not be too wide. Headings should clearly divide the content.</p>

  <h2>9. SEO Fields</h2>
  <p>Each blog should have meta title, meta description, canonical URL, OG image, robots value, and tags. These fields help search engines understand the content.</p>
  <p>The meta title should be concise and keyword-focused. The meta description should explain the article in a natural way and encourage users to click.</p>
  <p>Open Graph images are useful when blogs are shared on social platforms like LinkedIn, Twitter, WhatsApp, and Facebook.</p>

  <h2>10. Admin Dashboard</h2>
  <p>The admin dashboard should allow the user to create blogs, edit blogs, delete blogs, publish drafts, preview content, and manage all posts from a clean table or card layout.</p>
  <p>A good dashboard also includes filters for published and draft blogs, search by title, and quick action buttons.</p>
  <p>The create blog page should be user-friendly. It should not feel like a raw database form. It should feel like a writing tool.</p>

  <h2>11. Deployment</h2>
  <p>The frontend can be deployed on Vercel, Netlify, or any static hosting platform. The backend can be deployed on Render, Railway, AWS, Azure, or DigitalOcean.</p>
  <p>Environment variables should be used for database connection strings, JWT secrets, frontend URLs, and API URLs.</p>
  <p>For React Router apps deployed on Vercel, a rewrite rule should be added so refreshing dynamic routes does not create a 404 error.</p>

  <h2>12. Final Thoughts</h2>
  <p>A blog platform can start as a small CRUD app, but with the right architecture it can become a complete content engine. Authentication, SEO, custom rendering, clean UI, and deployment planning are what make the application production-ready.</p>
  <p>This project is a strong example of how MERN can be used to build real-world, business-ready applications.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 880px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #2563eb; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 52px; line-height: 1.08; margin: 12px 0 20px; letter-spacing: -1.5px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; margin-bottom: 30px; }
.blog-shell h2 { margin-top: 42px; font-size: 30px; line-height: 1.25; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; margin: 16px 0; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; object-fit: cover; }
.blog-shell blockquote { margin: 34px 0; padding: 22px 26px; border-left: 4px solid #2563eb; background: #eff6ff; border-radius: 14px; font-size: 21px; color: #1e3a8a; }
`,
                metaTitle: "Production-Ready MERN Blog Platform Guide",
                metaDescription:
                    "Learn how to build a professional MERN blog platform with authentication, SEO, custom HTML/CSS rendering, and deployment readiness.",
                ogImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                canonicalUrl: "http://localhost:5173/blog/production-ready-mern-blog-platform",
                robots: "index,follow",
                tags: ["mern", "react", "nodejs", "mongodb", "seo", "blog"],
                slug: "production-ready-mern-blog-platform",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "React UI Design Principles for a Premium Blog Website",
                summary:
                    "A practical article explaining how to design a premium blog UI using React, modern card layouts, readable typography, spacing, and responsive components.",
                coverImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Frontend Design</p>
  <h1>React UI Design Principles for a Premium Blog Website</h1>
  <p class="lead">A blog website should not only work correctly. It should also feel clean, premium, readable, and trustworthy from the first screen.</p>

  <img src="https://images.unsplash.com/photo-1559028012-481c04fa702d" alt="UI design workspace" />

  <h2>1. Why UI Matters in Blog Applications</h2>
  <p>Many blog apps fail not because the backend is weak, but because the frontend does not create a good reading experience. Oversized images, weak spacing, unclear hierarchy, and transparent borders can make even good content feel low quality.</p>
  <p>A premium blog interface should guide the reader naturally. The title should be clear, the summary should be easy to scan, and the card layout should make users want to click and read more.</p>
  <p>React gives us the ability to build reusable, consistent, and responsive UI components that can be used across the entire blog platform.</p>

  <h2>2. Start with Layout Hierarchy</h2>
  <p>The first thing to improve is hierarchy. A blog homepage should usually have a featured post area, latest articles, category filters, and a clean list or grid of posts.</p>
  <p>Not every blog card needs to be huge. If every card takes the full screen width with a large image, users have to scroll too much. A better approach is to use a balanced grid or an editorial layout.</p>
  <p>For example, the first blog can be displayed as a large featured article, while the remaining posts can appear in two-column or three-column cards.</p>

  <h2>3. Image Size and Ratio</h2>
  <p>Images create the first impression, but oversized images can destroy the UI. Blog cards should use consistent image ratios such as 16:9, 4:3, or fixed height containers.</p>
  <p>On the detail page, the cover image can be larger, but it should still respect maximum width and proper border radius.</p>
  <p>In React, you can create a reusable BlogCard component where every image follows the same height and object-fit behavior.</p>

  <h2>4. Typography</h2>
  <p>Typography is one of the biggest differences between a basic blog and a premium blog. Titles need strong weight, summaries need comfortable line height, and body content should not feel compressed.</p>
  <p>For blog detail pages, keep the content width between 720px and 900px. If the content is too wide, reading becomes difficult.</p>
  <blockquote>Good typography makes users stay longer because reading feels effortless.</blockquote>

  <h2>5. Card Design</h2>
  <p>Cards should have visible boundaries. If borders are too transparent, the UI feels unfinished. Use slightly darker borders, soft shadows, rounded corners, and clean hover effects.</p>
  <p>A good blog card includes a cover image, category, title, short summary, date, author, and a small read more indicator.</p>
  <p>Hover effects should be subtle. For example, the card can move up slightly, the image can scale gently, and the shadow can become stronger.</p>

  <h2>6. Responsive Behavior</h2>
  <p>Desktop layouts and mobile layouts should not be the same. On desktop, a grid layout works well. On mobile, cards should stack vertically with smaller images and tighter spacing.</p>
  <p>Navigation should also be responsive. A clean mobile drawer is better than a menu that simply drops from the top and pushes content down.</p>
  <p>Responsive design should be tested on real screen widths, not only browser resize mode.</p>

  <h2>7. Blog Detail Page Design</h2>
  <p>The blog detail page should feel like a reading canvas. Avoid too many cards around the content. Keep the focus on the article.</p>
  <p>Use a strong headline, a short subtitle, author details, cover image, and then the full content. Add enough white space between sections.</p>
  <p>For long articles, headings should be visually clear so the reader can scan the page easily.</p>

  <h2>8. Dark Text and Premium Contrast</h2>
  <p>Low contrast text makes the application look weak. Use dark text for headings, medium gray for summaries, and clear border colors for cards.</p>
  <p>For light themes, colors like slate, zinc, neutral, and gray palettes work very well. Avoid using too many bright colors.</p>

  <h2>9. Loading and Empty States</h2>
  <p>A premium UI also handles loading and empty states properly. Instead of showing blank screens, use skeleton cards while data is loading.</p>
  <p>If there are no blogs, show a clean empty state with a helpful message and action button.</p>

  <h2>10. Final Thoughts</h2>
  <p>A professional blog UI is created through many small decisions. Image ratio, spacing, typography, borders, shadows, hover effects, and responsive layouts all work together.</p>
  <p>When these details are handled well, the same blog content feels much more valuable and trustworthy.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Inter, Arial, sans-serif; color: #111827; }
.eyebrow { color: #7c3aed; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #4b5563; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #374151; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #7c3aed; background: #f5f3ff; border-radius: 14px; color: #4c1d95; font-size: 21px; }
`,
                metaTitle: "React UI Design Principles for Premium Blog Websites",
                metaDescription:
                    "Learn how to design a premium React blog UI with better layouts, cards, typography, responsive design, and readable blog detail pages.",
                ogImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
                canonicalUrl: "http://localhost:5173/blog/react-ui-design-principles-premium-blog-website",
                robots: "index,follow",
                tags: ["react", "ui design", "blog ui", "frontend", "responsive design"],
                slug: "react-ui-design-principles-premium-blog-website",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "JWT Authentication in MERN Apps Explained Step by Step",
                summary:
                    "A complete beginner-friendly explanation of JWT authentication in MERN applications, including login flow, protected routes, middleware, and token handling.",
                coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Backend Security</p>
  <h1>JWT Authentication in MERN Apps Explained Step by Step</h1>
  <p class="lead">Authentication is one of the most important parts of any real-world web application. JWT helps us protect APIs and identify logged-in users.</p>

  <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f" alt="Security and authentication" />

  <h2>1. What is JWT?</h2>
  <p>JWT stands for JSON Web Token. It is a compact token format used to securely transfer information between frontend and backend.</p>
  <p>In a MERN app, JWT is commonly used after login. When a user logs in successfully, the backend creates a token and sends it to the frontend.</p>
  <p>The frontend then sends this token with protected API requests so the backend can verify who is making the request.</p>

  <h2>2. Why Authentication is Needed</h2>
  <p>Without authentication, anyone could access private data, create blogs, delete records, or perform admin actions. Authentication protects the system.</p>
  <p>For a blog app, public users can read published blogs, but only logged-in admins should be able to create, edit, or delete blogs.</p>

  <h2>3. Login Flow</h2>
  <p>The login flow starts when the user submits email and password. The backend finds the user by email and compares the submitted password with the stored hashed password.</p>
  <p>If the password is correct, the backend signs a JWT using a secret key. This token usually contains the user ID and sometimes the user role.</p>
  <p>The frontend receives the token and stores it in localStorage, sessionStorage, or a secure cookie depending on the architecture.</p>

  <h2>4. Protected Routes</h2>
  <p>Protected routes are backend routes that require a valid token. For example, creating a blog should be protected. Getting published blogs may be public.</p>
  <p>A middleware function reads the token from the Authorization header. The common format is Bearer token.</p>
  <p>If the token is valid, the middleware attaches the user data to the request object and allows the request to continue.</p>

  <h2>5. Role-Based Authorization</h2>
  <p>Authentication only confirms who the user is. Authorization confirms what the user is allowed to do.</p>
  <p>For example, both admin and normal user can login. But only admin can publish or delete blogs.</p>
  <blockquote>Authentication answers “Who are you?” Authorization answers “What can you access?”</blockquote>

  <h2>6. Token Expiry</h2>
  <p>JWT tokens should not live forever. A token expiry time improves security. If the token is stolen, it becomes useless after expiry.</p>
  <p>Common expiry values are 1 hour, 1 day, or 7 days depending on the application requirements.</p>

  <h2>7. Frontend Token Handling</h2>
  <p>On the frontend, Axios interceptors can automatically attach the token to every protected API request.</p>
  <p>This avoids repeating header logic in every API call. If the token is missing or expired, the user can be redirected to login.</p>

  <h2>8. Common Mistakes</h2>
  <p>One common mistake is forgetting to add the Bearer prefix. Another mistake is using the wrong JWT secret between development and production.</p>
  <p>Developers also sometimes protect public routes accidentally, which can break the blog listing page.</p>
  <p>Another important mistake is calling middleware during route registration instead of passing it as a function reference.</p>

  <h2>9. Security Best Practices</h2>
  <p>Always hash passwords using bcrypt. Never store plain text passwords. Keep JWT secrets in environment variables. Never expose secrets in frontend code.</p>
  <p>Use HTTPS in production. Add rate limiting on login APIs to reduce brute-force attacks.</p>

  <h2>10. Final Thoughts</h2>
  <p>JWT authentication is simple once the flow is clear. Login creates a token, frontend stores the token, protected routes verify the token, and authorization checks the user role.</p>
  <p>This pattern is used in many production MERN applications and is very important for secure full-stack development.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #dc2626; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #dc2626; background: #fef2f2; border-radius: 14px; color: #7f1d1d; font-size: 21px; }
`,
                metaTitle: "JWT Authentication in MERN Apps Explained",
                metaDescription:
                    "Understand JWT authentication in MERN apps with login flow, protected routes, middleware, token expiry, and role-based authorization.",
                ogImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
                canonicalUrl: "http://localhost:5173/blog/jwt-authentication-in-mern-apps-explained",
                robots: "index,follow",
                tags: ["jwt", "authentication", "mern", "nodejs", "express", "security"],
                slug: "jwt-authentication-in-mern-apps-explained",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "MongoDB Schema Design for Blog and Content Platforms",
                summary:
                    "Learn how to design flexible MongoDB schemas for blogs, authors, tags, SEO fields, draft publishing, and scalable content management systems.",
                coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Database Design</p>
  <h1>MongoDB Schema Design for Blog and Content Platforms</h1>
  <p class="lead">Good schema design makes your blog platform easier to maintain, faster to query, and more flexible for future features.</p>

  <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d" alt="Database server room" />

  <h2>1. Why Schema Design Matters</h2>
  <p>MongoDB is flexible, but flexibility does not mean we should store data randomly. A blog platform needs consistent fields so the frontend and backend can work reliably.</p>
  <p>A good schema makes it easier to build blog listing pages, detail pages, admin dashboards, search features, filters, SEO pages, and author profiles.</p>

  <h2>2. Blog Document Structure</h2>
  <p>A blog document should include basic content fields like title, summary, cover image, slug, content, author, status, tags, and timestamps.</p>
  <p>For a modern platform, it should also include SEO fields such as meta title, meta description, OG image, canonical URL, and robots value.</p>
  <p>If the platform supports custom HTML and CSS, the document can include htmlContent and customCss fields.</p>

  <h2>3. Author Relationship</h2>
  <p>The author field usually stores a reference to the users collection. This allows us to connect every blog with the user who created it.</p>
  <p>Using a reference is better than duplicating full user details in every blog. If the author's name or profile changes later, the user document can be updated in one place.</p>

  <h2>4. Tags and Categories</h2>
  <p>Tags help users discover related content. They also help the frontend build category pages and filters.</p>
  <p>Tags can be stored as an array of strings for simple systems. For larger systems, categories and tags can become separate collections.</p>

  <h2>5. Draft and Published Status</h2>
  <p>Status is a very important field. A blog can be draft, published, archived, or scheduled.</p>
  <p>The public API should return only published blogs. The admin API can return all blogs depending on permissions.</p>
  <blockquote>Never expose draft content from public APIs unless it is intentionally preview-only and protected.</blockquote>

  <h2>6. Slugs and Indexes</h2>
  <p>The slug field should be unique because it is used in public URLs. Adding a database index on slug improves lookup speed.</p>
  <p>You can also add indexes on status, createdAt, author, and tags for faster filtering and sorting.</p>

  <h2>7. SEO Metadata</h2>
  <p>SEO fields should be stored with every blog because each article is its own public page.</p>
  <p>The meta title can be different from the visible blog title. The meta description should be optimized for search results.</p>
  <p>The canonical URL helps avoid duplicate content issues when the same article may be available from multiple paths.</p>

  <h2>8. Content Storage Strategy</h2>
  <p>There are multiple ways to store content. You can store plain text, Markdown, rich text JSON, HTML, or custom page sections.</p>
  <p>For this platform, HTML content and custom CSS provide maximum design flexibility. However, this requires careful rendering and sanitization.</p>

  <h2>9. Timestamps</h2>
  <p>Created and updated timestamps help with sorting, audit trails, and showing publish dates on the frontend.</p>
  <p>In Mongoose, timestamps can be generated automatically, but manual timestamps also work in seed scripts.</p>

  <h2>10. Scaling the Schema</h2>
  <p>As the platform grows, you can add views, comments, likes, reading time, featured status, related posts, and content analytics.</p>
  <p>The schema should be flexible enough to support these future improvements without major rewrites.</p>

  <h2>11. Final Thoughts</h2>
  <p>MongoDB is powerful for content platforms because it allows flexible documents. But a professional application still needs thoughtful schema planning.</p>
  <p>A well-designed schema improves performance, reduces frontend bugs, and makes future features easier to implement.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #059669; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #059669; background: #ecfdf5; border-radius: 14px; color: #064e3b; font-size: 21px; }
`,
                metaTitle: "MongoDB Schema Design for Blog Platforms",
                metaDescription:
                    "Learn how to design MongoDB schemas for blogs, authors, tags, SEO metadata, publishing status, and scalable content platforms.",
                ogImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
                canonicalUrl: "http://localhost:5173/blog/mongodb-schema-design-for-blog-platforms",
                robots: "index,follow",
                tags: ["mongodb", "schema design", "database", "blog platform", "mongoose"],
                slug: "mongodb-schema-design-for-blog-platforms",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "Deploying a React and Node.js Blog App to Production",
                summary:
                    "A practical deployment checklist for hosting a React frontend, Node.js backend, MongoDB database, environment variables, CORS, and routing fixes.",
                coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Deployment</p>
  <h1>Deploying a React and Node.js Blog App to Production</h1>
  <p class="lead">Deployment is the final step that turns a local project into a real application users can access from anywhere.</p>

  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Cloud deployment network" />

  <h2>1. Introduction</h2>
  <p>Many developers build great apps locally but face issues during deployment. Common problems include wrong environment variables, CORS errors, 404 on refresh, broken API URLs, and database connection problems.</p>
  <p>A React and Node.js blog app usually has three major parts: frontend, backend, and database. Each part must be configured properly for production.</p>

  <h2>2. Frontend Deployment</h2>
  <p>The React frontend can be deployed on Vercel, Netlify, or similar platforms. If the project uses Vite, the build command is usually npm run build and the output directory is dist.</p>
  <p>The frontend must use the production API URL through environment variables. Hardcoded localhost URLs should never be used in production.</p>

  <h2>3. React Router Refresh Issue</h2>
  <p>Single-page applications often show 404 when users refresh a dynamic route like /blog/my-first-post. This happens because the hosting server does not know that React should handle the route.</p>
  <p>On Vercel, a vercel.json rewrite rule can send all routes to index.html. This allows React Router to handle the route correctly.</p>
  <blockquote>A working app can feel broken in production if routing fallback is not configured.</blockquote>

  <h2>4. Backend Deployment</h2>
  <p>The Node.js and Express backend can be deployed on Render, Railway, AWS, Azure, or any Node-compatible server.</p>
  <p>The backend must listen on process.env.PORT because hosting platforms assign ports dynamically.</p>
  <p>Environment variables should include MongoDB connection string, JWT secret, frontend URL, and any third-party API keys.</p>

  <h2>5. MongoDB Atlas Setup</h2>
  <p>MongoDB Atlas is commonly used for production databases. You need to create a cluster, database user, and network access rule.</p>
  <p>For production, avoid exposing your database to unnecessary IPs. Use strong passwords and store the connection string safely.</p>

  <h2>6. CORS Configuration</h2>
  <p>CORS must allow the deployed frontend domain to access the backend. During development, localhost can be allowed. In production, the deployed domain should be added.</p>
  <p>If credentials are used, CORS must be configured carefully with credentials set to true and a specific allowed origin.</p>

  <h2>7. Environment Variables</h2>
  <p>Environment variables are different between local and production. Local values are stored in .env files, while production values are added in the hosting dashboard.</p>
  <p>Never commit .env files to GitHub. Add them to .gitignore.</p>

  <h2>8. Build and Start Commands</h2>
  <p>For frontend, the build command may be npm run build. For backend, the start command may be npm start or node server.js depending on your setup.</p>
  <p>Always test commands locally before deploying.</p>

  <h2>9. Production Checklist</h2>
  <p>Before marking the app complete, test login, blog creation, blog listing, blog detail page, refresh behavior, protected routes, logout, image rendering, and API errors.</p>
  <p>Also test mobile responsiveness because most real users will access the site from mobile devices.</p>

  <h2>10. Monitoring and Logs</h2>
  <p>After deployment, logs are very important. Backend logs help debug API errors. Frontend console errors help identify broken URLs or rendering issues.</p>
  <p>A production app should not expose stack traces to users, but developers should still have enough logs to debug problems.</p>

  <h2>11. Final Thoughts</h2>
  <p>Deployment is not only about uploading code. It is about preparing the app for real users, real domains, real databases, and real errors.</p>
  <p>When routing, CORS, environment variables, and database settings are configured properly, the MERN blog app becomes production-ready.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #0891b2; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #0891b2; background: #ecfeff; border-radius: 14px; color: #164e63; font-size: 21px; }
`,
                metaTitle: "Deploy React and Node.js Blog App to Production",
                metaDescription:
                    "A complete deployment checklist for React and Node.js blog apps including frontend hosting, backend hosting, MongoDB, CORS, and routing fixes.",
                ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
                canonicalUrl: "http://localhost:5173/blog/deploy-react-nodejs-blog-app-production",
                robots: "index,follow",
                tags: ["deployment", "react", "nodejs", "vercel", "render", "mongodb"],
                slug: "deploy-react-nodejs-blog-app-production",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]); db.blogs.insertMany([
            {
                title: "How to Build a Production-Ready MERN Blog Platform",
                summary:
                    "A detailed guide to building a complete MERN blog platform with authentication, admin publishing, SEO, custom HTML rendering, and deployment readiness.",
                coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Full Stack Development</p>
  <h1>How to Build a Production-Ready MERN Blog Platform</h1>
  <p class="lead">Building a blog app is easy. Building a real publishing platform that feels professional, scalable, secure, and SEO-friendly requires better planning.</p>

  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Modern developer workspace" />

  <h2>1. Introduction</h2>
  <p>A modern blog platform is not only about creating, editing, and deleting posts. In a real-world application, you need authentication, protected dashboards, public pages, image handling, SEO metadata, slug-based routing, publishing states, preview systems, and clean UI.</p>
  <p>The main goal of this project is to create a complete system where admins can write and publish blogs, while visitors can browse clean, readable blog pages similar to professional content platforms.</p>
  <p>This type of app is very useful for agencies, SaaS companies, personal portfolios, technical writers, and businesses that want full control over their content without depending on WordPress or third-party CMS tools.</p>

  <h2>2. Choosing the MERN Stack</h2>
  <p>The MERN stack is a great choice because it allows the entire application to be written in JavaScript. MongoDB stores flexible blog documents, Express handles APIs, React builds the user interface, and Node.js powers the backend.</p>
  <p>MongoDB is especially useful for blog content because every blog may contain different fields like tags, custom CSS, SEO details, HTML content, status, images, and author information.</p>
  <p>React helps us create reusable UI components such as blog cards, detail pages, protected routes, dashboard layouts, editor forms, and preview panels.</p>

  <h2>3. Backend Architecture</h2>
  <p>The backend should be organized properly from the beginning. A clean folder structure may include controllers, models, routes, middleware, utils, config files, and validation files.</p>
  <p>The blog model should include title, summary, slug, cover image, HTML content, custom CSS, meta title, meta description, tags, author, status, created date, and updated date.</p>
  <p>This structure allows us to separate draft blogs from published blogs. Admin users can continue editing draft posts without showing incomplete content to public users.</p>

  <h2>4. Authentication and Authorization</h2>
  <p>Authentication is important because only logged-in users or admins should be able to create and manage blogs. JWT authentication is a common and reliable approach for this kind of application.</p>
  <p>After login, the backend returns a token. The frontend stores this token and sends it with protected API requests. Middleware on the backend verifies the token and allows access only when the user is valid.</p>
  <p>Authorization is also important. A normal user should not be able to delete blogs or access admin features. Role-based access control solves this by checking the user role before performing sensitive actions.</p>

  <h2>5. Blog Slug System</h2>
  <p>A slug is the clean URL version of the blog title. For example, a title like “How to Build a Blog Platform” becomes “how-to-build-a-blog-platform”.</p>
  <p>Slug-based routing is better for SEO and user experience. Instead of showing a blog with an ID in the URL, we can show a readable URL like /blog/how-to-build-a-blog-platform.</p>
  <p>It is important to keep slugs unique. If two blogs have the same title, the backend should either reject the duplicate slug or add a unique suffix.</p>

  <h2>6. Custom HTML and CSS Rendering</h2>
  <p>One of the strongest features of this platform is storing custom HTML and CSS for each blog. This allows each article to behave like a custom-designed landing page.</p>
  <p>Instead of forcing all blogs into one plain text layout, we can allow rich sections, styled headings, callout boxes, quote blocks, image grids, code blocks, and custom content layouts.</p>
  <blockquote>When blog content is treated as a designed page, the reading experience becomes much more premium.</blockquote>
  <p>However, custom HTML must be handled carefully. In production, you should sanitize HTML content before rendering it to avoid security problems.</p>

  <h2>7. Frontend Blog Listing Page</h2>
  <p>The public blog listing page should not simply show large images stacked vertically. A better UI uses Medium-style layouts, featured posts, clean cards, proper spacing, readable typography, and balanced image sizes.</p>
  <p>For desktop screens, you can show two or three cards per row. For mobile screens, each card should stack neatly with proper spacing and optimized image height.</p>
  <p>The homepage should quickly communicate article title, short summary, author, date, tags, and reading intent.</p>

  <h2>8. Blog Detail Page</h2>
  <p>The detail page is where users actually read the full article. This page should feel calm, focused, and readable. Avoid unnecessary borders, heavy colors, or distracting elements.</p>
  <p>A strong blog detail page usually includes a title, short intro, cover image, author information, reading date, content body, related posts, and optional sharing buttons.</p>
  <p>Typography matters a lot here. Line height should be comfortable. Paragraph width should not be too wide. Headings should clearly divide the content.</p>

  <h2>9. SEO Fields</h2>
  <p>Each blog should have meta title, meta description, canonical URL, OG image, robots value, and tags. These fields help search engines understand the content.</p>
  <p>The meta title should be concise and keyword-focused. The meta description should explain the article in a natural way and encourage users to click.</p>
  <p>Open Graph images are useful when blogs are shared on social platforms like LinkedIn, Twitter, WhatsApp, and Facebook.</p>

  <h2>10. Admin Dashboard</h2>
  <p>The admin dashboard should allow the user to create blogs, edit blogs, delete blogs, publish drafts, preview content, and manage all posts from a clean table or card layout.</p>
  <p>A good dashboard also includes filters for published and draft blogs, search by title, and quick action buttons.</p>
  <p>The create blog page should be user-friendly. It should not feel like a raw database form. It should feel like a writing tool.</p>

  <h2>11. Deployment</h2>
  <p>The frontend can be deployed on Vercel, Netlify, or any static hosting platform. The backend can be deployed on Render, Railway, AWS, Azure, or DigitalOcean.</p>
  <p>Environment variables should be used for database connection strings, JWT secrets, frontend URLs, and API URLs.</p>
  <p>For React Router apps deployed on Vercel, a rewrite rule should be added so refreshing dynamic routes does not create a 404 error.</p>

  <h2>12. Final Thoughts</h2>
  <p>A blog platform can start as a small CRUD app, but with the right architecture it can become a complete content engine. Authentication, SEO, custom rendering, clean UI, and deployment planning are what make the application production-ready.</p>
  <p>This project is a strong example of how MERN can be used to build real-world, business-ready applications.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 880px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #2563eb; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 52px; line-height: 1.08; margin: 12px 0 20px; letter-spacing: -1.5px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; margin-bottom: 30px; }
.blog-shell h2 { margin-top: 42px; font-size: 30px; line-height: 1.25; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; margin: 16px 0; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; object-fit: cover; }
.blog-shell blockquote { margin: 34px 0; padding: 22px 26px; border-left: 4px solid #2563eb; background: #eff6ff; border-radius: 14px; font-size: 21px; color: #1e3a8a; }
`,
                metaTitle: "Production-Ready MERN Blog Platform Guide",
                metaDescription:
                    "Learn how to build a professional MERN blog platform with authentication, SEO, custom HTML/CSS rendering, and deployment readiness.",
                ogImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                canonicalUrl: "http://localhost:5173/blog/production-ready-mern-blog-platform",
                robots: "index,follow",
                tags: ["mern", "react", "nodejs", "mongodb", "seo", "blog"],
                slug: "production-ready-mern-blog-platform",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "React UI Design Principles for a Premium Blog Website",
                summary:
                    "A practical article explaining how to design a premium blog UI using React, modern card layouts, readable typography, spacing, and responsive components.",
                coverImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Frontend Design</p>
  <h1>React UI Design Principles for a Premium Blog Website</h1>
  <p class="lead">A blog website should not only work correctly. It should also feel clean, premium, readable, and trustworthy from the first screen.</p>

  <img src="https://images.unsplash.com/photo-1559028012-481c04fa702d" alt="UI design workspace" />

  <h2>1. Why UI Matters in Blog Applications</h2>
  <p>Many blog apps fail not because the backend is weak, but because the frontend does not create a good reading experience. Oversized images, weak spacing, unclear hierarchy, and transparent borders can make even good content feel low quality.</p>
  <p>A premium blog interface should guide the reader naturally. The title should be clear, the summary should be easy to scan, and the card layout should make users want to click and read more.</p>
  <p>React gives us the ability to build reusable, consistent, and responsive UI components that can be used across the entire blog platform.</p>

  <h2>2. Start with Layout Hierarchy</h2>
  <p>The first thing to improve is hierarchy. A blog homepage should usually have a featured post area, latest articles, category filters, and a clean list or grid of posts.</p>
  <p>Not every blog card needs to be huge. If every card takes the full screen width with a large image, users have to scroll too much. A better approach is to use a balanced grid or an editorial layout.</p>
  <p>For example, the first blog can be displayed as a large featured article, while the remaining posts can appear in two-column or three-column cards.</p>

  <h2>3. Image Size and Ratio</h2>
  <p>Images create the first impression, but oversized images can destroy the UI. Blog cards should use consistent image ratios such as 16:9, 4:3, or fixed height containers.</p>
  <p>On the detail page, the cover image can be larger, but it should still respect maximum width and proper border radius.</p>
  <p>In React, you can create a reusable BlogCard component where every image follows the same height and object-fit behavior.</p>

  <h2>4. Typography</h2>
  <p>Typography is one of the biggest differences between a basic blog and a premium blog. Titles need strong weight, summaries need comfortable line height, and body content should not feel compressed.</p>
  <p>For blog detail pages, keep the content width between 720px and 900px. If the content is too wide, reading becomes difficult.</p>
  <blockquote>Good typography makes users stay longer because reading feels effortless.</blockquote>

  <h2>5. Card Design</h2>
  <p>Cards should have visible boundaries. If borders are too transparent, the UI feels unfinished. Use slightly darker borders, soft shadows, rounded corners, and clean hover effects.</p>
  <p>A good blog card includes a cover image, category, title, short summary, date, author, and a small read more indicator.</p>
  <p>Hover effects should be subtle. For example, the card can move up slightly, the image can scale gently, and the shadow can become stronger.</p>

  <h2>6. Responsive Behavior</h2>
  <p>Desktop layouts and mobile layouts should not be the same. On desktop, a grid layout works well. On mobile, cards should stack vertically with smaller images and tighter spacing.</p>
  <p>Navigation should also be responsive. A clean mobile drawer is better than a menu that simply drops from the top and pushes content down.</p>
  <p>Responsive design should be tested on real screen widths, not only browser resize mode.</p>

  <h2>7. Blog Detail Page Design</h2>
  <p>The blog detail page should feel like a reading canvas. Avoid too many cards around the content. Keep the focus on the article.</p>
  <p>Use a strong headline, a short subtitle, author details, cover image, and then the full content. Add enough white space between sections.</p>
  <p>For long articles, headings should be visually clear so the reader can scan the page easily.</p>

  <h2>8. Dark Text and Premium Contrast</h2>
  <p>Low contrast text makes the application look weak. Use dark text for headings, medium gray for summaries, and clear border colors for cards.</p>
  <p>For light themes, colors like slate, zinc, neutral, and gray palettes work very well. Avoid using too many bright colors.</p>

  <h2>9. Loading and Empty States</h2>
  <p>A premium UI also handles loading and empty states properly. Instead of showing blank screens, use skeleton cards while data is loading.</p>
  <p>If there are no blogs, show a clean empty state with a helpful message and action button.</p>

  <h2>10. Final Thoughts</h2>
  <p>A professional blog UI is created through many small decisions. Image ratio, spacing, typography, borders, shadows, hover effects, and responsive layouts all work together.</p>
  <p>When these details are handled well, the same blog content feels much more valuable and trustworthy.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Inter, Arial, sans-serif; color: #111827; }
.eyebrow { color: #7c3aed; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #4b5563; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #374151; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #7c3aed; background: #f5f3ff; border-radius: 14px; color: #4c1d95; font-size: 21px; }
`,
                metaTitle: "React UI Design Principles for Premium Blog Websites",
                metaDescription:
                    "Learn how to design a premium React blog UI with better layouts, cards, typography, responsive design, and readable blog detail pages.",
                ogImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
                canonicalUrl: "http://localhost:5173/blog/react-ui-design-principles-premium-blog-website",
                robots: "index,follow",
                tags: ["react", "ui design", "blog ui", "frontend", "responsive design"],
                slug: "react-ui-design-principles-premium-blog-website",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "JWT Authentication in MERN Apps Explained Step by Step",
                summary:
                    "A complete beginner-friendly explanation of JWT authentication in MERN applications, including login flow, protected routes, middleware, and token handling.",
                coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Backend Security</p>
  <h1>JWT Authentication in MERN Apps Explained Step by Step</h1>
  <p class="lead">Authentication is one of the most important parts of any real-world web application. JWT helps us protect APIs and identify logged-in users.</p>

  <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f" alt="Security and authentication" />

  <h2>1. What is JWT?</h2>
  <p>JWT stands for JSON Web Token. It is a compact token format used to securely transfer information between frontend and backend.</p>
  <p>In a MERN app, JWT is commonly used after login. When a user logs in successfully, the backend creates a token and sends it to the frontend.</p>
  <p>The frontend then sends this token with protected API requests so the backend can verify who is making the request.</p>

  <h2>2. Why Authentication is Needed</h2>
  <p>Without authentication, anyone could access private data, create blogs, delete records, or perform admin actions. Authentication protects the system.</p>
  <p>For a blog app, public users can read published blogs, but only logged-in admins should be able to create, edit, or delete blogs.</p>

  <h2>3. Login Flow</h2>
  <p>The login flow starts when the user submits email and password. The backend finds the user by email and compares the submitted password with the stored hashed password.</p>
  <p>If the password is correct, the backend signs a JWT using a secret key. This token usually contains the user ID and sometimes the user role.</p>
  <p>The frontend receives the token and stores it in localStorage, sessionStorage, or a secure cookie depending on the architecture.</p>

  <h2>4. Protected Routes</h2>
  <p>Protected routes are backend routes that require a valid token. For example, creating a blog should be protected. Getting published blogs may be public.</p>
  <p>A middleware function reads the token from the Authorization header. The common format is Bearer token.</p>
  <p>If the token is valid, the middleware attaches the user data to the request object and allows the request to continue.</p>

  <h2>5. Role-Based Authorization</h2>
  <p>Authentication only confirms who the user is. Authorization confirms what the user is allowed to do.</p>
  <p>For example, both admin and normal user can login. But only admin can publish or delete blogs.</p>
  <blockquote>Authentication answers “Who are you?” Authorization answers “What can you access?”</blockquote>

  <h2>6. Token Expiry</h2>
  <p>JWT tokens should not live forever. A token expiry time improves security. If the token is stolen, it becomes useless after expiry.</p>
  <p>Common expiry values are 1 hour, 1 day, or 7 days depending on the application requirements.</p>

  <h2>7. Frontend Token Handling</h2>
  <p>On the frontend, Axios interceptors can automatically attach the token to every protected API request.</p>
  <p>This avoids repeating header logic in every API call. If the token is missing or expired, the user can be redirected to login.</p>

  <h2>8. Common Mistakes</h2>
  <p>One common mistake is forgetting to add the Bearer prefix. Another mistake is using the wrong JWT secret between development and production.</p>
  <p>Developers also sometimes protect public routes accidentally, which can break the blog listing page.</p>
  <p>Another important mistake is calling middleware during route registration instead of passing it as a function reference.</p>

  <h2>9. Security Best Practices</h2>
  <p>Always hash passwords using bcrypt. Never store plain text passwords. Keep JWT secrets in environment variables. Never expose secrets in frontend code.</p>
  <p>Use HTTPS in production. Add rate limiting on login APIs to reduce brute-force attacks.</p>

  <h2>10. Final Thoughts</h2>
  <p>JWT authentication is simple once the flow is clear. Login creates a token, frontend stores the token, protected routes verify the token, and authorization checks the user role.</p>
  <p>This pattern is used in many production MERN applications and is very important for secure full-stack development.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #dc2626; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #dc2626; background: #fef2f2; border-radius: 14px; color: #7f1d1d; font-size: 21px; }
`,
                metaTitle: "JWT Authentication in MERN Apps Explained",
                metaDescription:
                    "Understand JWT authentication in MERN apps with login flow, protected routes, middleware, token expiry, and role-based authorization.",
                ogImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
                canonicalUrl: "http://localhost:5173/blog/jwt-authentication-in-mern-apps-explained",
                robots: "index,follow",
                tags: ["jwt", "authentication", "mern", "nodejs", "express", "security"],
                slug: "jwt-authentication-in-mern-apps-explained",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "MongoDB Schema Design for Blog and Content Platforms",
                summary:
                    "Learn how to design flexible MongoDB schemas for blogs, authors, tags, SEO fields, draft publishing, and scalable content management systems.",
                coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Database Design</p>
  <h1>MongoDB Schema Design for Blog and Content Platforms</h1>
  <p class="lead">Good schema design makes your blog platform easier to maintain, faster to query, and more flexible for future features.</p>

  <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d" alt="Database server room" />

  <h2>1. Why Schema Design Matters</h2>
  <p>MongoDB is flexible, but flexibility does not mean we should store data randomly. A blog platform needs consistent fields so the frontend and backend can work reliably.</p>
  <p>A good schema makes it easier to build blog listing pages, detail pages, admin dashboards, search features, filters, SEO pages, and author profiles.</p>

  <h2>2. Blog Document Structure</h2>
  <p>A blog document should include basic content fields like title, summary, cover image, slug, content, author, status, tags, and timestamps.</p>
  <p>For a modern platform, it should also include SEO fields such as meta title, meta description, OG image, canonical URL, and robots value.</p>
  <p>If the platform supports custom HTML and CSS, the document can include htmlContent and customCss fields.</p>

  <h2>3. Author Relationship</h2>
  <p>The author field usually stores a reference to the users collection. This allows us to connect every blog with the user who created it.</p>
  <p>Using a reference is better than duplicating full user details in every blog. If the author's name or profile changes later, the user document can be updated in one place.</p>

  <h2>4. Tags and Categories</h2>
  <p>Tags help users discover related content. They also help the frontend build category pages and filters.</p>
  <p>Tags can be stored as an array of strings for simple systems. For larger systems, categories and tags can become separate collections.</p>

  <h2>5. Draft and Published Status</h2>
  <p>Status is a very important field. A blog can be draft, published, archived, or scheduled.</p>
  <p>The public API should return only published blogs. The admin API can return all blogs depending on permissions.</p>
  <blockquote>Never expose draft content from public APIs unless it is intentionally preview-only and protected.</blockquote>

  <h2>6. Slugs and Indexes</h2>
  <p>The slug field should be unique because it is used in public URLs. Adding a database index on slug improves lookup speed.</p>
  <p>You can also add indexes on status, createdAt, author, and tags for faster filtering and sorting.</p>

  <h2>7. SEO Metadata</h2>
  <p>SEO fields should be stored with every blog because each article is its own public page.</p>
  <p>The meta title can be different from the visible blog title. The meta description should be optimized for search results.</p>
  <p>The canonical URL helps avoid duplicate content issues when the same article may be available from multiple paths.</p>

  <h2>8. Content Storage Strategy</h2>
  <p>There are multiple ways to store content. You can store plain text, Markdown, rich text JSON, HTML, or custom page sections.</p>
  <p>For this platform, HTML content and custom CSS provide maximum design flexibility. However, this requires careful rendering and sanitization.</p>

  <h2>9. Timestamps</h2>
  <p>Created and updated timestamps help with sorting, audit trails, and showing publish dates on the frontend.</p>
  <p>In Mongoose, timestamps can be generated automatically, but manual timestamps also work in seed scripts.</p>

  <h2>10. Scaling the Schema</h2>
  <p>As the platform grows, you can add views, comments, likes, reading time, featured status, related posts, and content analytics.</p>
  <p>The schema should be flexible enough to support these future improvements without major rewrites.</p>

  <h2>11. Final Thoughts</h2>
  <p>MongoDB is powerful for content platforms because it allows flexible documents. But a professional application still needs thoughtful schema planning.</p>
  <p>A well-designed schema improves performance, reduces frontend bugs, and makes future features easier to implement.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #059669; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #059669; background: #ecfdf5; border-radius: 14px; color: #064e3b; font-size: 21px; }
`,
                metaTitle: "MongoDB Schema Design for Blog Platforms",
                metaDescription:
                    "Learn how to design MongoDB schemas for blogs, authors, tags, SEO metadata, publishing status, and scalable content platforms.",
                ogImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
                canonicalUrl: "http://localhost:5173/blog/mongodb-schema-design-for-blog-platforms",
                robots: "index,follow",
                tags: ["mongodb", "schema design", "database", "blog platform", "mongoose"],
                slug: "mongodb-schema-design-for-blog-platforms",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                title: "Deploying a React and Node.js Blog App to Production",
                summary:
                    "A practical deployment checklist for hosting a React frontend, Node.js backend, MongoDB database, environment variables, CORS, and routing fixes.",
                coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
                htmlContent: `
<section class="blog-shell">
  <p class="eyebrow">Deployment</p>
  <h1>Deploying a React and Node.js Blog App to Production</h1>
  <p class="lead">Deployment is the final step that turns a local project into a real application users can access from anywhere.</p>

  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" alt="Cloud deployment network" />

  <h2>1. Introduction</h2>
  <p>Many developers build great apps locally but face issues during deployment. Common problems include wrong environment variables, CORS errors, 404 on refresh, broken API URLs, and database connection problems.</p>
  <p>A React and Node.js blog app usually has three major parts: frontend, backend, and database. Each part must be configured properly for production.</p>

  <h2>2. Frontend Deployment</h2>
  <p>The React frontend can be deployed on Vercel, Netlify, or similar platforms. If the project uses Vite, the build command is usually npm run build and the output directory is dist.</p>
  <p>The frontend must use the production API URL through environment variables. Hardcoded localhost URLs should never be used in production.</p>

  <h2>3. React Router Refresh Issue</h2>
  <p>Single-page applications often show 404 when users refresh a dynamic route like /blog/my-first-post. This happens because the hosting server does not know that React should handle the route.</p>
  <p>On Vercel, a vercel.json rewrite rule can send all routes to index.html. This allows React Router to handle the route correctly.</p>
  <blockquote>A working app can feel broken in production if routing fallback is not configured.</blockquote>

  <h2>4. Backend Deployment</h2>
  <p>The Node.js and Express backend can be deployed on Render, Railway, AWS, Azure, or any Node-compatible server.</p>
  <p>The backend must listen on process.env.PORT because hosting platforms assign ports dynamically.</p>
  <p>Environment variables should include MongoDB connection string, JWT secret, frontend URL, and any third-party API keys.</p>

  <h2>5. MongoDB Atlas Setup</h2>
  <p>MongoDB Atlas is commonly used for production databases. You need to create a cluster, database user, and network access rule.</p>
  <p>For production, avoid exposing your database to unnecessary IPs. Use strong passwords and store the connection string safely.</p>

  <h2>6. CORS Configuration</h2>
  <p>CORS must allow the deployed frontend domain to access the backend. During development, localhost can be allowed. In production, the deployed domain should be added.</p>
  <p>If credentials are used, CORS must be configured carefully with credentials set to true and a specific allowed origin.</p>

  <h2>7. Environment Variables</h2>
  <p>Environment variables are different between local and production. Local values are stored in .env files, while production values are added in the hosting dashboard.</p>
  <p>Never commit .env files to GitHub. Add them to .gitignore.</p>

  <h2>8. Build and Start Commands</h2>
  <p>For frontend, the build command may be npm run build. For backend, the start command may be npm start or node server.js depending on your setup.</p>
  <p>Always test commands locally before deploying.</p>

  <h2>9. Production Checklist</h2>
  <p>Before marking the app complete, test login, blog creation, blog listing, blog detail page, refresh behavior, protected routes, logout, image rendering, and API errors.</p>
  <p>Also test mobile responsiveness because most real users will access the site from mobile devices.</p>

  <h2>10. Monitoring and Logs</h2>
  <p>After deployment, logs are very important. Backend logs help debug API errors. Frontend console errors help identify broken URLs or rendering issues.</p>
  <p>A production app should not expose stack traces to users, but developers should still have enough logs to debug problems.</p>

  <h2>11. Final Thoughts</h2>
  <p>Deployment is not only about uploading code. It is about preparing the app for real users, real domains, real databases, and real errors.</p>
  <p>When routing, CORS, environment variables, and database settings are configured properly, the MERN blog app becomes production-ready.</p>
</section>
`,
                customCss: `
.blog-shell { max-width: 860px; margin: 0 auto; padding: 56px 24px; font-family: Arial, sans-serif; color: #0f172a; }
.eyebrow { color: #0891b2; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
.blog-shell h1 { font-size: 50px; line-height: 1.08; margin: 12px 0 20px; }
.lead { font-size: 21px; line-height: 1.8; color: #475569; }
.blog-shell h2 { margin-top: 40px; font-size: 30px; }
.blog-shell p { font-size: 18px; line-height: 1.9; color: #334155; }
.blog-shell img { width: 100%; border-radius: 22px; margin: 32px 0; }
.blog-shell blockquote { margin: 32px 0; padding: 22px 26px; border-left: 4px solid #0891b2; background: #ecfeff; border-radius: 14px; color: #164e63; font-size: 21px; }
`,
                metaTitle: "Deploy React and Node.js Blog App to Production",
                metaDescription:
                    "A complete deployment checklist for React and Node.js blog apps including frontend hosting, backend hosting, MongoDB, CORS, and routing fixes.",
                ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
                canonicalUrl: "http://localhost:5173/blog/deploy-react-nodejs-blog-app-production",
                robots: "index,follow",
                tags: ["deployment", "react", "nodejs", "vercel", "render", "mongodb"],
                slug: "deploy-react-nodejs-blog-app-production",
                author: user._id,
                status: "published",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);

        console.log("Blogs seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
};

runSeed();