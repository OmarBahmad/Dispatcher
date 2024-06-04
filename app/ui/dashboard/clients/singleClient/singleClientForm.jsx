"use client";

import { updateClient } from "@/app/lib/actions";
import { useState } from "react";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import FormInput from "../formInput";

const SingleClientForm = ({ client }) => {
  const [insuranceData, setInsuranceData] = useState(client.insuranceData || []);
  const [cars, setCars] = useState(client.cars || []);
  const [formData, setFormData] = useState(client);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    formDataObj.append("insuranceData", JSON.stringify(insuranceData));
    formDataObj.append("cars", JSON.stringify(cars));
    await updateClient(formDataObj);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="hidden" name="id" value={formData.id} />
        <FormInput
          label="Name"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Client Email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          label="Client Image (URL)"
          name="clientImg"
          placeholder="Client Image URL"
          value={formData.clientImg}
          onChange={handleChange}
        />
        <FormInput
          label="Budget"
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
        />
        <FormInput
          label="Address"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <FormInput
          label="Payment Method"
          name="paymentMethod"
          placeholder="Payment Method"
          value={formData.paymentMethod}
          onChange={handleChange}
        />
        <FormInput
          label="Phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <FormInput
          label="Note"
          type="textarea"
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
        />

        <h3 className={styles.label}>Insurance</h3>
        {insuranceData.map((insurance, index) => (
          <div key={index} className={styles.insuranceContainer}>
            <FormInput
              label="Agent"
              placeholder="Agent"
              value={insurance.agent}
              onChange={(e) =>
                handleInsuranceChange(index, "agent", e.target.value)
              }
            />
            <FormInput
              label="Company"
              placeholder="Company"
              value={insurance.company}
              onChange={(e) =>
                handleInsuranceChange(index, "company", e.target.value)
              }
            />
            <FormInput
              label="Contact"
              type="number"
              placeholder="Contact"
              value={insurance.contact}
              onChange={(e) =>
                handleInsuranceChange(index, "contact", e.target.value)
              }
            />
            <FormInput
              label="Policy Number"
              placeholder="Policy Number"
              value={insurance.policyNumber}
              onChange={(e) =>
                handleInsuranceChange(index, "policyNumber", e.target.value)
              }
            />
            <FormInput
              label="Coverage Type"
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
            <FormInput
              label="Monthly Due Date"
              type="date"
              placeholder="Monthly Due Date"
              value={insurance.monthlyDueDate}
              onChange={(e) =>
                handleInsuranceChange(index, "monthlyDueDate", e.target.value)
              }
            />
            <FormInput
              label="Monthly Amount"
              type="number"
              placeholder="Monthly Amount"
              value={insurance.monthlyAmount}
              onChange={(e) =>
                handleInsuranceChange(index, "monthlyAmount", e.target.value)
              }
            />
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeInsurance(index)}
            >
              Remove Insurance
            </button>
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={addInsurance}>
          Add Insurance
        </button>

        <h3 className={styles.label}>Cars</h3>
        {cars.map((car, index) => (
          <div key={index} className={styles.carContainer}>
            <FormInput
              label="Year"
              type="number"
              placeholder="Year"
              value={car.year}
              onChange={(e) => handleCarChange(index, "year", e.target.value)}
            />
            <FormInput
              label="Model"
              placeholder="Model"
              value={car.model}
              onChange={(e) => handleCarChange(index, "model", e.target.value)}
            />
            <FormInput
              label="Trim"
              placeholder="Trim"
              value={car.trim}
              onChange={(e) => handleCarChange(index, "trim", e.target.value)}
            />
            <FormInput
              label="Chassis (VIN Number)"
              placeholder="Chassis (VIN Number)"
              value={car.chassis}
              onChange={(e) =>
                handleCarChange(index, "chassis", e.target.value)
              }
            />
            <FormInput
              label="Miles"
              type="number"
              placeholder="Miles"
              value={car.miles}
              onChange={(e) => handleCarChange(index, "miles", e.target.value)}
            />
            <FormInput
              label="Color"
              placeholder="Color"
              value={car.color}
              onChange={(e) => handleCarChange(index, "color", e.target.value)}
            />
            <FormInput
              label="Type of Use"
              type="select"
              name="type"
              value={car.type}
              placeholder="Type of Use"
              options={[
                { value: "PASSAGEIRO", label: "Passenger" },
                { value: "COMERCIAL", label: "Commercial" },
              ]}
              onChange={(e) => handleCarChange(index, "type", e.target.value)}
            />
            <FormInput
              label="Weight (Commercial)"
              type="number"
              placeholder="Weight (Commercial)"
              value={car.weight}
              onChange={(e) => handleCarChange(index, "weight", e.target.value)}
            />
            <FormInput
              label="Plate Type"
              placeholder="Plate Type"
              value={car.plateType}
              onChange={(e) =>
                handleCarChange(index, "plateType", e.target.value)
              }
            />
            <FormInput
              label="Plate Number"
              placeholder="Plate Number"
              value={car.plateNumber}
              onChange={(e) =>
                handleCarChange(index, "plateNumber", e.target.value)
              }
            />
            <FormInput
              label="Market Value"
              type="number"
              placeholder="Market Value"
              value={car.marketValue}
              onChange={(e) =>
                handleCarChange(index, "marketValue", e.target.value)
              }
            />
            <FormInput
              label="Plate Expiration"
              type="date"
              placeholder="Plate Expiration"
              value={car.plateExpiration}
              onChange={(e) =>
                handleCarChange(index, "plateExpiration", e.target.value)
              }
            />
            <FormInput
              label="Insurance Value"
              type="number"
              placeholder="Insurance Value"
              value={car.insuranceValue}
              onChange={(e) =>
                handleCarChange(index, "insuranceValue", e.target.value)
              }
            />
            <FormInput
              label="Coverage Type"
              placeholder="Coverage Type"
              value={car.coverageType}
              onChange={(e) =>
                handleCarChange(index, "coverageType", e.target.value)
              }
            />
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeCar(index)}
            >
              Remove Car
            </button>
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={addCar}>
          Add Car
        </button>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingleClientForm;
