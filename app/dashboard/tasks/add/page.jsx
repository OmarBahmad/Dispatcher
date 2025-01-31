"use client";
import { addTask } from "@/app/lib/actions";
import CarSelectionModal from "@/app/ui/dashboard/modalsteps/carSelectionModal";
import ClientSelectionModal from "@/app/ui/dashboard/modalsteps/clientSelectionModal";
import InsuranceSelectionModal from "@/app/ui/dashboard/modalsteps/insuranceSelectionModal";
import NoClientFoundModal from "@/app/ui/dashboard/modalsteps/noClientSelectionModal";
import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";
import { useState, useEffect } from "react";

const AddTaskPage = () => {
  const [taskData, setTaskData] = useState({
    labor: 0,
    overtime: 0,
    paidAmount: 0,
    total: 0,
    dueAmount: 0,
    clientName: "",
    driverlicence: "",
    licenseplate: "",
    car: "",
    category: "general",
    status: "general",
    desc: "",
  });

  const [clients, setClients] = useState([]); // Lista de clientes retornados
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false); // Estado do loader
  const [showModal, setShowModal] = useState(false); // Estado do modal
  const [modalStep, setModalStep] = useState(1); // Passo atual do modal (1: cliente, 2: seguro, 3: carro)
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Atualizar os valores totais automaticamente
  useEffect(() => {
    const { labor, overtime, paidAmount } = taskData;
    const total = Number(labor) + Number(overtime);
    const due = total - Number(paidAmount);
  
    setTaskData((prevData) => ({
      ...prevData,
      totalAmount: total,  // rename "total" -> "totalAmount"
      dueAmount: due
    }));
  }, [taskData.labor, taskData.overtime, taskData.paidAmount]);

  // Buscar cliente quando o nome muda
  useEffect(() => {
    if (taskData.clientName) {
      setLoading(true);
      setShowModal(true);
  
      if (typingTimeout) clearTimeout(typingTimeout);
  
      const timeout = setTimeout(async () => {
        try {
          const response = await fetch(`/api/clients?name=${taskData.clientName}`);
          if (response.ok) {
            const data = await response.json();
            setClients(data);
            setModalStep(1);
            // Mantém o modal aberto mesmo com lista vazia
            if (data.length === 0) setShowModal(true); 
          } else {
            setClients([]);
          }
        } catch (error) {
          console.error("Erro ao buscar cliente:", error);
          setClients([]);
        } finally {
          setLoading(false);
        }
      }, 1000);
  
      setTypingTimeout(timeout);
    }
  }, [taskData.clientName]);

  // Manipular seleção de cliente, seguro e carro
  useEffect(() => {
    if (selectedClient) setModalStep(2);
    console.log("selectedClient", selectedClient);
  }, [selectedClient]);

  useEffect(() => {
    if (selectedInsurance) setModalStep(3);
    console.log("selectedInsurance", selectedInsurance);
  }, [selectedInsurance]);

  useEffect(() => {
    if (selectedCar) setShowModal(false);
    console.log("selectedCar", selectedCar);
  }, [selectedCar]);

  // Função para manipular alterações de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fechar modal
  const closeModal = () => {
    setShowModal(false);
    setClients([]);
  };

  return (
    <div className={styles.container}>
      <form action={addTask} className={styles.form}>
        {/* Campo de busca de cliente */}
        <div className={styles.inputContainer}>
          <label htmlFor="clientname">Client Name</label>
          <input
            type="text"
            id="clientname"
            name="clientName"
            placeholder="Client Name"
            value={selectedClient?.name || taskData.clientName ||  ""}
            onChange={handleInputChange}
            required
          />
          {loading && <span className={styles.loader}></span>}
        </div>

        {/* Outros campos do formulário */}
        <div className={styles.inputContainer + ' half-width'}>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="" defaultValue>Select Category</option>
            <option value="cancellation">Cancellation</option> {/* VERMELHO */}
            <option value="renewal">Renewal</option> {/* AZUL */}
            <option value="research-debts">Research Debts</option> {/* VERDE */}
            <option value="second-copy-changes">Second Copy/Changes</option> {/* AMARELO */}
            <option value="budget">Budget</option> {/* ROSA */}
            <option value="new-business">New Business</option> {/* CIANO */}
            <option value="endorsement">Endorsement</option> {/* VERDE CLARO */}
            <option value="new-plates">New Plates</option> {/* DOURADO */}
            <option value="transfer">Transfer</option> {/* ROXO */}
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="plateNumber">License Plate</label>
          <input
            type="text"
            id="plateNumber"
            name="plateNumber"
            placeholder="License Plate"
            value={selectedCar?.plateNumber || taskData.plateNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Year</label>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Year"
            value={selectedCar?.year || taskData.year}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Model</label>
          <input
            type="text"
            id="model"
            name="model"
            placeholder="Model"
            value={selectedCar?.model || taskData.model}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Chassis (VIN Number)</label>
          <input
            type="text"
            id="chassis"
            name="chassis"
            placeholder="Chassis (VIN Number)"
            value={selectedCar?.chassis || taskData.chassis}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Color</label>
          <input
            type="text"
            name="color"
            id="color"
            placeholder="Color"
            value={selectedCar?.color || taskData.color}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="labor">Profit</label>
          <input
            type="text" 
            pattern="[0-9]*"
            id="labor"
            name="labor"
            placeholder="Profit"
            value={taskData.labor}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="overtime">RMV Costs</label>
          <input
            type="text" 
            pattern="[0-9]*"
            id="overtime"
            name="overtime"
            placeholder="RMV Costs"
            value={taskData.overtime}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="totalAmount">Total Amount</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            disabled
            value={Number(taskData.totalAmount).toFixed(2)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="paidAmount">Paid Amount</label>
          <input
            type="text" 
            pattern="[0-9]*"
            id="paidAmount"
            name="paidAmount"
            placeholder="Paid Amount"
            value={taskData.paidAmount}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="dueAmount">Due Amount</label>
          <input
            type="number"
            id="dueAmount"
            name="dueAmount"
            disabled
            value={Number(taskData.dueAmount).toFixed(2)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="status">Status</label>
          <select name="status" id="status" value={taskData.status} onChange={handleInputChange}>
            <option value="general">General</option>
            <option value="total">Total Paid</option>
            <option value="partial">Partial Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="4"
            placeholder="Task Description"
            value={taskData.desc}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Modal de seleção de cliente, seguro e carro */}
      {showModal && modalStep === 1 && (
        !loading && clients.length > 0 ? (
          <ClientSelectionModal
            clients={clients}
            onSelectClient={(client) => setSelectedClient(client)}
            onClose={closeModal}
          />
        ) : (
          !loading && <NoClientFoundModal onClose={closeModal} />
        )
      )}
      {showModal && modalStep === 2 && selectedClient && (
        <InsuranceSelectionModal insurances={selectedClient.insuranceData} onSelectInsurance={(insurance) => setSelectedInsurance(insurance)} onClose={closeModal} />
      )}
      {showModal && modalStep === 3 && selectedInsurance && selectedClient && (
        <CarSelectionModal cars={selectedClient.cars} onSelectCar={(car) => setSelectedCar(car)} onClose={closeModal} />
      )}
    </div>
  );
};

export default AddTaskPage;
