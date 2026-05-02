export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email?.trim()) {
    errors.email = "Email is required";
  }

  if (!password?.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateRegisterForm = ({ name, email, password }) => {
  const errors = {};

  if (!name?.trim()) {
    errors.name = "Name is required";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!email?.trim()) {
    errors.email = "Email is required";
  }

  if (!password?.trim()) {
    errors.password = "Password is required";
  } else if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export const validateBlogForm = ({
  title,
  summary,
  coverImage,
  htmlContent,
  customCss,
  metaTitle,
  metaDescription,
  ogImage,
  canonicalUrl,
  robots,
  tags,
  status
}) => {
  const errors = {};

  if (!title?.trim()) {
    errors.title = "Title is required";
  } else if (title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (!summary?.trim()) {
    errors.summary = "Summary is required";
  } else if (summary.trim().length < 20) {
    errors.summary = "Summary must be at least 20 characters";
  } else if (summary.trim().length > 400) {
    errors.summary = "Summary cannot exceed 400 characters";
  }

  if (coverImage?.trim()) {
    try {
      const url = new URL(coverImage.trim());
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.coverImage = "Cover image must be a valid URL";
      }
    } catch (error) {
      errors.coverImage = "Cover image must be a valid URL";
    }
  }

  if (!htmlContent?.trim()) {
    errors.htmlContent = "HTML content is required";
  } else if (htmlContent.trim().length < 20) {
    errors.htmlContent = "HTML content must be at least 20 characters";
  }

  if (customCss !== undefined && typeof customCss !== "string") {
    errors.customCss = "Custom CSS must be text";
  }

  if (metaTitle?.trim() && metaTitle.trim().length > 200) {
    errors.metaTitle = "Meta title cannot exceed 200 characters";
  }

  if (metaDescription?.trim() && metaDescription.trim().length > 320) {
    errors.metaDescription = "Meta description cannot exceed 320 characters";
  }

  if (ogImage?.trim()) {
    try {
      const url = new URL(ogImage.trim());
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.ogImage = "OG image must be a valid URL";
      }
    } catch (error) {
      errors.ogImage = "OG image must be a valid URL";
    }
  }

  if (canonicalUrl?.trim()) {
    try {
      const url = new URL(canonicalUrl.trim());
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.canonicalUrl = "Canonical URL must be a valid URL";
      }
    } catch (error) {
      errors.canonicalUrl = "Canonical URL must be a valid URL";
    }
  }

  if (robots?.trim() && !["index,follow", "noindex,nofollow"].includes(robots)) {
    errors.robots = 'Robots must be "index,follow" or "noindex,nofollow"';
  }

  if (!status?.trim()) {
    errors.status = "Status is required";
  }

  return errors;
};