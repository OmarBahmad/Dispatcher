"use client";
import { addTask } from "@/app/lib/actions";
import CarSelectionModal from "@/app/ui/dashboard/modalsteps/carSelectionModal";
import ClientSelectionModal from "@/app/ui/dashboard/modalsteps/clientSelectionModal";
import InsuranceSelectionModal from "@/app/ui/dashboard/modalsteps/insuranceSelectionModal";
import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";
import { useState, useEffect } from "react";

const AddTaskPage = () => {
  const [labor, setLabor] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clients, setClients] = useState([]); // Lista de clientes retornados
  const [selectedClient, setSelectedClient] = useState(null); // Cliente selecionado
  const [selectedInsurance, setSelectedInsurance] = useState(null); // Seguro selecionado
  const [selectedCar, setSelectedCar] = useState(null); // Carro selecionado
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false); // Estado do loader
  const [showModal, setShowModal] = useState(false); // Estado do modal
  const [modalStep, setModalStep] = useState(1); // Passo atual do modal (1: cliente, 2: seguro, 3: carro)
  const [shouldFetch, setShouldFetch] = useState(false); // Estado para controlar a busca

  useEffect(() => {
    setTotal(Number(labor) + Number(overtime));
    setDueAmount(Number(total) - Number(paidAmount));
  }, [labor, overtime, total, paidAmount]);

  useEffect(() => {
    if (shouldFetch && clientName) {
      setLoading(true); // Exibe o loader
      setShowModal(true); // Exibe o overlay com o loader
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      const timeout = setTimeout(async () => {
        try {
          const response = await fetch(`/api/clients?name=${clientName}`);

          if (response.ok) {
            const data = await response.json();
            setClients(data); // Armazena os dados dos clientes encontrados
            setModalStep(1); // Vai para a primeira etapa do modal
          } else {
            setClients([]);
            setShowModal(false);
          }
        } catch (error) {
          console.error("Erro ao buscar cliente:", error);
          setClients([]);
          setShowModal(false);
        } finally {
          setLoading(false); // Oculta o loader após a busca
        }
      }, 2000);

      setTypingTimeout(timeout);
    } 
  }, [shouldFetch, clientName]); // Agora depende de shouldFetch e clientName

  useEffect(() => {
    if (selectedClient) {
      setModalStep(2); // Passa para a escolha do seguro
      setClientName(selectedClient.name); // Atualiza o nome do cliente sem disparar nova busca
      setShouldFetch(false); // Evita nova busca ao selecionar cliente
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedInsurance) {
      setModalStep(3); // Passa para a escolha do carro
    }
  }, [selectedInsurance]);

  useEffect(() => {
    if (selectedCar) {
      setShowModal(false); // Fecha o modal após a escolha do carro
    }
      // setDriverName(selectedClient.drivername);
      // setCar(selectedClient.car);
      // setDriverLicence(selectedClient.driverlicence);
  }, [selectedCar]);

  const closeModal = () => {
    setShowModal(false);
    setClients([]);
    setLoading(false);
  };

  const handleClientNameChange = (e) => {
    setClientName(e.target.value);
    setShouldFetch(true); // Habilita a busca apenas quando o usuário digita
  };

  return (
    <div className={styles.container}>
      <form action={addTask} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="Client Name">Client Name</label>
          <input
            type="text"
            id="clientname"
            placeholder="Client Name"
            name="clientname"
            value={clientName}
            onChange={handleClientNameChange}
            required
          />
          {loading && <span className={styles.loader}></span>}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="cat">Category</label>
          <select name="cat" id="cat">
            <option value="general" defaultValue>Choose a Category</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
            <option value="standby">StandBy</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="driverlicence">Driver Licence</label>
          <input type="number" id="driverlicence" placeholder="Driver Licence" name="driverlicence" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="licenseplate">License Plate</label>
          <input type="text" id="licenseplate" placeholder="License Plate" name="licenseplate" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="drivername">Driver Name</label>
          <input
            type="text"
            id="drivername"
            placeholder="Driver Name"
            name="drivername"
            value={selectedClient?.drivername || ""}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="car">Car</label>
          <input type="text" id="car" placeholder="Car" name="car" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="labor">Labor</label>
          <input type="number" id="labor" placeholder="Labor" name="labor" onChange={(e) => setLabor(e.target.value)} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="overtime">Overtime</label>
          <input type="number" id="overtime" placeholder="Overtime" name="overtime" onChange={(e) => setOvertime(e.target.value)} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="totalAmount">Total Amount</label>
          <input type="text" id="totalAmount" placeholder="Total Amount" name="totalAmount" disabled value={`US$ ${Number(total)}`} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="paidAmount">Paid Amount</label>
          <input type="text" id="paidAmount" placeholder="Paid Amount" name="paidAmount" onChange={(e) => setPaidAmount(e.target.value)} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="dueAmount">Due Amount</label>
          <input type="text" id="dueAmount" placeholder="Due Amount" name="dueAmount" disabled value={`US$ ${dueAmount}`} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="general" defaultValue>Status</option>
            <option value="total">Total Paid</option>
            <option value="partial">Partial Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="desc">Description</label>
          <textarea name="desc" id="desc" rows="16" placeholder="Description"></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
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

export default AddTaskPage;
