import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email:    { type: String, required: true },
    password: { type: String, required: true },
    img:      { type: String },
    isAdmin:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Corrigindo TaskSchema
const taskSchema = new mongoose.Schema(
  {
    // Se quiser armazenar o nome do cliente, você pode:
    clientName:      { type: String },
    desc:            { type: String },
    drivername:      { type: String },
    driverlicence:   { type: Number },  // Ex.: 123456789
    licenseplate:    { type: String },
    car:             { type: String },  // Se ainda for apenas uma string
    category:        { type: String },  // Substituindo "cat"
    labor:           { type: Number },  // Lucro
    overtime:        { type: Number },  // Custos RMV
    totalAmount:     { type: Number },  // Valor total
    paidAmount:      { type: Number },  // Valor pago
    dueAmount:       { type: Number },  // Valor devido (restante)
    status:          { type: String },  // "total", "partial", "unpaid", etc.
  },
  { timestamps: true }
);

const carSchema = new mongoose.Schema({
  year:          Number,
  model:         String,
  trim:          String,
  chassis:       String,
  miles:         Number,
  color:         String,
  type:          String,  // PASSAGEIRO/COMERCIAL
  weight:        Number,  // Peso para veículos comerciais
  plateType:     String,
  plateNumber:   String,
  marketValue:   Number,  // Valor Venal
  plateExpiration: Date,
  insuranceValue: Number, // VALOR DO SEGURO
  coverageType:   String, // TIPO DE COBERTURA
});

const insuranceSchema = new mongoose.Schema({
  agent:         String,
  company:       String,
  contact:       Number,
  policyNumber:  String,
  insurancecoverageType: String,  // Tipo de cobertura/Carro
  monthlyDueDate: Date,  // Data Vencimento mensalidade
  monthlyAmount:  Number, // Valor Mensalidade por carro
});

const clientSchema = new mongoose.Schema(
  {
    budget:        Number, 
    name:          String,
    email:         String,
    clientImg:     String,
    address:       String,
    paymentMethod: String,
    phone:         String,
    note:          String,
    files:         String,
    insuranceData: [insuranceSchema],
    cars:          [carSchema],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);