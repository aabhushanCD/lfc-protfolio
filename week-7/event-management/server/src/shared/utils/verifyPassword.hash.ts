import bcrypt from "bcrypt";

export const verifyPasswordHash = async (
  old: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(old, hash);
};
