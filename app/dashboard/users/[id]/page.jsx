import { updateUser } from "@/app/lib/actions";
import { fetchSingleUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Image from "next/image";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchSingleUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="User Image" fill />
        </div>
        <div className={styles.username}>{user.username}</div>
      </div>

      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" value={user.username} required />
          <label>Email</label>
          <input type="email" name="email" value={user.email} required />
          <label>Password</label>
          <input type="password" name="password" value={user.password} />
          <label>Role</label>
          <select name="isAdmin" defaultValue={user.isAdmin}>
            <option value="true">Admin</option>
            <option value="false">User</option>
          </select>
          <button type="submit" className={styles.submitButton}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;