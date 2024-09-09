import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";

export const ClientForm = ({ clientData, setClientData }) => {
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.formContent}>
      <div className={styles.inputContainer}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Client Name"
          name="name"
          value={clientData.name}
          onChange={handleClientChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Client Email"
          name="email"
          value={clientData.email}
          onChange={handleClientChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Address</label>
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={clientData.address}
          onChange={handleClientChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Client Image (URL)</label>
        <input
          type="text"
          placeholder="Client Image (URL)"
          name="clientImg"
          value={clientData.clientImg}
          onChange={handleClientChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Phone</label>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={clientData.phone}
          onChange={handleClientChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>ID</label>
        <select
          name="idType"
          id="idType"
          value={clientData.idType}
          onChange={handleClientChange}
        >
          <option defaultValue={""}> Choose ID Type</option>
          <option value="passport"> Passport</option>
          <option value="driverlicence"> Driver Licence</option>
          <option value="other"> Other</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label>ID Number</label>
        <input
          type="text"
          placeholder="ID Number"
          name="idValue"
          value={clientData.idValue}
          onChange={handleClientChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label>Note</label>
        <textarea
          placeholder="Note (Others)"
          name="note"
          value={clientData.note}
          onChange={handleClientChange}
        />
      </div>
    </div>
  );
};
