import styles from "@/app/ui/dashboard/clients/addClient/addClient.module.css";

const CarForm = ({ cars, setCars }) => {
  const handleCarChange = (index, field, value) => {
    const updatedCars = [...cars];
    updatedCars[index][field] = value;
    setCars(updatedCars);
  };

  const addCar = () => {
    setCars([
      ...cars,
      {
        year: "",
        model: "",
        trim: "",
        chassis: "",
        miles: "",
        color: "",
        type: "",
        weight: "",
        plateType: "",
        plateNumber: "",
        marketValue: "",
        plateExpiration: "",
        insuranceValue: "",
        coverageType: "",
      },
    ]);
  };

  const removeCar = (index) => {
    const updatedCars = cars.filter((_, i) => i !== index);
    setCars(updatedCars);
  };

  return (
    <div className={styles.formContentContainer}>
      <div className={`${styles.formContainer} ${styles.formContent}`}>
        <h3 className={styles.label}>Car Information</h3>
        {cars.map((car, index) => (
          <div
            key={index}
            className={`${styles.carContainer} ${styles.formContent}`}
          >
            <div className={styles.titleContainer}>
              <div className={styles.title}>
                <label>Car {index + 1}</label>
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeCar(index)}
              >
                Remove Car
              </button>
            </div>
            <div className={styles.inputContainer}>
              <label>Year</label>
              <input
                type="number"
                placeholder="Year"
                value={car.year}
                onChange={(e) => handleCarChange(index, "year", e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Model</label>
              <input
                type="text"
                placeholder="Model"
                value={car.model}
                onChange={(e) =>
                  handleCarChange(index, "model", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Trim</label>
              <input
                type="text"
                placeholder="Trim"
                value={car.trim}
                onChange={(e) => handleCarChange(index, "trim", e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Chassis (VIN Number)</label>
              <input
                type="text"
                placeholder="Chassis (VIN Number)"
                value={car.chassis}
                onChange={(e) =>
                  handleCarChange(index, "chassis", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Miles</label>
              <input
                type="number"
                placeholder="Miles"
                value={car.miles}
                onChange={(e) =>
                  handleCarChange(index, "miles", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Color</label>
              <input
                type="text"
                placeholder="Color"
                value={car.color}
                onChange={(e) =>
                  handleCarChange(index, "color", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Type of Use</label>
              <select
                value={car.type}
                onChange={(e) => handleCarChange(index, "type", e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="commercial">Commercial</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label>Weight (lbs)</label>
              <input
                type="number"
                placeholder="Weight (lbs)"
                value={car.weight}
                onChange={(e) =>
                  handleCarChange(index, "weight", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Type</label>
              <select
                value={car.plateType}
                onChange={(e) =>
                  handleCarChange(index, "plateType", e.target.value)
                }
              >
                <option value="">Select Plate Type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Number</label>
              <input
                type="text"
                placeholder="Plate Number"
                value={car.plateNumber}
                onChange={(e) =>
                  handleCarChange(index, "plateNumber", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Market Value</label>
              <input
                type="number"
                placeholder="Market Value"
                value={car.marketValue}
                onChange={(e) =>
                  handleCarChange(index, "marketValue", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Plate Expiration Date</label>
              <input
                type="date"
                placeholder="Plate Expiration Date"
                value={car.plateExpiration}
                onChange={(e) =>
                  handleCarChange(index, "plateExpiration", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Insurance Value</label>
              <input
                type="number"
                placeholder="Insurance Value"
                value={car.insuranceValue}
                onChange={(e) =>
                  handleCarChange(index, "insuranceValue", e.target.value)
                }
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Coverage Type</label>
              <input
                type="text"
                placeholder="Coverage Type"
                value={car.coverageType}
                onChange={(e) =>
                  handleCarChange(index, "coverageType", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
      <button type="button" className={styles.addButton} onClick={addCar}>
        Add Car
      </button>
    </div>
  );
};

export default CarForm;
