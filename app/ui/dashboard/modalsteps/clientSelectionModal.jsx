import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";

const ClientSelectionModal = ({ clients, onSelectClient, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Escolha um Cliente</h2>
        <ul>
          {clients.map((client) => (
            <li key={client._id} onClick={() => onSelectClient(client)}>
              {client.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientSelectionModal;