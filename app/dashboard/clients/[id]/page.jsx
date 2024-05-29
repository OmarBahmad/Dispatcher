"use client"
import { updateClient } from "@/app/lib/actions";
import { fetchSingleClient } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

const SingleClientPage = ({ params }) => {
  const { id } = params;
  const [client, setClient] = useState(null);
  const [insuranceData, setInsuranceData] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    console.log('começou o fetchClient', id);
    const fetchClient = async () => {
      const clientData = await fetchSingleClient(id);
      setClient(clientData);
      setInsuranceData(clientData.insuranceData || []);
      setCars(clientData.cars || []);
    };

    fetchClient();
  }, [id]);

  const addInsurance = () => {
    setInsuranceData([...insuranceData, { agent: "", company: "", contact: "", policyNumber: "", insurancecoverageType: "", monthlyDueDate: "", monthlyAmount: "" }]);
  };

  const removeInsurance = (index) => {
    const updatedInsuranceData = insuranceData.filter((_, i) => i !== index);
    setInsuranceData(updatedInsuranceData);
  };

  const addCar = () => {
    setCars([...cars, { year: "", model: "", trim: "", chassis: "", miles: "", color: "", type: "", weight: "", plateType: "", plateNumber: "", marketValue: "", plateExpiration: "", insuranceValue: "", coverageType: "" }]);
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
    await updateClient(formData);
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        {client.name}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={client.id} />
          <div className={styles.inputContainer}>
            <label>Name</label>
            <input type="text" name="name" placeholder="Client Name" defaultValue={client.name} />
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input type="email" name="email" placeholder="Client Email" defaultValue={client.email} />
          </div>
          <div className={styles.inputContainer}>
            <label>Client Image (URL)</label>
            <input type="text" name="clientImg" placeholder="Client Image URL" defaultValue={client.clientImg} />
          </div>
          <div className={styles.inputContainer}>
            <label>Budget</label>
            <input type="number" name="budget" placeholder="Budget" defaultValue={client.budget} />
          </div>
          <div className={styles.inputContainer}>
            <label>Address</label>
            <input type="text" name="address" placeholder="Address" defaultValue={client.address} />
          </div>
          <div className={styles.inputContainer}>
            <label>Payment Method</label>
            <input type="text" name="paymentMethod" placeholder="Payment Method" defaultValue={client.paymentMethod} />
          </div>
          <div className={styles.inputContainer}>
            <label>Phone</label>
            <input type="text" name="phone" placeholder="Phone" defaultValue={client.phone} />
          </div>
          <div className={styles.inputContainer}>
            <label>Note</label>
            <textarea name="note" placeholder="Note" defaultValue={client.note} />
          </div>

          <h3 className={styles.label}>Insurance</h3>
          {insuranceData.map((insurance, index) => (
            <div key={index} className={styles.insuranceContainer}>
              <div className={styles.inputContainer}>
                <label>Agent</label>
                <input type="text" placeholder="Agent" value={insurance.agent} onChange={(e) => handleInsuranceChange(index, 'agent', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Company</label>
                <input type="text" placeholder="Company" value={insurance.company} onChange={(e) => handleInsuranceChange(index, 'company', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Contact</label>
                <input type="number" placeholder="Contact" value={insurance.contact} onChange={(e) => handleInsuranceChange(index, 'contact', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Policy Number</label>
                <input type="text" placeholder="Policy Number" value={insurance.policyNumber} onChange={(e) => handleInsuranceChange(index, 'policyNumber', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Coverage Type</label>
                <input type="text" placeholder="Coverage Type" value={insurance.insurancecoverageType} onChange={(e) => handleInsuranceChange(index, 'insurancecoverageType', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Monthly Due Date</label>
                <input type="date" placeholder="Monthly Due Date" value={insurance.monthlyDueDate} onChange={(e) => handleInsuranceChange(index, 'monthlyDueDate', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Monthly Amount</label>
                <input type="number" placeholder="Monthly Amount" value={insurance.monthlyAmount} onChange={(e) => handleInsuranceChange(index, 'monthlyAmount', e.target.value)} />
              </div>
              <button type="button" className={styles.removeButton} onClick={() => removeInsurance(index)}>Remove Insurance</button>
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={addInsurance}>Add Insurance</button>

          <h3 className={styles.label}>Cars</h3>
          {cars.map((car, index) => (
            <div key={index} className={styles.carContainer}>
              <div className={styles.inputContainer}>
                <label>Year</label>
                <input type="number" placeholder="Year" value={car.year} onChange={(e) => handleCarChange(index, 'year', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Model</label>
                <input type="text" placeholder="Model" value={car.model} onChange={(e) => handleCarChange(index, 'model', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Trim</label>
                <input type="text" placeholder="Trim" value={car.trim} onChange={(e) => handleCarChange(index, 'trim', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Chassis (VIN Number)</label>
                <input type="text" placeholder="Chassis (VIN Number)" value={car.chassis} onChange={(e) => handleCarChange(index, 'chassis', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Miles</label>
                <input type="number" placeholder="Miles" value={car.miles} onChange={(e) => handleCarChange(index, 'miles', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Color</label>
                <input type="text" placeholder="Color" value={car.color} onChange={(e) => handleCarChange(index, 'color', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Type of Use</label>
                <select name="type" value={car.type} onChange={(e) => handleCarChange(index, 'type', e.target.value)}>
                  <option value="" disabled>Type of Use</option>
                  <option value="PASSAGEIRO">Passenger</option>
                  <option value="COMERCIAL">Commercial</option>
                </select>
              </div>
              <div className={styles.inputContainer}>
                <label>Weight (Commercial)</label>
                <input type="number" placeholder="Weight (Commercial)" value={car.weight} onChange={(e) => handleCarChange(index, 'weight', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Plate Type</label>
                <input type="text" placeholder="Plate Type" value={car.plateType} onChange={(e) => handleCarChange(index, 'plateType', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Plate Number</label>
                <input type="text" placeholder="Plate Number" value={car.plateNumber} onChange={(e) => handleCarChange(index, 'plateNumber', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Market Value</label>
                <input type="number" placeholder="Market Value" value={car.marketValue} onChange={(e) => handleCarChange(index, 'marketValue', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Plate Expiration</label>
                <input type="date" placeholder="Plate Expiration" value={car.plateExpiration} onChange={(e) => handleCarChange(index, 'plateExpiration', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Insurance Value</label>
                <input type="number" placeholder="Insurance Value" value={car.insuranceValue} onChange={(e) => handleCarChange(index, 'insuranceValue', e.target.value)} />
              </div>
              <div className={styles.inputContainer}>
                <label>Coverage Type</label>
                <input type="text" placeholder="Coverage Type" value={car.coverageType} onChange={(e) => handleCarChange(index, 'coverageType', e.target.value)} />
              </div>
              <button type="button" className={styles.removeButton} onClick={() => removeCar(index)}>Remove Car</button>
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={addCar}>Add Car</button>

          <button type="submit" className={styles.submitButton}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleClientPage;
