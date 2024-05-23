import { updateUser } from "@/app/lib/actions";
import { fetchSingleUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchSingleUser(id);
  console.log('teste user', user)
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder="Ex: Sales Bahamas" value={user.username} />
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Ex: sales@bahamas.com"
            value={user.email}
          />
          <label>Password</label>
          <input type="text" name="password" placeholder="Ex: pass" value={user.password}/>
          <label>isAdmin ?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} defaultValue>
              Yes
            </option>
            <option value={false}>No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
