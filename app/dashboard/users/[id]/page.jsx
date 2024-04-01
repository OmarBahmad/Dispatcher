import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        Sales Bahamas
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" placeholder="Sales Bahamas" />
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="SalesBahamas@gmail.com"
          />
          <label>Password</label>
          <input type="text" name="password" />
          <label>isAdmin ?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected>
              Yes
            </option>
            <option value={false}>No</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
