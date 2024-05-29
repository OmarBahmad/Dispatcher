import { addTask } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";

const AddTaskPage = () => {
  return (
    <div className={styles.container}>
      <form action={addTask} className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <select name="cat" id="cat">
          <option value="general" defaultValue> Choose a Category</option>
          <option value="open"> Open</option>
          <option value="close"> Close</option>
          <option value="standby"> StandBy</option>
        </select>
        <input
          type="number"
          placeholder="Driver Licence"
          name="driverlicence"
        />
        <input type="text" placeholder="License Plate" name="licenseplate" />
        <input type="text" placeholder="Driver Name" name="drivername" />
        <input type="text" placeholder="Car" name="car" />
        <textarea
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
