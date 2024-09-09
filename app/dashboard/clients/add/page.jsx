"use client";
import { useState } from "react";
import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";
import { addClient } from "@/app/lib/actions";
import ClientForm from "@/app/ui/dashboard/clients/Forms/ClientForm/clientForm";
import InsuranceForm from "@/app/ui/dashboard/clients/Forms/InsuranceForm/InsuranceForm";
import CarForm from "@/app/ui/dashboard/clients/Forms/CarForm/carForm";

const AddClientPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    address: "",
    clientImg: "",
    phone: "",
    idType: "",
    idValue: "",
    note: "",
  });
  const [insuranceData, setInsuranceData] = useState([
    {
      agent: "",
      company: "",
      contact: "",
      policyNumber: "",
      insurancecoverageType: "",
      monthlyDueDate: "",
      monthlyAmount: "",
    },
  ]);
  const [cars, setCars] = useState([
    {
      year: "",
      model: "",
      trim: "",
      chassis: "",
      miles: "",
      color: "",
      type: "",
      weight: "",
      plateType: "",
      plateNumber: "",
      marketValue: "",
      plateExpiration: "",
      insuranceValue: "",
      coverageType: "",
    },
  ]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();

    Object.keys(clientData).forEach((key) => {
      formData.append(key, clientData[key]);
    });
  
    formData.append("insuranceData", JSON.stringify(insuranceData));
    formData.append("cars", JSON.stringify(cars));
    await addClient(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ClientForm clientData={clientData} setClientData={setClientData} />;
      case 2:
        return <InsuranceForm insuranceData={insuranceData} setInsuranceData={setInsuranceData} />;
      case 3:
        return <CarForm cars={cars} setCars={setCars} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        {renderStep()}

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
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddClientPage;
