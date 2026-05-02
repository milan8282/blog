import { useMemo } from "react";

const buildPreviewDocument = ({ title, htmlContent, customCss }) => {
  const safeTitle = title || "Blog Preview";
  const safeHtml = htmlContent || "";
  const safeCss = customCss || "";

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${safeTitle}</title>
        <style>
          body {
            margin: 0;
            padding: 32px;
            background: #ffffff;
            color: #0f172a;
            font-family: Inter, Arial, sans-serif;
          }

          img, video, iframe {
            max-width: 100%;
          }

          * {
            box-sizing: border-box;
          }

          ${safeCss}
        </style>
      </head>
      <body>
        ${safeHtml}
      </body>
    </html>
  `;
};

const BlogPreview = ({ title, htmlContent, customCss }) => {
  const previewDocument = useMemo(() => {
    return buildPreviewDocument({
      title,
      htmlContent,
      customCss
    });
  }, [title, htmlContent, customCss]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 px-2">
        <h2 className="text-lg font-semibold text-slate-900">Live Preview</h2>
        <p className="mt-1 text-sm text-slate-600">
          Preview how your saved HTML and CSS will render.
        </p>
      </div>

      <iframe
        title="Blog live preview"
        srcDoc={previewDocument}
        sandbox="allow-same-origin"
        className="min-h-[700px] w-full rounded-2xl border border-slate-200 bg-white"
      />
    </section>
  );
};

export default BlogPreview;