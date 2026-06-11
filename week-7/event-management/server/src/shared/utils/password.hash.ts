import bcrypt from "bcrypt";

export const passwordHash = (password: string) => {
  if (!password) {
    return;
  }
  return bcrypt.hash(password, 10);
};
