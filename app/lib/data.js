import { User } from "./models";
import { connecToDB } from "./utils";

export const fetchUsers = async (q) => {
  const regex = new RegExp(q,'i')
  try {
    connecToDB()
    const users = await User.find({username: {$regex:regex}});
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Users.");
  }
};
