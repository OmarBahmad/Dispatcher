import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";

const AddClientPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <h3 className={styles.label}>Client</h3>
        {/* Client Data */}
        <input type="text" placeholder="Client Name" name="clientName" required />
        <input type="email" placeholder="Client Email" name="clientEmail" required />
        <input type="text" placeholder="Client Image (URL)" name="clientImg" />
        <input type="number" placeholder="Budget" name="budget" required />
        <input type="text" placeholder="Address" name="address" required />
        <input type="text" placeholder="Payment Method" name="paymentMethod" required />
        <input type="text" placeholder="Phone" name="phone" required />
        <textarea placeholder="Note (Others)" name="note" />

        <h3 className={styles.label}>Insurance</h3>

        {/* Insurance Data */}
        <input type="text" placeholder="Agent" name="agent" required />
        <input type="text" placeholder="Company" name="company" required />
        <input type="text" placeholder="Policy Number" name="policyNumber" required />
        <input type="text" placeholder="Coverage Type" name="coverageType" required />
        <input type="date" placeholder="Monthly Due Date" name="monthlyDueDate" required />
        <input type="number" placeholder="Monthly Amount" name="monthlyAmount" required />

        <h3 className={styles.label}>Cars</h3>

        {/* Car Data */}
        <input type="number" placeholder="Year" name="year" required />
        <input type="text" placeholder="Model" name="model" required />
        <input type="text" placeholder="Trim" name="trim" />
        <input type="text" placeholder="Chassis (VIN Number)" name="chassis" required />
        <input type="number" placeholder="Miles" name="miles" required />
        <input type="text" placeholder="Color" name="color" required />
        <select name="type" required>
          <option value="" disabled selected>Type of Use</option>
          <option value="PASSAGEIRO">Passenger</option>
          <option value="COMERCIAL">Commercial</option>
        </select>
        <input type="number" placeholder="Weight (Commercial)" name="weight" />
        <input type="text" placeholder="Plate Type" name="plateType" required />
        <input type="text" placeholder="Plate Number" name="plateNumber" required />
        <input type="number" placeholder="Market Value" name="marketValue" required />
        <input type="date" placeholder="Plate Expiration" name="plateExpiration" required />
        <input type="number" placeholder="Insurance Value" name="insuranceValue" required />
        <input type="text" placeholder="Coverage Type" name="coverageType" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddClientPage;