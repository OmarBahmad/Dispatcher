import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";

const InsuranceSelectionModal = ({ insurances, onSelectInsurance, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Escolha um Seguro</h2>
        <ul>
          {insurances.map((insurance) => (
            <li key={insurance._id} onClick={() => onSelectInsurance(insurance)}>
              {insurance.company} - {insurance.policyNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsuranceSelectionModal;