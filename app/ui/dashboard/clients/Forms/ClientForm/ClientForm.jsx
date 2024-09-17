import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";

export const ClientForm = ({ clientData, setClientData, isUpdate=false }) => {

  const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16 MB

  // Função para capturar mudanças nos campos do cliente
  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para capturar arquivos e armazenar no clientData
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Captura o arquivo PDF

    if (file.size >= MAX_FILE_SIZE) {
      alert("One or more files exceed the size limit of 16MB.");
      e.target.value = ""; // Limpa o campo de seleção
      return; // Impede o envio de arquivos maiores que o limite
    }

    setClientData((prev) => ({ ...prev, files: file }));
  };

  return (
    <div className={styles.formContent}>
      {/* Nome do Cliente */}
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

      {/* Email do Cliente */}
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

      {/* Endereço do Cliente */}
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

      {/* Imagem do Cliente */}
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

      {/* Telefone do Cliente */}
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

      {/* Tipo de ID */}
      <div className={styles.inputContainer}>
        <label>ID</label>
        <select
          name="idType"
          id="idType"
          value={clientData.idType}
          onChange={handleClientChange}
        >
          <option value=""> Choose ID Type</option>
          <option value="passport"> Passport</option>
          <option value="driverlicence"> Driver Licence</option>
          <option value="other"> Other</option>
        </select>
      </div>

      {/* Número do ID */}
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

      {/* Notas sobre o Cliente */}
      <div className={styles.inputContainer}>
        <label>Note</label>
        <textarea
          placeholder="Note (Others)"
          name="note"
          value={clientData.note}
          onChange={handleClientChange}
        />
      </div>

      {/* Input para Upload de Arquivos */}
      {isUpdate && 
        <div className={styles.inputContainer}>
          <label>Upload Files:</label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
          />
        </div>
      }
    </div>
  );
};
