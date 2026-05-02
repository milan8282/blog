const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegisterInput = (payload = {}) => {
  const errors = {};

  if (!payload.name || typeof payload.name !== "string" || !payload.name.trim()) {
    errors.name = "Name is required";
  } else if (payload.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (payload.name.trim().length > 60) {
    errors.name = "Name cannot exceed 60 characters";
  }

  if (!payload.email || typeof payload.email !== "string" || !payload.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(payload.email.trim().toLowerCase())) {
    errors.email = "Please provide a valid email address";
  }

  if (!payload.password || typeof payload.password !== "string") {
    errors.password = "Password is required";
  } else if (payload.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (payload.password.length > 128) {
    errors.password = "Password cannot exceed 128 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginInput = (payload = {}) => {
  const errors = {};

  if (!payload.email || typeof payload.email !== "string" || !payload.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(payload.email.trim().toLowerCase())) {
    errors.email = "Please provide a valid email address";
  }

  if (!payload.password || typeof payload.password !== "string") {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};