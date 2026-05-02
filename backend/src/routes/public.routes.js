import express from "express";
import env from "../config/env.js";
import Blog from "../models/Blog.js";
import { getPublishedBlogsForSitemap } from "../modules/blog/blog.service.js";

const router = express.Router();

const escapeHtml = (value = "") => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

router.get("/sitemap.xml", async (req, res, next) => {
  try {
    const blogs = await getPublishedBlogsForSitemap();

    const urls = blogs
      .map((blog) => {
        return `
  <url>
    <loc>${env.appBaseUrl}/blog/${blog.slug}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${env.appBaseUrl}/</loc>
  </url>${urls}
</urlset>`;

    res.header("Content-Type", "application/xml");
    return res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
});

router.get("/robots.txt", (req, res) => {
  const robots = `User-agent: *
Allow: /

Sitemap: ${env.appBaseUrl}/sitemap.xml
`;

  res.header("Content-Type", "text/plain");
  return res.status(200).send(robots);
});

router.get("/og/blog/:slug", async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
      robots: { $ne: "noindex,nofollow" }
    })
      .select("title summary coverImage metaTitle metaDescription ogImage slug")
      .lean();

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    const title = escapeHtml(blog.metaTitle || blog.title);
    const description = escapeHtml(blog.metaDescription || blog.summary);
    const image = escapeHtml(blog.ogImage || blog.coverImage || "");
    const url = `${env.appBaseUrl}/blog/${blog.slug}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>${title}</title>
  <meta name="description" content="${description}" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${url}" />
  ${image ? `<meta property="og:image" content="${image}" />` : ""}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  ${image ? `<meta name="twitter:image" content="${image}" />` : ""}

  <link rel="canonical" href="${url}" />
</head>
<body>
  <script>
    window.location.href = "${url}";
  </script>
  <p>Redirecting to <a href="${url}">${title}</a></p>
</body>
</html>`;

    res.header("Content-Type", "text/html");
    return res.status(200).send(html);
  } catch (error) {
    next(error);
  }
});

export default router;