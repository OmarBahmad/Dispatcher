import { updateClient } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import CarList from "./carList/carList";
import InsuranceList from "./insuranceList/insuranceList";

const SingleClient = ({ client, id }) => {
  
  return (
    <div className={styles.formContainer}>
      <form action={updateClient} className={styles.form}>
        <input type="hidden" name="id" value={id} />
        {/* Client Data */}
        <div className={styles.formContent}>
          <div className={styles.inputContainer}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Client Name"
              name="name"
              defaultValue={client.name}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Client Email"
              name="email"
              defaultValue={client.email}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Client Image (URL)</label>
            <input
              type="text"
              placeholder="Client Image (URL)"
              name="clientImg"
              defaultValue={client.clientImg}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Budget</label>
            <input
              type="number"
              placeholder="Budget"
              name="budget"
              defaultValue={client.budget}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              defaultValue={client.address}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Payment Method</label>
            <input
              type="text"
              placeholder="Payment Method"
              name="paymentMethod"
              defaultValue={client.paymentMethod}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              defaultValue={client.phone}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>Note</label>
          <textarea
            placeholder="Note (Others)"
            name="note"
            defaultValue={client.note}
            rows="10"
          />
        </div>
        <InsuranceList insurance={client.insuranceData} />
        <CarList cars={client.cars} />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SingleClient;
