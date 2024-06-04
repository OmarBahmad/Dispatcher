"use client";
import { addTask } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";
import { useState, useEffect } from "react";

const AddTaskPage = () => {
  const [labor, setLabor] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);

  useEffect(() => {
    setTotal(Number(labor) + Number(overtime));
    setDueAmount(Number(total) - Number(paidAmount));
  }, [labor, overtime, total, paidAmount]);

  return (
    <div className={styles.container}>
      <form action={addTask} className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title" name="title" required />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="cat">Category</label>
          <select name="cat" id="cat">
            <option value="general" defaultValue>Choose a Category</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
            <option value="standby">StandBy</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="driverlicence">Driver Licence</label>
          <input type="number" id="driverlicence" placeholder="Driver Licence" name="driverlicence" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="licenseplate">License Plate</label>
          <input type="text" id="licenseplate" placeholder="License Plate" name="licenseplate" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="drivername">Driver Name</label>
          <input type="text" id="drivername" placeholder="Driver Name" name="drivername" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="car">Car</label>
          <input type="text" id="car" placeholder="Car" name="car" />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="labor">Labor</label>
          <input type="number" id="labor" placeholder="Labor" name="labor" onChange={(e) => setLabor(e.target.value)} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="overtime">Overtime</label>
          <input type="number" id="overtime" placeholder="Overtime" name="overtime" onChange={(e) => setOvertime(e.target.value)} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="totalAmount">Total Amount</label>
          <input type="text" id="totalAmount" placeholder="Total Amount" name="totalAmount" disabled value={`US$ ${Number(total)}`} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="paidAmount">Paid Amount</label>
          <input type="text" id="paidAmount" placeholder="Paid Amount" name="paidAmount" onChange={(e) => setPaidAmount(e.target.value)} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="dueAmount">Due Amount</label>
          <input type="text" id="dueAmount" placeholder="Due Amount" name="dueAmount" disabled value={`US$ ${dueAmount}`} />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="status">Status</label>
          <select name="status" id="status">
            <option value="general" defaultValue>Status</option>
            <option value="total">Total Paid</option>
            <option value="partial">Partial Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="desc">Description</label>
          <textarea name="desc" id="desc" rows="16" placeholder="Description"></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
