import bcrypt from "bcrypt";

export const hasPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};
