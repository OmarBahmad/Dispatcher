"use server";

import { revalidatePath } from "next/cache";
import { Client, Task, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, isAdmin } = Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
  } catch (err) {
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      username,
      email,
      password,
      isAdmin,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        updateFields[key] === "" || (undefined && delete updateFields[key])
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addTask = async (formData) => {
  const {
    title,
    cat,
    driverlicence,
    licenseplate,
    drivername,
    car,
    desc,
    labor,
    overtime,
    totalAmount,
    paidAmount,
    dueAmount,
    status
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const newTask = new Task({
      title,
      cat,
      driverlicence,
      licenseplate,
      labor,
      overtime,
      totalAmount,
      paidAmount,
      dueAmount,
      status,
      drivername,
      car,
      desc
    });
    console.log('newTask', newTask)

    await newTask.save();
  } catch (err) {
    console.log("erro na criação da task", err);
    throw new Error("Failed to create task!");
  }

  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
};

export const updateTask = async (formData) => {
  const { id, title, cat, driverlicence, licenseplate, drivername, car, desc } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      cat,
      driverlicence,
      licenseplate,
      drivername,
      car,
      desc,
    };

    // Remove campos vazios ou indefinidos
    Object.keys(updateFields).forEach(
      (key) =>
        updateFields[key] === "" || (undefined && delete updateFields[key])
    );

    await Task.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    throw new Error("Failed to update task!");
  }

  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
};

export const addClient = async (formData) => {
  const {
    name,
    email,
    clientImg,
    budget,
    address,
    paymentMethod,
    phone,
    note,
    insuranceData,
    cars,
  } = Object.fromEntries(formData);

  const parsedInsuranceData = JSON.parse(insuranceData);
  const parsedCars = JSON.parse(cars);

  try {
    await connectToDB();

    const newUser = new Client({
      name,
      email,
      clientImg,
      budget,
      address,
      paymentMethod,
      phone,
      note,
      insuranceData: parsedInsuranceData,
      cars: parsedCars,
    });

    await newUser.save();
  } catch (err) {
    console.log("Erro na criação do cliente", err);
    throw new Error("Failed to create client!");
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
};

export const updateClient = async (formData) => {
  const {
    id,
    name,
    email,
    clientImg,
    budget,
    address,
    paymentMethod,
    phone,
    note,
    insuranceData,
    cars,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();

    const updateFields = {
      name,
      email,
      clientImg,
      budget,
      address,
      paymentMethod,
      phone,
      note,
      insuranceData: JSON.parse(insuranceData),
      cars: JSON.parse(cars),
    };


    console.log('updateFields', updateFields)
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    await Client.findByIdAndUpdate(id, updateFields, { new: true });
  } catch (err) {
    console.error("Failed to update client!", err);
    throw new Error("Failed to update client!");
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
};

export const deleteUser = async (formData) => {
  const data = Object.fromEntries(formData);

  try {
    connectToDB();

    await User.findByIdAndDelete(data.id);
  } catch (err) {
    console.log("erro no delete do usuário", err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};

export const deleteTask = async (formData) => {
  const data = Object.fromEntries(formData);

  try {
    connectToDB();

    await Task.findByIdAndDelete(data.id);
  } catch (err) {
    console.log("erro no delete da task", err);
    throw new Error("Failed to delete task!");
  }

  revalidatePath("/dashboard/tasks");
};

export const deleteClient = async (formData) => {
  const data = Object.fromEntries(formData);

  try {
    connectToDB();

    await Client.findByIdAndDelete(data.id);
  } catch (err) {
    console.log("erro no delete do cliente", err);
    throw new Error("Failed to delete client!");
  }

  revalidatePath("/dashboard/clients");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
