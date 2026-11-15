import assert from "node:assert/strict";
import test from "node:test";
import { loginSchema, registerSchema } from "../src/validations/AuthValidation.js";
import { createUserSchema } from "../src/validations/UserValidation.js";
import validate from "../src/middleware/Validate.js";

test("login validation accepts a valid email and normalizes its case", () => {
  const result = loginSchema.safeParse({
    email: "Test@Example.com",
    password: "secret1",
  });

  assert.equal(result.success, true);
  assert.equal(result.data.email, "test@example.com");
});

test("login validation rejects invalid emails and passwords shorter than six characters", () => {
  assert.equal(
    loginSchema.safeParse({ email: "not-an-email", password: "secret1" }).success,
    false,
  );
  assert.equal(
    loginSchema.safeParse({ email: "test@example.com", password: "short" }).success,
    false,
  );
});

test("registration validation requires a name and a password of at least six characters", () => {
  const valid = registerSchema.safeParse({
    name: "Test User",
    email: "TEST@example.com",
    password: "secret1",
  });
  const missingName = registerSchema.safeParse({
    email: "test@example.com",
    password: "secret1",
  });
  const shortPassword = registerSchema.safeParse({
    name: "Test User",
    email: "test@example.com",
    password: "short",
  });

  assert.equal(valid.success, true);
  assert.equal(valid.data.email, "test@example.com");
  assert.equal(missingName.success, false);
  assert.equal(shortPassword.success, false);
});

test("user creation validation enforces its password length limits", () => {
  const valid = {
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  };

  assert.equal(createUserSchema.safeParse(valid).success, true);
  assert.equal(
    createUserSchema.safeParse({ ...valid, password: "12345" }).success,
    false,
  );
  assert.equal(
    createUserSchema.safeParse({ ...valid, password: "123456789012345678901" }).success,
    false,
  );
});

test("validation middleware replaces the request body with parsed, normalized data", () => {
  const req = {
    body: {
      name: "Test User",
      email: "TEST@example.com",
      password: "secret1",
    },
  };
  let nextCalled = false;
  const res = {};

  validate(registerSchema)(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.body.email, "test@example.com");
});

test("validation middleware returns 422 field errors and does not continue on invalid input", () => {
  const req = { body: { email: "not-an-email", password: "short" } };
  let nextCalled = false;
  let statusCode;
  let responseBody;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      responseBody = body;
      return this;
    },
  };
  const originalLog = console.log;
  console.log = () => {};

  try {
    validate(loginSchema)(req, res, () => {
      nextCalled = true;
    });
  } finally {
    console.log = originalLog;
  }

  assert.equal(statusCode, 422);
  assert.equal(responseBody.success, false);
  assert.deepEqual(
    responseBody.errors.map((error) => error.field),
    ["email", "password"],
  );
  assert.equal(nextCalled, false);
});
