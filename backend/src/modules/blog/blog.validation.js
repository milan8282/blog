const isValidImageUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
};

const isValidUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
};

const normalizeTags = (tags) => {
  if (tags === undefined) return [];
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return null;
};

export const validateCreateBlogInput = (payload = {}) => {
  const errors = {};

  if (!payload.title || typeof payload.title !== "string" || !payload.title.trim()) {
    errors.title = "Title is required";
  } else if (payload.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (payload.title.trim().length > 200) {
    errors.title = "Title cannot exceed 200 characters";
  }

  if (!payload.summary || typeof payload.summary !== "string" || !payload.summary.trim()) {
    errors.summary = "Summary is required";
  } else if (payload.summary.trim().length < 20) {
    errors.summary = "Summary must be at least 20 characters";
  } else if (payload.summary.trim().length > 400) {
    errors.summary = "Summary cannot exceed 400 characters";
  }

  if (
    payload.coverImage !== undefined &&
    payload.coverImage !== null &&
    payload.coverImage !== "" &&
    (typeof payload.coverImage !== "string" || !isValidImageUrl(payload.coverImage.trim()))
  ) {
    errors.coverImage = "Cover image must be a valid URL";
  }

  if (
    !payload.htmlContent ||
    typeof payload.htmlContent !== "string" ||
    !payload.htmlContent.trim()
  ) {
    errors.htmlContent = "HTML content is required";
  } else if (payload.htmlContent.trim().length < 20) {
    errors.htmlContent = "HTML content must be at least 20 characters";
  }

  if (
    payload.customCss !== undefined &&
    payload.customCss !== null &&
    typeof payload.customCss !== "string"
  ) {
    errors.customCss = "Custom CSS must be a string";
  }

  if (
    payload.metaTitle !== undefined &&
    payload.metaTitle !== null &&
    typeof payload.metaTitle !== "string"
  ) {
    errors.metaTitle = "Meta title must be a string";
  } else if (payload.metaTitle?.trim().length > 200) {
    errors.metaTitle = "Meta title cannot exceed 200 characters";
  }

  if (
    payload.metaDescription !== undefined &&
    payload.metaDescription !== null &&
    typeof payload.metaDescription !== "string"
  ) {
    errors.metaDescription = "Meta description must be a string";
  } else if (payload.metaDescription?.trim().length > 320) {
    errors.metaDescription = "Meta description cannot exceed 320 characters";
  }

  if (
    payload.ogImage !== undefined &&
    payload.ogImage !== null &&
    payload.ogImage !== "" &&
    (typeof payload.ogImage !== "string" || !isValidImageUrl(payload.ogImage.trim()))
  ) {
    errors.ogImage = "OG image must be a valid URL";
  }

  if (
    payload.canonicalUrl !== undefined &&
    payload.canonicalUrl !== null &&
    payload.canonicalUrl !== "" &&
    (typeof payload.canonicalUrl !== "string" || !isValidUrl(payload.canonicalUrl.trim()))
  ) {
    errors.canonicalUrl = "Canonical URL must be a valid URL";
  }

  if (
    payload.robots !== undefined &&
    payload.robots !== null &&
    !["index,follow", "noindex,nofollow"].includes(payload.robots)
  ) {
    errors.robots = 'Robots must be "index,follow" or "noindex,nofollow"';
  }

  const normalizedTags = normalizeTags(payload.tags);
  if (payload.tags !== undefined && normalizedTags === null) {
    errors.tags = "Tags must be an array or comma-separated string";
  }

  if (!payload.status || typeof payload.status !== "string") {
    errors.status = "Status is required";
  } else if (!["draft", "published"].includes(payload.status)) {
    errors.status = 'Status must be either "draft" or "published"';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedTags: normalizedTags || [],
  };
};

export const validateUpdateBlogInput = (payload = {}) => {
  const errors = {};

  if (payload.title !== undefined) {
    if (typeof payload.title !== "string" || !payload.title.trim()) {
      errors.title = "Title cannot be empty";
    } else if (payload.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    } else if (payload.title.trim().length > 200) {
      errors.title = "Title cannot exceed 200 characters";
    }
  }

  if (payload.summary !== undefined) {
    if (typeof payload.summary !== "string" || !payload.summary.trim()) {
      errors.summary = "Summary cannot be empty";
    } else if (payload.summary.trim().length < 20) {
      errors.summary = "Summary must be at least 20 characters";
    } else if (payload.summary.trim().length > 400) {
      errors.summary = "Summary cannot exceed 400 characters";
    }
  }

  if (payload.coverImage !== undefined) {
    if (
      payload.coverImage !== "" &&
      (typeof payload.coverImage !== "string" || !isValidImageUrl(payload.coverImage.trim()))
    ) {
      errors.coverImage = "Cover image must be a valid URL";
    }
  }

  if (payload.htmlContent !== undefined) {
    if (typeof payload.htmlContent !== "string" || !payload.htmlContent.trim()) {
      errors.htmlContent = "HTML content cannot be empty";
    } else if (payload.htmlContent.trim().length < 20) {
      errors.htmlContent = "HTML content must be at least 20 characters";
    }
  }

  if (payload.customCss !== undefined && typeof payload.customCss !== "string") {
    errors.customCss = "Custom CSS must be a string";
  }

  if (payload.metaTitle !== undefined) {
    if (typeof payload.metaTitle !== "string") {
      errors.metaTitle = "Meta title must be a string";
    } else if (payload.metaTitle.trim().length > 200) {
      errors.metaTitle = "Meta title cannot exceed 200 characters";
    }
  }

  if (payload.metaDescription !== undefined) {
    if (typeof payload.metaDescription !== "string") {
      errors.metaDescription = "Meta description must be a string";
    } else if (payload.metaDescription.trim().length > 320) {
      errors.metaDescription = "Meta description cannot exceed 320 characters";
    }
  }

  if (payload.ogImage !== undefined) {
    if (
      payload.ogImage !== "" &&
      (typeof payload.ogImage !== "string" || !isValidImageUrl(payload.ogImage.trim()))
    ) {
      errors.ogImage = "OG image must be a valid URL";
    }
  }

  if (payload.canonicalUrl !== undefined) {
    if (
      payload.canonicalUrl !== "" &&
      (typeof payload.canonicalUrl !== "string" || !isValidUrl(payload.canonicalUrl.trim()))
    ) {
      errors.canonicalUrl = "Canonical URL must be a valid URL";
    }
  }

  if (
    payload.robots !== undefined &&
    !["index,follow", "noindex,nofollow"].includes(payload.robots)
  ) {
    errors.robots = 'Robots must be "index,follow" or "noindex,nofollow"';
  }

  const normalizedTags = normalizeTags(payload.tags);
  if (payload.tags !== undefined && normalizedTags === null) {
    errors.tags = "Tags must be an array or comma-separated string";
  }

  if (payload.status !== undefined) {
    if (typeof payload.status !== "string" || !["draft", "published"].includes(payload.status)) {
      errors.status = 'Status must be either "draft" or "published"';
    }
  }

  const hasAtLeastOneField =
    payload.title !== undefined ||
    payload.summary !== undefined ||
    payload.coverImage !== undefined ||
    payload.htmlContent !== undefined ||
    payload.customCss !== undefined ||
    payload.metaTitle !== undefined ||
    payload.metaDescription !== undefined ||
    payload.ogImage !== undefined ||
    payload.canonicalUrl !== undefined ||
    payload.robots !== undefined ||
    payload.tags !== undefined ||
    payload.status !== undefined;

  if (!hasAtLeastOneField) {
    errors.general = "At least one field is required to update the blog";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedTags: normalizedTags ?? undefined,
  };
};