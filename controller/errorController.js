export const handleError = (res, error, template, additionalErrors = []) => {
  let errors = [];

  if (error && error.errors) {
    errors = Object.values(error.errors).map((err) => err.message);
  } else if (error && error.message === "Email address is already in use.") {
    errors.push(error.message);
  } else {
    console.error(error);
    errors.push("An unexpected error occurred. Please try again later.");
  }

  errors = errors.concat(additionalErrors);

  res.render(template, { errors, user: {} });
};