import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";

const CarSelectionModal = ({ cars, onSelectCar, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Escolha um Carro</h2>
        <ul>
          {cars.map((car) => (
            <li key={car._id} onClick={() => onSelectCar(car)}>
              {car.model} - {car.plateNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarSelectionModal;