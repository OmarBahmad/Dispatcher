import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { searchParams } from "next/navigation";
import { fetchTasks } from "@/app/lib/data";

import styles from "@/app/ui/dashboard/tasks/tasks.module.css";

const TasksPage = async () => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, tasks } = await fetchTasks(q, page);

  console.log("teste", tasks);


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for the tasks..." />
        <Link href="/dashboard/tasks/add">
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Title</td>
            <td>Description</td>
            <td>Created At</td>
            <td>Created By</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>
                  <div className={styles.task}>
                    {task.title}
                  </div>
                </td>
                <td>Assurance</td>
                <td className={styles.description}>New assurance account</td>
                <td>05.01.2024</td>
                <td>admin</td>
                <td>active</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href="/dashboard/tasks/test">
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  );
};

export default TasksPage;
