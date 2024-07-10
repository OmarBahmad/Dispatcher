"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CarItem = ({ car, index, onChange, onRemove }) => {
  const [carData, setCarData] = useState(car);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    onChange(index, carData);
  }, [carData, index]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`${styles.carContainer} ${styles.formContent}`}>
      <div className={styles.titleLabel} onClick={() => setShowContent(!showContent)}>
        <label>{carData.model || `New Car ${index + 1}`}</label>
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
              name="year"
              value={carData.year}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Model</label>
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={carData.model}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Trim</label>
            <input
              type="text"
              placeholder="Trim"
              name="trim"
              value={carData.trim}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Chassis (VIN Number)</label>
            <input
              type="text"
              placeholder="Chassis (VIN Number)"
              name="chassis"
              value={carData.chassis}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Miles</label>
            <input
              type="number"
              placeholder="Miles"
              name="miles"
              value={carData.miles}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Color</label>
            <input
              type="text"
              placeholder="Color"
              name="color"
              value={carData.color}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Type of Use</label>
            <select
              name="type"
              value={carData.type}
              onChange={handleInputChange}
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
              name="weight"
              value={carData.weight}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Plate Type</label>
            <select
              name="plateType"
              value={carData.plateType}
              onChange={handleInputChange}
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
              name="plateNumber"
              value={carData.plateNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Market Value</label>
            <input
              type="number"
              placeholder="Market Value"
              name="marketValue"
              value={carData.marketValue}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Plate Expiration Date</label>
            <input
              type="date"
              placeholder="Plate Expiration Date"
              name="plateExpiration"
              value={carData.plateExpiration}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Insurance Value</label>
            <input
              type="number"
              placeholder="Insurance Value"
              name="insuranceValue"
              value={carData.insuranceValue}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Coverage Type</label>
            <input
              type="text"
              placeholder="Coverage Type"
              name="coverageType"
              value={carData.coverageType}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => onRemove(index)}
          >
            Remove Car
          </button>
        </>
      )}
    </div>
  );
};

export default CarItem;
