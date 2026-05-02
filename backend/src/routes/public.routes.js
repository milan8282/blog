import express from "express";
import env from "../config/env.js";
import { getPublishedBlogsForSitemap } from "../modules/blog/blog.service.js";

const router = express.Router();

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

export default router;