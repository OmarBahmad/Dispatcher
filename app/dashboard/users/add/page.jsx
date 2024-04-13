import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="User Name" name="username" required />
        <input type="text" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />

        <select name="isAdmin" id="isAdmin">
          <option value="true" selected>Yes</option>
          <option value="false">No</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
