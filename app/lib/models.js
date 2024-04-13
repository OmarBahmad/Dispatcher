import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
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
export const Client =
  mongoose.models.Client || mongoose.model("Client", clientSchema);

// // Exemplo de como adicionar um novo cliente
// const newClient = new Client({
//   budget: 5000,
//   name: 'João Silva',
//   address: 'Rua das Flores, 123',
//   paymentMethod: 'Cartão de Crédito',
//   phone: '11999999999',
//   note: 'Cliente prefere contato por email.',
//   insuranceData: [{
//     agent: 'Agente Seguros',
//     company: 'Seguradora XYZ',
//     policyNumber: 'ABC123456',
//     coverageType: 'Total',
//     monthlyDueDate: new Date(2024, 4, 1), // Lembre-se que os meses começam do 0
//     monthlyAmount: 200
//   }],
//   cars: [{
//     year: 2020,
//     model: 'Carro Modelo X',
//     trim: 'Sport',
//     chassis: '9BWZZZ377VT004251',
//     miles: 5000,
//     color: 'Azul',
//     type: 'PASSAGEIRO',
//     weight: null, // Peso não aplicável para veículos de passageiros
//     plateType: 'Particular',
//     plateNumber: 'XYZ1234',
//     marketValue: 35000, // Valor a ser obtido via API
//     plateExpiration: new Date(2024, 9, 30),
//     insuranceValue: 1500,
//     coverageType: 'Parcial'
//   }]
// });

// // Salvar o cliente no banco de dados
// newClient.save().then(() => console.log('Cliente adicionado com sucesso!'));
