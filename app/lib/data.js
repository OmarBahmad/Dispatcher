import { Client, Task, User } from "./models";
import { connectToDB } from "./utils";

const ITEMS_PER_PAGE = 10;

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    const count = await User.countDocuments({ username: { $regex: regex } });
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Users.");
  }
};

export const fetchSingleUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch User.");
  }
};

export const fetchTasks = async (q, page) => {
  connectToDB();

  // Se 'q' estiver vazio, query é {}, ou seja, busca tudo
  // Se 'q' não estiver vazio, busca drivername contendo q (ignora maiúsculo/minúsculo)
  const query = q
    ? { clientName: { $regex: new RegExp(q, "i") } }
    : {};

  try {
    const count = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));

    return { count, tasks };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Tasks.");
  }
};

export const fetchSingleTask = async (id) => {
  try {
    connectToDB();
    const task = await Task.findById(id);
    return task;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Task.");
  }
};

export const fetchClients = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    // Substituir find().count() por countDocuments()
    const count = await Client.countDocuments({ name: { $regex: regex } });
    const clients = await Client.find({ name: { $regex: regex } })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return { count, clients };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Clients.");
  }
};

export const fetchSingleClient = async (id) => {
  try {
    connectToDB();
    const client = await Client.findById(id);
    return JSON.stringify(client);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Client.");
  }
};
