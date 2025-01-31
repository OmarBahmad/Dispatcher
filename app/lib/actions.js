"use server";


import { MongoClient, GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

import { revalidatePath } from "next/cache";
import { Client, Task, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

const mongoURI = process.env.MONGO;
let client, bucket;

// Conectar ao banco de dados e inicializar o bucket
async function initializeBucket() {
  if (!client) {
    client = await MongoClient.connect(mongoURI);
    const db = client.db('dashboard'); // Substitua com o nome do seu banco de dados
    bucket = new GridFSBucket(db, { bucketName: 'pdfFiles' });
  }
}

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
    clientName,
    driverlicence,
    licenseplate,
    drivername,
    car,
    category,
    desc,
    labor,
    overtime,
    totalAmount,
    paidAmount,
    dueAmount,
    status,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const newTask = new Task({
      clientName,
      driverlicence:  driverlicence  ? Number(driverlicence)  : undefined,
      licenseplate,
      drivername,
      car,
      category,
      desc,
      labor:          labor          ? Number(labor)          : 0,
      overtime:       overtime       ? Number(overtime)       : 0,
      totalAmount:    totalAmount    ? Number(totalAmount)    : 0,
      paidAmount:     paidAmount     ? Number(paidAmount)     : 0,
      dueAmount:      dueAmount      ? Number(dueAmount)      : 0,
      status,
    });

    await newTask.save();
  } catch (err) {
    console.log("erro na criação da task", err);
    throw new Error("Failed to create task!");
  }

  revalidatePath("/dashboard/tasks");
  redirect("/dashboard/tasks");
};

export const updateTask = async (formData) => {
  const {
    id,
    clientName,
    licenseplate,
    labor,
    overtime,
    totalAmount,
    paidAmount,
    dueAmount,
    category,
    status,
    desc,
    year,
    model,
    car,
    driverlicence, // se ainda quiser manter
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      clientName,
      licenseplate,
      labor:       labor ? Number(labor) : 0,
      overtime:    overtime ? Number(overtime) : 0,
      totalAmount: totalAmount ? Number(totalAmount) : 0,
      paidAmount:  paidAmount ? Number(paidAmount) : 0,
      dueAmount:   dueAmount ? Number(dueAmount) : 0,
      category,
      status,
      desc,
      year:        year ? Number(year) : undefined, // se for number
      model,
      car,
      driverlicence: driverlicence ? Number(driverlicence) : undefined,
    };

    // Remove campos vazios/undefined
    Object.keys(updateFields).forEach((key) => {
      if (
        updateFields[key] === "" ||
        updateFields[key] === undefined ||
        (typeof updateFields[key] === "number" && isNaN(updateFields[key]))
      ) {
        delete updateFields[key];
      }
    });

    await Task.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log("Error updating task:", err);
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
    address,
    phone,
    idType,
    idValue,
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
      address,
      phone,
      idType,
      idValue,
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
    address,
    phone,
    idType,
    idValue,
    note,
    insuranceData,
    cars,
  } = Object.fromEntries(formData);

  try {
    await initializeBucket(); // Inicializa o bucket para o upload

    const updateFields = {
      name,
      email,
      clientImg,
      address,
      phone,
      idType,
      idValue,
      note,
      insuranceData: JSON.parse(insuranceData),
      cars: JSON.parse(cars),
    };

    // Verifica se há um arquivo PDF para upload
    if (formData.has('files')) {
      const file = formData.get('files'); // Arquivo PDF enviado

      const uploadStream = bucket.openUploadStream(file.name, {
        chunkSizeBytes: 1048576, // 1 MB chunks
        metadata: { clientId: id }, // Metadados opcionais
      });

      const buffer = await file.arrayBuffer(); // Converte o arquivo em buffer
      const readableStream = new Readable(); // Cria um stream de leitura
      readableStream.push(Buffer.from(buffer)); // Adiciona o buffer no stream
      readableStream.push(null); // Indica o fim do stream

      readableStream.pipe(uploadStream);

      uploadStream.on('finish', async () => {
        updateFields.fileId = uploadStream.id; // Salva o ID do arquivo PDF no cliente

        // Atualiza o cliente no MongoDB com o ID do arquivo PDF
        await Client.findByIdAndUpdate(id, updateFields, { new: true });
      });

    } else {
      // Se não há arquivo, atualiza apenas os outros campos
      await Client.findByIdAndUpdate(id, updateFields, { new: true });
    }

    // Retorna uma resposta de sucesso em vez de redirecionar
    return { success: true };
  } catch (err) {
    console.error("Failed to update client!", err);
    return { success: false, error: err.message };
  }
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
