'use client'
import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import InsuranceItem from './InsuranceItem/insuranceItem';

const InsuranceList = ({ insurance }) => {
  const [insuranceList, setInsuranceList] = useState(insurance);

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

  return (
    <>
      <div className={styles.titleContainer}>
          <h3 className={styles.label}>Insurances</h3>
          <button type="button" className={styles.addButton} onClick={() => addInsurance()}>
            Add Insurance
          </button>
        </div>
      {insuranceList.map((insurance, index) => (
        <InsuranceItem key={index} insurance={insurance} index={index} />
      ))}
    </>
  );
};

export default InsuranceList;