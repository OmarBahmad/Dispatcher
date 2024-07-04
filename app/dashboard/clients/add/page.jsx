"use client";
import { addClient } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";
import { useState } from "react";

const AddClientPage = () => {
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

  const addCar = () => {
    setCars([
      ...cars,
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
  };

  const removeCar = (index) => {
    const updatedCars = cars.filter((_, i) => i !== index);
    setCars(updatedCars);
  };

  const handleInsuranceChange = (index, field, value) => {
    const updatedInsuranceData = [...insuranceData];
    updatedInsuranceData[index][field] = value;
    setInsuranceData(updatedInsuranceData);
  };

  const handleCarChange = (index, field, value) => {
    const updatedCars = [...cars];
    updatedCars[index][field] = value;
    setCars(updatedCars);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("insuranceData", JSON.stringify(insuranceData));
    formData.append("cars", JSON.stringify(cars));
    await addClient(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.label}>Client</h3>
        {/* Client Data */}
        <div className={styles.formContent}>
          <div className={styles.inputContainer}>
            <label>Name</label>
            <input type="text" placeholder="Client Name" name="name" />
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input type="email" placeholder="Client Email" name="email" />
          </div>
          <div className={styles.inputContainer}>
            <label>Client Image (URL)</label>
            <input
              type="text"
              placeholder="Client Image (URL)"
              name="clientImg"
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Budget</label>
            <input type="number" placeholder="Budget" name="budget" />
          </div>
          <div className={styles.inputContainer}>
            <label>Address</label>
            <input type="text" placeholder="Address" name="address" />
          </div>
          <div className={styles.inputContainer}>
            <label>Payment Method</label>
            <input
              type="text"
              placeholder="Payment Method"
              name="paymentMethod"
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Phone</label>
            <input type="text" placeholder="Phone" name="phone" />
          </div>
          <div className={styles.inputContainer}>
            <label>Note</label>
            <textarea placeholder="Note (Others)" name="note" />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.label}>Insurance</h3>
          <button
            className={styles.addButton}
            type="button"
            onClick={addInsurance}
          >
            Add Insurance
          </button>
        </div>
        {insuranceData.map((insurance, index) => (
          <div key={index} className={`${styles.insuranceContainer} ${styles.formContent}`}>
            <div className={styles.titleLabel}>
              <label>Insurance {index + 1}</label>
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
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeInsurance(index)}
            >
              Remove Insurance
            </button>
          </div>
        ))}
        <div className={styles.titleContainer}>
          <h3 className={styles.label}>Cars</h3>
          <button type="button" className={styles.addButton} onClick={addCar}>
            Add Car
          </button>
        </div>
        {cars.map((car, index) => (
          <div key={index} className={`${styles.carContainer} ${styles.formContent}`}>
            <div className={styles.titleLabel}>
              <label>Car {index + 1}</label>
            </div>
            <div className={styles.inputContainer}>
              <label>Year</label>
              <input
                type="number"
                placeholder="Year"
                value={car.year}
                onChange={(e) => handleCarChange(index, "year", e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Model</label>
              <input
                type="text"
                placeholder="Model"
                value={car.model}
                onChange={(e) =>
                  handleCarChange(index, "model", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Trim</label>
              <input
                type="text"
                placeholder="Trim"
                value={car.trim}
                onChange={(e) => handleCarChange(index, "trim", e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Chassis (VIN Number)</label>
              <input
                type="text"
                placeholder="Chassis (VIN Number)"
                value={car.chassis}
                onChange={(e) =>
                  handleCarChange(index, "chassis", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Miles</label>
              <input
                type="number"
                placeholder="Miles"
                value={car.miles}
                onChange={(e) =>
                  handleCarChange(index, "miles", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Color</label>
              <input
                type="text"
                placeholder="Color"
                value={car.color}
                onChange={(e) =>
                  handleCarChange(index, "color", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Type of Use</label>
              <select
                value={car.type}
                onChange={(e) => handleCarChange(index, "type", e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="commercial">Commercial</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label>Weight (lbs)</label>
              <input
                type="number"
                placeholder="Weight (lbs)"
                value={car.weight}
                onChange={(e) =>
                  handleCarChange(index, "weight", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Type</label>
              <select
                value={car.plateType}
                onChange={(e) =>
                  handleCarChange(index, "plateType", e.target.value)
                }
              >
                <option value="">Select Plate Type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Number</label>
              <input
                type="text"
                placeholder="Plate Number"
                value={car.plateNumber}
                onChange={(e) =>
                  handleCarChange(index, "plateNumber", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Market Value</label>
              <input
                type="number"
                placeholder="Market Value"
                value={car.marketValue}
                onChange={(e) =>
                  handleCarChange(index, "marketValue", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Expiration Date</label>
              <input
                type="date"
                placeholder="Plate Expiration Date"
                value={car.plateExpiration}
                onChange={(e) =>
                  handleCarChange(index, "plateExpiration", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Insurance Value</label>
              <input
                type="number"
                placeholder="Insurance Value"
                value={car.insuranceValue}
                onChange={(e) =>
                  handleCarChange(index, "insuranceValue", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Coverage Type</label>
              <input
                type="text"
                placeholder="Coverage Type"
                value={car.coverageType}
                onChange={(e) =>
                  handleCarChange(index, "coverageType", e.target.value)
                }
              />
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeCar(index)}
            >
              Remove Car
            </button>
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddClientPage;
