import { addClient } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";

const AddClientPage = () => {
  return (
    <div className={styles.container}>
      <form action={addClient} className={styles.form}>
        <h3 className={styles.label}>Client</h3>
        {/* Client Data */}
        <input type="text" placeholder="Client Name" name="name" required />
        <input type="email" placeholder="Client Email" name="email" required />
        <input type="text" placeholder="Client Image (URL)" name="clientImg" />
        <input type="number" placeholder="Budget" name="budget" required />
        <input type="text" placeholder="Address" name="address" required />
        <input type="text" placeholder="Payment Method" name="paymentMethod" required />
        <input type="text" placeholder="Phone" name="phone" required />
        <textarea placeholder="Note (Others)" name="note" />

        <h3 className={styles.label}>Insurance</h3>

        {/* Insurance Data */}
        <input type="text" placeholder="Agent" name="agent"  />
        <input type="text" placeholder="Company" name="company" required />
        <input type="number" placeholder="Contact" name="contact"  />
        <input type="text" placeholder="Policy Number" name="policyNumber" />
        <input type="text" placeholder="Coverage Type" name="insurancecoverageType"  />
        <input type="date" placeholder="Monthly Due Date" name="monthlyDueDate"  />
        <input type="number" placeholder="Monthly Amount" name="monthlyAmount"  />


        <h3 className={styles.label}>Cars</h3>

        {/* Car Data */}
        <input type="number" placeholder="Year" name="year" required />
        <input type="text" placeholder="Model" name="model" required />
        <input type="text" placeholder="Trim" name="trim" />
        <input type="text" placeholder="Chassis (VIN Number)" name="chassis"  />
        <input type="number" placeholder="Miles" name="miles"  />
        <input type="text" placeholder="Color" name="color"  />
        <select name="type" required>
          <option value="" disabled selected>Type of Use</option>
          <option value="PASSAGEIRO">Passenger</option>
          <option value="COMERCIAL">Commercial</option>
        </select>
        <input type="number" placeholder="Weight (Commercial)" name="weight" />
        <input type="text" placeholder="Plate Type" name="plateType"  />
        <input type="text" placeholder="Plate Number" name="plateNumber"  />
        <input type="number" placeholder="Market Value" name="marketValue"  />
        <input type="date" placeholder="Plate Expiration" name="plateExpiration"  />
        <input type="number" placeholder="Insurance Value" name="insuranceValue"  />
        <input type="text" placeholder="Coverage Type" name="coverageType"  />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddClientPage;