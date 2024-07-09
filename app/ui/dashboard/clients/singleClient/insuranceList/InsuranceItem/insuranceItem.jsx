"use client";
import React, { useState } from "react";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const InsuranceItem = ({ insurance, index }) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div
      key={index}
      className={`${styles.formContent} ${styles.insuranceContainer}`}
    >
      <div className={styles.titleLabel} onClick={toggleContent}>
        <label> {insurance.company || `New Insurance ${index + 1}`}</label>
        <span className={`${styles.arrow}`}>
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
              defaultValue={insurance.agent}
              // onChange={(e) =>
              //   handleInsuranceChange(index, "agent", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Company</label>
            <input
              type="text"
              placeholder="Company"
              defaultValue={insurance.company}
              // onChange={(e) =>
              //   handleInsuranceChange(index, "company", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Contact</label>
            <input
              type="number"
              placeholder="Contact"
              defaultValue={insurance.contact}
              // onChange={(e) =>
              //   handleInsuranceChange(index, "contact", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Policy Number</label>
            <input
              type="text"
              placeholder="Policy Number"
              defaultValue={insurance.policyNumber}
              // onChange={(e) =>
              //   handleInsuranceChange(index, "policyNumber", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Coverage Type</label>
            <input
              type="text"
              placeholder="Coverage Type"
              defaultValue={insurance.insurancecoverageType}
              // onChange={(e) =>
              //   handleInsuranceChange(
              //     index,
              //     "insurancecoverageType",
              //     e.target.value
              //   )
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Monthly Due Date</label>
            <input
              type="date"
              placeholder="Monthly Due Date"
              defaultValue={insurance.monthlyDueDate}
              // onChange={(e) =>
              //   handleInsuranceChange(index, "monthlyDueDate", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Monthly Amount</label>
            <input
              type="number"
              placeholder="Monthly Amount"
              defaultValue={insurance.monthlyAmount}
              // onChange={(e) =>
              //   handleInsuranceChange(index, "monthlyAmount", e.target.value)
              // }
            />
          </div>
          <button
            type="button"
            className={styles.removeButton}
            // onClick={() => removeInsurance(index)}
          >
            Remove Insurance
          </button>
        </>
      )}
    </div>
  );
};

export default InsuranceItem;
