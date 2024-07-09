"use client";
import React, { useState } from "react";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CarItem = ({ car, index }) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div key={index} className={`${styles.carContainer} ${styles.formContent}`}>
      <div className={styles.titleLabel} onClick={toggleContent}>
        <label>{car.model || `New Car ${index + 1}`}</label>
        <span className={`${styles.arrow}`}>
          {showContent ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      {showContent && (
        <>
          <div className={styles.inputContainer}>
            <label>Year</label>
            <input
              type="number"
              placeholder="Year"
              defaultValue={car.year}
              // onChange={(e) => handleCarChange(index, "year", e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Model</label>
            <input
              type="text"
              placeholder="Model"
              defaultValue={car.model}
              // onChange={(e) =>
              //   handleCarChange(index, "model", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Trim</label>
            <input
              type="text"
              placeholder="Trim"
              defaultValue={car.trim}
              // onChange={(e) => handleCarChange(index, "trim", e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Chassis (VIN Number)</label>
            <input
              type="text"
              placeholder="Chassis (VIN Number)"
              defaultValue={car.chassis}
              // onChange={(e) =>
              //   handleCarChange(index, "chassis", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Miles</label>
            <input
              type="number"
              placeholder="Miles"
              defaultValue={car.miles}
              // onChange={(e) =>
              //   handleCarChange(index, "miles", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Color</label>
            <input
              type="text"
              placeholder="Color"
              defaultValue={car.color}
              // onChange={(e) =>
              //   handleCarChange(index, "color", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Type of Use</label>
            <select
              defaultValue={car.type}
              // onChange={(e) => handleCarChange(index, "type", e.target.value)}
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
              defaultValue={car.weight}
              // onChange={(e) =>
              //   handleCarChange(index, "weight", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Plate Type</label>
            <select
              defaultValue={car.plateType}
              // onChange={(e) =>
              //   handleCarChange(index, "plateType", e.target.value)
              // }
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
              defaultValue={car.plateNumber}
              // onChange={(e) =>
              //   handleCarChange(index, "plateNumber", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Market Value</label>
            <input
              type="number"
              placeholder="Market Value"
              defaultValue={car.marketValue}
              // onChange={(e) =>
              //   handleCarChange(index, "marketValue", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Plate Expiration Date</label>
            <input
              type="date"
              placeholder="Plate Expiration Date"
              defaultValue={car.plateExpiration}
              // onChange={(e) =>
              //   handleCarChange(index, "plateExpiration", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Insurance Value</label>
            <input
              type="number"
              placeholder="Insurance Value"
              defaultValue={car.insuranceValue}
              // onChange={(e) =>
              //   handleCarChange(index, "insuranceValue", e.target.value)
              // }
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Coverage Type</label>
            <input
              type="text"
              placeholder="Coverage Type"
              defaultValue={car.coverageType}
              // onChange={(e) =>
              //   handleCarChange(index, "coverageType", e.target.value)
              // }
            />
          </div>
          <button
            type="button"
            className={styles.removeButton}
            // onClick={() => removeCar(index)}
          >
            Remove Car
          </button>
        </>
      )}
    </div>
  );
};

export default CarItem;
