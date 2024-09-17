"use client";
import { updateTask } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/tasks/singleTask/singleTask.module.css";
import { useEffect, useState } from "react";
import ClientSelectionModal from "../../modalsteps/clientSelectionModal";
import InsuranceSelectionModal from "../../modalsteps/insuranceSelectionModal";
import CarSelectionModal from "../../modalsteps/carSelectionModal";


const SingleTaskForm = ({ task }) => {
  const [taskData, setTaskData] = useState({
    labor: task.labor || 0,
    overtime: task.overtime || 0,
    paidAmount: task.paidAmount || 0,
    total: task.total || 0,
    dueAmount: task.dueAmount || 0,
    clientName: task.clientName || "",
    drivername: task.drivername || "",
    driverlicence: task.driverlicence || "",
    licenseplate: task.licenseplate || "",
    car: task.car || "",
    category: task.cat || "general",
    status: task.status || "general",
    desc: task.desc || "",
  });

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(task.client || null);
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
      total,
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
      <form action={updateTask} className={styles.form}>
        <input type="hidden" name="id" value={task.id} />

        <div className={styles.inputContainer}>
          <label htmlFor="clientname">Client Name</label>
          <input
            type="text"
            id="clientname"
            name="clientName"
            placeholder="Client Name"
            value={selectedClient?.name || taskData.clientName}
            onChange={handleInputChange}
            required
          />
          {loading && <span className={styles.loader}></span>}
        </div>

        <div className={styles.inputContainer + " half-width"}>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" value={taskData.category} onChange={handleInputChange}>
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

        <div className={styles.inputContainer}>
          <label htmlFor="totalAmount">Total Amount</label>
          <input
            type="text"
            id="totalAmount"
            name="total"
            disabled
            value={`US$ ${Number(taskData.total).toFixed(2)}`}
          />
        </div>

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

        <div className={styles.inputContainer}>
          <label htmlFor="dueAmount">Due Amount</label>
          <input
            type="text"
            id="dueAmount"
            name="dueAmount"
            disabled
            value={`US$ ${Number(taskData.dueAmount).toFixed(2)}`}
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

        <button type="submit">Update</button>
      </form>

      {/* Modal de seleção de cliente, seguro e carro */}
      {showModal && modalStep === 1 && (
        <ClientSelectionModal clients={clients} onSelectClient={(client) => setSelectedClient(client)} onClose={closeModal} />
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

export default SingleTaskForm;
