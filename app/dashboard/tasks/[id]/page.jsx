import { updateTask } from "@/app/lib/actions";
import { fetchSingleTask } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/tasks/singleTask/singleTask.module.css";

const SingleTaskPage = async ({ params }) => {
  const { id } = params;
  const task = await fetchSingleTask(id);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updateTask} className={styles.form}>
          <input type="hidden" name="id" value={task.id} />
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              defaultValue={task.title}
            />
          </div>
          <div>
            <label>Category</label>
            <select name="cat" id="cat">
              <option value={task.cat} defaultValue={task.cat}>
                {" "}
                {task.cat}
              </option>
              <option value="open"> Open</option>
              <option value="close"> Close</option>
              <option value="standby"> StandBy</option>
            </select>
          </div>
          <div>
            <label>Driver Licence</label>
            <input
              type="text"
              name="driverlicence"
              placeholder="Driver Licence"
              defaultValue={task.driverlicence}
            />
          </div>
          <div>
            <label>License Plate</label>
            <input
              type="text"
              name="licenseplate"
              placeholder="License Plate"
              defaultValue={task.licenseplate}
            />
          </div>
          <div>
            <label>Driver Name</label>
            <input
              type="text"
              name="drivername"
              placeholder="Driver Name"
              defaultValue={task.drivername}
            />
          </div>
          <div>
            <label>Car</label>
            <input
              type="text"
              name="car"
              placeholder="Car"
              defaultValue={task.car}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              name="desc"
              placeholder="Description"
              defaultValue={task.desc}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTaskPage;
