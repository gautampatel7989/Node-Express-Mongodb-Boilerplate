const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.parse(req.body);
    req.body = result;
    next();
  } catch (error) {
    console.log("Validation error:", error.issues);
    return res.status(422).json({
      success: false,
      errors: error.issues.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }
};

export default validate;
