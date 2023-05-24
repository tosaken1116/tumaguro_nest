import * as bcrypt from "bcrypt";
export const genPasswordHash: (rawPassword: string) => Promise<string> = async (
  rawPassword: string,
): Promise<string> => {
    const hashed_password= await bcrypt.hash(rawPassword, 10);
  return hashed_password
};

export const checkPasswordCorrect = (rawPassword:string,hashedPassword) => {
    return bcrypt.compareSync(rawPassword,hashedPassword)
}