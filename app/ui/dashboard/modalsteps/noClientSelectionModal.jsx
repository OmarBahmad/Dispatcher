import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";

const NoClientFoundModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Nenhum cliente encontrado</h2>
        <p>Deseja adicionar um novo cliente?</p>
        <div className={styles.modalActions}>
          <a href="/dashboard/clients/add" className={styles.primaryButton}>
            Adicionar Cliente
          </a>
          <button onClick={onClose} className={styles.secondaryButton}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoClientFoundModal;