"use server";

import { revalidatePath } from "next/cache";
import { Client, Task, User } from "./models";
import { connecToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
  const { username, email, password, isAdmin } = Object.fromEntries(formData);

  try {
    connecToDB();

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
    console.log("erro na criação do usuário", err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addTask = async (formData) => {
  const { title, cat, driverlicence, licenseplate, drivername, car, desc } =
    Object.fromEntries(formData);

  try {
    connecToDB();

    const newTask = new Task({
      title,
      cat,
      driverlicence,
      licenseplate,
      drivername,
      car,
      desc,
    });

    await newTask.save();
  } catch (err) {
    console.log("erro na criação da task", err);
    throw new Error("Failed to create task!");
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
    agent,
    company,
    contact,
    policyNumber,
    insurancecoverageType,
    monthlyDueDate,
    monthlyAmount,
    year,
    model,
    trim,
    chassis,
    miles,
    color,
    type,
    weight,
    plateType,
    plateNumber,
    marketValue,
    plateExpiration,
    insuranceValue,
    coverageType,
  } = Object.fromEntries(formData);

  const insuranceData = [
    {
      agent: agent,
      company: company,
      contact: contact,
      policyNumber: policyNumber,
      insurancecoverageType: insurancecoverageType,
      monthlyDueDate: monthlyDueDate,
      monthlyAmount: monthlyAmount,
    }
  ];

  const cars = [
    {
      year: year,
      model: model,
      trim: trim,
      chassis: chassis,
      miles: miles,
      color: color,
      type: type,
      weight: weight,
      plateType: plateType,
      plateNumber: plateNumber,
      marketValue: marketValue,
      plateExpiration: plateExpiration,
      insuranceValue: insuranceValue,
      coverageType: coverageType,
    }
  ];

  try {
    connecToDB();

    const newUser = new Client({
      name,
      email,
      clientImg,
      budget,
      address,
      paymentMethod,
      phone,
      note,
      insuranceData,
      cars
    });

    await newUser.save();
  } catch (err) {
    console.log("erro na criação do cliente", err);
    throw new Error("Failed to create client!");
  }

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
};


export const deleteUser = async (formData) => {
  console.log('teste formData', formData)
  const id = Object.fromEntries(formData);

  console.log('teste id', id.id)


  try {
    connecToDB();

    await User.findByIdAndDelete(id.id)
  } catch (err) {
    console.log("erro no delete do usuário", err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
};