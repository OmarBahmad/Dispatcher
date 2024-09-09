import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";

export const InsuranceForm = ({ insuranceData, setInsuranceData }) => {
  const handleInsuranceChange = (index, field, value) => {
    const updatedInsuranceData = [...insuranceData];
    updatedInsuranceData[index][field] = value;
    setInsuranceData(updatedInsuranceData);
  };

  const addInsurance = () => {
    setInsuranceData([
      ...insuranceData,
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
  };

  const removeInsurance = (index) => {
    const updatedInsuranceData = insuranceData.filter((_, i) => i !== index);
    setInsuranceData(updatedInsuranceData);
  };

  return (
    <div className={styles.formContentContainer}>
      <div className={`${styles.formContainer} ${styles.formContent}`}>
        <h3 className={styles.label}>Insurance Information</h3>
        {insuranceData.map((insurance, index) => (
          <div
            key={index}
            className={`${styles.insuranceContainer} ${styles.formContent}`}
          >
            <div className={styles.titleContainer}>
              <div className={styles.title}>
                <label>Insurance {index + 1}</label>
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeInsurance(index)}
              >
                Remove Insurance
              </button>
            </div>

            <div className={styles.inputContainer}>
              <label>Agent</label>
              <input
                type="text"
                placeholder="Agent"
                value={insurance.agent}
                onChange={(e) =>
                  handleInsuranceChange(index, "agent", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Company</label>
              <input
                type="text"
                placeholder="Company"
                value={insurance.company}
                onChange={(e) =>
                  handleInsuranceChange(index, "company", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Contact</label>
              <input
                type="number"
                placeholder="Contact"
                value={insurance.contact}
                onChange={(e) =>
                  handleInsuranceChange(index, "contact", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Policy Number</label>
              <input
                type="text"
                placeholder="Policy Number"
                value={insurance.policyNumber}
                onChange={(e) =>
                  handleInsuranceChange(index, "policyNumber", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Coverage Type</label>
              <input
                type="text"
                placeholder="Coverage Type"
                value={insurance.insurancecoverageType}
                onChange={(e) =>
                  handleInsuranceChange(
                    index,
                    "insurancecoverageType",
                    e.target.value
                  )
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Monthly Due Date</label>
              <input
                type="date"
                placeholder="Monthly Due Date"
                value={insurance.monthlyDueDate}
                onChange={(e) =>
                  handleInsuranceChange(index, "monthlyDueDate", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Monthly Amount</label>
              <input
                type="number"
                placeholder="Monthly Amount"
                value={insurance.monthlyAmount}
                onChange={(e) =>
                  handleInsuranceChange(index, "monthlyAmount", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <button className={styles.addButton} type="button" onClick={addInsurance}>
        Add Insurance
      </button>
    </div>
  );
};
