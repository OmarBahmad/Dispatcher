import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    drivername: String,
    car: {
      type: String,
    },
    licenseplate: {
      type: String,
    },
    cat: String,
    labor: String,
    overtime: String,
    totalAmount: String, 
    paidAmount: String,
    dueAmount: String,
    status: String,
    driverlicence: {
      type: Number,
    },
  },
  { timestamps: true }
);

const carSchema = new mongoose.Schema({
  year: Number,
  model: String,
  trim: String,
  chassis: String,
  miles: Number,
  color: String,
  type: String, // PASSAGEIRO/COMERCIAL
  weight: Number, // Peso para veículos comerciais
  plateType: String,
  plateNumber: String,
  marketValue: Number, // Valor Venal (será preenchido com a API)
  plateExpiration: Date,
  insuranceValue: Number, // VALOR DO SEGURO
  coverageType: String, // TIPO DE COBERTURA
});

const insuranceSchema = new mongoose.Schema({
  agent: String,
  company: String,
  contact: Number,
  policyNumber: String,
  insurancecoverageType: String, // Tipo de cobertura/Carro (ex: Carro 1 - Partial)
  monthlyDueDate: Date, // Data Vencimento mensalidade
  monthlyAmount: Number, // Valor Mensalidade por carro
});

const clientSchema = new mongoose.Schema(
  {
    budget: Number, // Orçamento
    name: String, // Nome,
    email: String, //Email
    clientImg:String, // Imagem do Cliente
    address: String, // Endereço
    paymentMethod: String, // Forma de Pagamento
    phone: String, // Telefone
    note: String, // Observação(Outros)
    insuranceData: [insuranceSchema], // Dados do Seguro
    cars: [carSchema], // Dados do carro(Cada carro)
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);