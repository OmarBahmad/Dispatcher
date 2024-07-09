'use client'
import React, { useState } from 'react';
import CarItem from './carItem/carItem';
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";

const CarList = ({ cars }) => {
  const [carList, setCarList] = useState(cars);

  const addCar = () => {
    const newCar = {
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
    };
  
    setCarList([...carList, newCar]);
  };

  return (
    <>
      <div className={styles.titleContainer}>
          <h3 className={styles.label}>Cars</h3>
          <button type="button" className={styles.addButton} onClick={() => addCar()}>
            Add Car
          </button>
        </div>
      {carList.map((car, index) => (
        <CarItem key={index} car={car} index={index} />
      ))}
    </>
  );
};

export default CarList;