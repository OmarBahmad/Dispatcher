import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/users.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <label>Username</label>
        <input type="text" placeholder="Username" name="username" required />
        <label>Email</label>
        <input type="email" placeholder="Email" name="email" required />
        <label>Password</label>
        <input type="password" placeholder="Password" name="password" required />
        <label>Role</label>
        <select name="isAdmin" required>
          <option value="true">Admin</option>
          <option value="false">User</option>
        </select>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
