"use client"
import { updateClient } from "@/app/lib/actions";
import { fetchSingleClient } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import { useState } from "react";
import Image from "next/image";

const SingleClientPage = async ({ params }) => {
  const { id } = params;
  const client = await fetchSingleClient(id);

  const [insuranceData, setInsuranceData] = useState(client.insuranceData || []);
  const [cars, setCars] = useState(client.cars || []);

  const addInsurance = () => {
    setInsuranceData([...insuranceData, { agent: "", company: "", contact: "", policyNumber: "", insurancecoverageType: "", monthlyDueDate: "", monthlyAmount: "" }]);
  };

  const addCar = () => {
    setCars([...cars, { year: "", model: "", trim: "", chassis: "", miles: "", color: "", type: "", weight: "", plateType: "", plateNumber: "", marketValue: "", plateExpiration: "", insuranceValue: "", coverageType: "" }]);
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

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={client.clientImg || "/noavatar.png"} alt="" fill />
        </div>
        {client.name}
      </div>
      <div className={styles.formContainer}>
        <form action={updateClient} className={styles.form}>
          <input type="hidden" name="id" value={client.id} />
          <label>Name</label>
          <input type="text" name="name" placeholder="Client Name" defaultValue={client.name} />
          <label>Email</label>
          <input type="email" name="email" placeholder="Client Email" defaultValue={client.email} />
          <label>Client Image (URL)</label>
          <input type="text" name="clientImg" placeholder="Client Image URL" defaultValue={client.clientImg} />
          <label>Budget</label>
          <input type="number" name="budget" placeholder="Budget" defaultValue={client.budget} />
          <label>Address</label>
          <input type="text" name="address" placeholder="Address" defaultValue={client.address} />
          <label>Payment Method</label>
          <input type="text" name="paymentMethod" placeholder="Payment Method" defaultValue={client.paymentMethod} />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="Phone" defaultValue={client.phone} />
          <label>Note</label>
          <textarea name="note" placeholder="Note">{client.note}</textarea>

          <h3 className={styles.label}>Insurance</h3>
          {insuranceData.map((insurance, index) => (
            <div key={index} className={styles.insuranceContainer}>
              <input type="text" placeholder="Agent" value={insurance.agent} onChange={(e) => handleInsuranceChange(index, 'agent', e.target.value)} />
              <input type="text" placeholder="Company" value={insurance.company} onChange={(e) => handleInsuranceChange(index, 'company', e.target.value)} />
              <input type="number" placeholder="Contact" value={insurance.contact} onChange={(e) => handleInsuranceChange(index, 'contact', e.target.value)} />
              <input type="text" placeholder="Policy Number" value={insurance.policyNumber} onChange={(e) => handleInsuranceChange(index, 'policyNumber', e.target.value)} />
              <input type="text" placeholder="Coverage Type" value={insurance.insurancecoverageType} onChange={(e) => handleInsuranceChange(index, 'insurancecoverageType', e.target.value)} />
              <input type="date" placeholder="Monthly Due Date" value={insurance.monthlyDueDate} onChange={(e) => handleInsuranceChange(index, 'monthlyDueDate', e.target.value)} />
              <input type="number" placeholder="Monthly Amount" value={insurance.monthlyAmount} onChange={(e) => handleInsuranceChange(index, 'monthlyAmount', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addInsurance}>Add Insurance</button>

          <h3 className={styles.label}>Cars</h3>
          {cars.map((car, index) => (
            <div key={index} className={styles.carContainer}>
              <input type="number" placeholder="Year" value={car.year} onChange={(e) => handleCarChange(index, 'year', e.target.value)} />
              <input type="text" placeholder="Model" value={car.model} onChange={(e) => handleCarChange(index, 'model', e.target.value)} />
              <input type="text" placeholder="Trim" value={car.trim} onChange={(e) => handleCarChange(index, 'trim', e.target.value)} />
              <input type="text" placeholder="Chassis (VIN Number)" value={car.chassis} onChange={(e) => handleCarChange(index, 'chassis', e.target.value)} />
              <input type="number" placeholder="Miles" value={car.miles} onChange={(e) => handleCarChange(index, 'miles', e.target.value)} />
              <input type="text" placeholder="Color" value={car.color} onChange={(e) => handleCarChange(index, 'color', e.target.value)} />
              <select name="type" value={car.type} onChange={(e) => handleCarChange(index, 'type', e.target.value)}>
                <option value="" disabled>Type of Use</option>
                <option value="PASSAGEIRO">Passenger</option>
                <option value="COMERCIAL">Commercial</option>
              </select>
              <input type="number" placeholder="Weight (Commercial)" value={car.weight} onChange={(e) => handleCarChange(index, 'weight', e.target.value)} />
              <input type="text" placeholder="Plate Type" value={car.plateType} onChange={(e) => handleCarChange(index, 'plateType', e.target.value)} />
              <input type="text" placeholder="Plate Number" value={car.plateNumber} onChange={(e) => handleCarChange(index, 'plateNumber', e.target.value)} />
              <input type="number" placeholder="Market Value" value={car.marketValue} onChange={(e) => handleCarChange(index, 'marketValue', e.target.value)} />
              <input type="date" placeholder="Plate Expiration" value={car.plateExpiration} onChange={(e) => handleCarChange(index, 'plateExpiration', e.target.value)} />
              <input type="number" placeholder="Insurance Value" value={car.insuranceValue} onChange={(e) => handleCarChange(index, 'insuranceValue', e.target.value)} />
              <input type="text" placeholder="Coverage Type" value={car.coverageType} onChange={(e) => handleCarChange(index, 'coverageType', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addCar}>Add Car</button>

          <input type="hidden" name="insuranceData" value={JSON.stringify(insuranceData)} />
          <input type="hidden" name="cars" value={JSON.stringify(cars)} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleClientPage;