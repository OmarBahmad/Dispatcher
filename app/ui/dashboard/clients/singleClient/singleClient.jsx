"use client"
import React, { useState } from "react";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";

import { ClientForm } from "../Forms/ClientForm/ClientForm";
import { InsuranceForm } from "../Forms/InsuranceForm/InsuranceForm";
import { CarForm } from "../Forms/CarForm/CarForm";

import { updateClient } from "@/app/lib/actions";
import { formattedDate } from "../../helpers/helpers";

const SingleClient = ({ client, id }) => {
  const [isEditing, setIsEditing] = useState(false); // Controle do modo de edição
  const [currentStep, setCurrentStep] = useState(1); // Controle dos steps
  const [clientData, setClientData] = useState({ ...client }); // Dados do cliente
  const [insuranceData, setInsuranceData] = useState([...client.insuranceData]); // Copiar os dados de insurance
  const [cars, setCars] = useState([...client.cars]); // Copiar os dados de cars

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleStepClick = (step) => setCurrentStep(step);
  const handleEditClick = () => setIsEditing(true); // Ativar modo de edição
  const handleCancelClick = () => setIsEditing(false); // Cancelar edição

  const handleSubmit = async (e) => {
    e.preventDefault();
    clientData.id = id;
    clientData.cars = JSON.stringify(cars);
    clientData.insuranceData = JSON.stringify(insuranceData);
    const formData = new FormData();
   // Popula o FormData com os dados do cliente
    Object.keys(clientData).forEach((key) => {
      formData.append(key, clientData[key]);
    });
    await updateClient(formData);
    setIsEditing(false);
  };
  
  if (!isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Client: {client.name}</h1>
          <button onClick={handleEditClick} className={styles.editButton}>Edit</button>
        </div>
        <div className={styles.viewContent}>
          {/* Visualização de Dados do Cliente */}
          <div className={`${styles.infoContainer}`}>
            <div className={styles.clientInfo}>
              <div><strong>Email:</strong> {client.email}</div>
              <div><strong>Address:</strong> {client.address}</div>
              <div><strong>Phone:</strong> {client.phone}</div>
              <div><strong>ID Type:</strong> {client.idType}</div>
              <div><strong>ID Number:</strong> {client.idValue}</div>
              <div><strong>Note:</strong> {client.note}</div>
            </div>
          </div>
          {/* Visualização de Seguros */}
          <div className={`${styles.infoContainer}`}>
            <h3>Insurance Information</h3>
            {insuranceData.map((insurance, index) => (
              <div key={insurance._id} className={styles.insuranceInfo}>
                <div className={styles.insuranceTitle} ><strong>Insurance {index + 1}</strong></div>
                <div><strong>Agent:</strong> {insurance.agent}</div>
                <div><strong>Company:</strong> {insurance.company}</div>
                <div><strong>Policy Number:</strong> {insurance.policyNumber}</div>
                <div><strong>Insurance Type:</strong> {insurance.insurancecoverageType}</div>
                <div><strong>Monthly Due Date:</strong> {formattedDate(insurance.monthlyDueDate, "partial") || insurance.monthlyDueDate}</div>
                <div><strong>Monthly Amount:</strong> {insurance.monthlyAmount}</div>
              </div>
            ))}
          </div>
          {/* Visualização de Carros */}
          <div className={`${styles.infoContainer}`}>
            <h3>Car Information</h3>
            {cars.map((car, index) => (
              <div key={car._id} className={styles.carInfo} >
                <div className={styles.carTitle} ><strong>Car {index + 1}</strong></div>
                <div><strong>Model:</strong> {car.model}</div>
                <div><strong>Year:</strong> {car.year}</div>
                <div><strong>Trim:</strong> {car.trim}</div>
                <div><strong>Chassis:</strong> {car.chassis}</div>
                <div><strong>Miles:</strong> {car.miles}</div>
                <div><strong>Color:</strong> {car.color}</div>
                <div><strong>Type of Use:</strong> {car.type}</div>
                <div><strong>Weight:</strong> {car.weight}</div>
                <div><strong>Plate Type:</strong> {car.plateType}</div>
                <div><strong>Plate Number:</strong> {car.plateNumber}</div>
                <div><strong>Market Value:</strong> {car.marketValue}</div>
                <div><strong>Plate Expiration:</strong> {formattedDate(car.plateExpiration, "full") || car.plateExpiration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <h1>Edit Client</h1>
          <button type="button" onClick={handleCancelClick} className={styles.cancelButton}>Cancel</button>
        </div>
        
        {/* Barra de Progresso */}
        <div className={styles.progressBar}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`${styles.progressStep} ${currentStep >= step ? styles.active : ""}`}
              onClick={() => handleStepClick(step)}
            >
              Step {step}: <span>{step === 1 ? "Client" : step === 2 ? "Insurance" : "Cars"}</span>
            </div>
          ))}
        </div>

        {/* Renderizar o conteúdo com base no passo */}
        {currentStep === 1 && <ClientForm clientData={clientData} setClientData={setClientData} />}
        {currentStep === 2 && <InsuranceForm insuranceData={insuranceData} setInsuranceData={setInsuranceData} />}
        {currentStep === 3 && <CarForm cars={cars} setCars={setCars} />}

        {/* Botões de navegação */}
        <div className={styles.buttonContainer}>
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className={styles.prevButton}>
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button type="button" onClick={nextStep} className={styles.nextButton}>
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button type="submit" className={styles.submitButton}>
              Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SingleClient;
