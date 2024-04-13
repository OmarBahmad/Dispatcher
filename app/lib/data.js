import { Client, Task, User } from "./models";
import { connecToDB } from "./utils";

const ITEMS_PER_PAGE = 3

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connecToDB();
    const count = await User.find({ username: { $regex: regex } }).count()
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return {count, users};
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Users.");
  }
};

export const fetchTasks = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connecToDB();
    const count = await Task.find({ title: { $regex: regex } }).count()
    const tasks = await Task.find({ title: { $regex: regex } })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return {count, tasks};
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Users.");
  }
};

export const fetchClients = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connecToDB();
    const count = await Client.find({ name: { $regex: regex } }).count()
    const clients = await Client.find({ name: { $regex: regex } })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return {count, clients};
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Users.");
  }
};