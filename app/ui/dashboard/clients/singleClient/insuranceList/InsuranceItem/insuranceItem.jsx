import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const InsuranceItem = ({ insurance, index, onChange, onRemove }) => {
  const [insuranceData, setInsuranceData] = useState(insurance);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    onChange(index, insuranceData);
  }, [insuranceData, index]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsuranceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`${styles.formContent} ${styles.insuranceContainer}`}>
      <div className={styles.titleLabel} onClick={() => setShowContent(!showContent)}>
        <label>{insuranceData.company || `New Insurance ${index + 1}`}</label>
        <span className={styles.arrow}>
          {showContent ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      {showContent && (
        <>
          <div className={styles.inputContainer}>
            <label>Agent</label>
            <input
              type="text"
              placeholder="Agent"
              name="agent"
              value={insuranceData.agent}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Company</label>
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={insuranceData.company}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Contact</label>
            <input
              type="number"
              placeholder="Contact"
              name="contact"
              value={insuranceData.contact}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Policy Number</label>
            <input
              type="text"
              placeholder="Policy Number"
              name="policyNumber"
              value={insuranceData.policyNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Coverage Type</label>
            <input
              type="text"
              placeholder="Coverage Type"
              name="insurancecoverageType"
              value={insuranceData.insurancecoverageType}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Monthly Due Date</label>
            <input
              type="date"
              placeholder="Monthly Due Date"
              name="monthlyDueDate"
              value={insuranceData.monthlyDueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Monthly Amount</label>
            <input
              type="number"
              placeholder="Monthly Amount"
              name="monthlyAmount"
              value={insuranceData.monthlyAmount}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => onRemove(index)}
          >
            Remove Insurance
          </button>
        </>
      )}
    </div>
  );
};

export default InsuranceItem;
