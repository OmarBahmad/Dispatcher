import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import InsuranceItem from './InsuranceItem/insuranceItem';

const InsuranceList = ({ insurance, onChange }) => {
  const [insuranceList, setInsuranceList] = useState(insurance);

  useEffect(() => {
    onChange(insuranceList);
  }, [insuranceList, onChange]);

  const addInsurance = () => {
    const newInsurance = {
      agent: "",
      company: "",
      contact: "",
      policyNumber: "",
      insurancecoverageType: "",
      monthlyDueDate: "",
      monthlyAmount: "",
    };

    setInsuranceList([...insuranceList, newInsurance]);
  };

  const updateInsurance = (index, updatedInsurance) => {
    const updatedList = insuranceList.map((item, idx) =>
      idx === index ? updatedInsurance : item
    );
    setInsuranceList(updatedList);
  };

  const removeInsurance = (index) => {
    const updatedList = insuranceList.filter((_, idx) => idx !== index);
    setInsuranceList(updatedList);
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h3 className={styles.label}>Insurances</h3>
        <button type="button" className={styles.addButton} onClick={addInsurance}>
          Add Insurance
        </button>
      </div>
      {insuranceList.map((insurance, index) => (
        <InsuranceItem 
          key={index} 
          insurance={insurance} 
          index={index} 
          onChange={updateInsurance} 
          onRemove={removeInsurance} 
        />
      ))}
    </>
  );
};

export default InsuranceList;
