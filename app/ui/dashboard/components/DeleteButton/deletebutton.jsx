"use client";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi"; // Ícone moderno
import styles from "./deletebutton.module.css";

const DeleteButtonWithModal = ({ id, text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`${styles.button} ${styles.deleteButton}`} onClick={openModal}>
        <FiTrash2 /> Delete
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this {text}?</p>
            <div className={styles.modalActions}>
              <input type="hidden" name="id" value={id} />
              <button type="submit" className={styles.confirmButton}>
                Yes, Delete
              </button>
              <div className={styles.cancelButton} onClick={closeModal}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButtonWithModal;
