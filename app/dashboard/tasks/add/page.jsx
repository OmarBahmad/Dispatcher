import styles from "@/app/ui/dashboard/tasks/addTask/addTask.module.css";

const AddTaskPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <select name="cat" id="cat">
          <option value="general" defaultValue> Choose a Category</option>
          <option value="option 1"> Option 1</option>
          <option value="option 2"> Option 2</option>
          <option value="option 3"> Option 3</option>
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
