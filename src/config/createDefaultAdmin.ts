import User from "../models/user.model";
import { Role } from "../enums";
import { env } from "./env";

export const createDefaultAdmin = async() => {
  const adminExist = await User.findOne({ role: Role.ADMIN_ROLE });
  if(adminExist) return ;
  await User.create({
    username: env.ADMIN_USERNAME,
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
    type: env.ADMIN_TYPE,
    role: env.ROLE
  });
  console.log ("admin created successfuly");
}