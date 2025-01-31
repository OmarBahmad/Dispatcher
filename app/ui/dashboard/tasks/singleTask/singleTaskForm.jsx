"use client";
import { updateTask } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/tasks/singleTask/singleTask.module.css";
import { useEffect, useState } from "react";
import ClientSelectionModal from "../../modalsteps/clientSelectionModal";
import InsuranceSelectionModal from "../../modalsteps/insuranceSelectionModal";
import CarSelectionModal from "../../modalsteps/carSelectionModal";

const SingleTaskForm = ({ task }) => {
  // Ajuste o state inicial para bater com o TaskSchema.
  // Se no schema for `category: String`, então use `task.category`.
  // Se quiser armazenar year/model no mesmo Task, precisa ter esses campos no schema também.
  const [taskData, setTaskData] = useState({
    labor: task.labor || 0,
    overtime: task.overtime || 0,
    paidAmount: task.paidAmount || 0,
    totalAmount: task.totalAmount || 0, // renomeie se no schema for "totalAmount"
    dueAmount: task.dueAmount || 0,
    clientName: task.clientName || "",
    driverlicence: task.driverlicence || "", // se ainda existir no schema
    licenseplate: task.licenseplate || "",
    car: task.car || "",
    category: task.category || "general", // se no schema for "category"
    status: task.status || "general",
    desc: task.desc || "",
    // Se seu schema tiver year/model, inclua também (ou remova se não usar):
    year: task.year || "",
    model: task.model || "",
  });

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Atualizar os valores totais automaticamente
  useEffect(() => {
    const { labor, overtime, paidAmount } = taskData;
    const total = Number(labor) + Number(overtime);
    const dueAmount = total - Number(paidAmount);
    setTaskData((prevData) => ({
      ...prevData,
      totalAmount: total,
      dueAmount,
    }));
  }, [taskData.labor, taskData.overtime, taskData.paidAmount]);

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
      {/* Form que faz update */}
      <form action={updateTask} className={styles.form}>
        {/* Campo hidden com o ID da Task para o update */}
        <input type="hidden" name="id" value={task._id} />

        {/* CLIENT NAME */}
        <div className={styles.inputContainer}>
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            placeholder="Client Name"
            value={selectedClient?.name || taskData.clientName}
            onChange={handleInputChange}
          />
          {loading && <span className={styles.loader}></span>}
        </div>

        {/* CATEGORY */}
        <div className={`${styles.inputContainer} half-width`}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={taskData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="cancellation">Cancellation</option>
            <option value="renewal">Renewal</option>
            <option value="research-debts">Research Debts</option>
            <option value="second-copy-changes">Second Copy/Changes</option>
            <option value="budget">Budget</option>
            <option value="new-business">New Business</option>
            <option value="endorsement">Endorsement</option>
            <option value="new-plates">New Plates</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        {/* LICENSE PLATE */}
        <div className={styles.inputContainer}>
          <label htmlFor="licenseplate">License Plate</label>
          <input
            type="text"
            id="licenseplate"
            name="licenseplate"
            placeholder="License Plate"
            value={taskData.licenseplate}
            onChange={handleInputChange}
          />
        </div>

        {/* YEAR (se tiver no schema) */}
        <div className={styles.inputContainer}>
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Year"
            value={taskData.year}
            onChange={handleInputChange}
          />
        </div>

        {/* MODEL (se tiver no schema) */}
        <div className={styles.inputContainer}>
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            placeholder="Model"
            value={taskData.model}
            onChange={handleInputChange}
          />
        </div>

        {/* PROFIT (labor) */}
        <div className={styles.inputContainer}>
          <label htmlFor="labor">Profit</label>
          <input
            type="number"
            id="labor"
            name="labor"
            placeholder="Profit"
            value={taskData.labor}
            onChange={handleInputChange}
          />
        </div>

        {/* OVERTIME (RMV Costs) */}
        <div className={styles.inputContainer}>
          <label htmlFor="overtime">RMV Costs</label>
          <input
            type="number"
            id="overtime"
            name="overtime"
            placeholder="RMV Costs"
            value={taskData.overtime}
            onChange={handleInputChange}
          />
        </div>

        {/* TOTAL AMOUNT (calculado automaticamente) */}
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

        {/* PAID AMOUNT */}
        <div className={styles.inputContainer}>
          <label htmlFor="paidAmount">Paid Amount</label>
          <input
            type="number"
            id="paidAmount"
            name="paidAmount"
            placeholder="Paid Amount"
            value={taskData.paidAmount}
            onChange={handleInputChange}
          />
        </div>

        {/* DUE AMOUNT (calculado automaticamente) */}
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

        {/* STATUS */}
        <div className={styles.inputContainer}>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={taskData.status}
            onChange={handleInputChange}
          >
            <option value="general">General</option>
            <option value="total">Total Paid</option>
            <option value="partial">Partial Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {/* DESC */}
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

        <button type="submit">Update</button>
      </form>

      {/* Se ainda quiser usar o fluxo de modais para alterar cliente, seguro, carro, etc. */}
      {showModal && modalStep === 1 && (
        <ClientSelectionModal
          clients={clients}
          onSelectClient={(client) => setSelectedClient(client)}
          onClose={closeModal}
        />
      )}
      {showModal && modalStep === 2 && selectedClient && (
        <InsuranceSelectionModal
          insurances={selectedClient.insuranceData}
          onSelectInsurance={(insurance) => setSelectedInsurance(insurance)}
          onClose={closeModal}
        />
      )}
      {showModal && modalStep === 3 && selectedInsurance && selectedClient && (
        <CarSelectionModal
          cars={selectedClient.cars}
          onSelectCar={(car) => setSelectedCar(car)}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SingleTaskForm;
