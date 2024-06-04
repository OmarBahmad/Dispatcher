import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { searchParams } from "next/navigation";
import { fetchTasks } from "@/app/lib/data";

import styles from "@/app/ui/dashboard/tasks/tasks.module.css";
import { deleteTask } from "@/app/lib/actions";
import DeleteButtonWithModal from "@/app/ui/dashboard/components/DeleteButton/deletebutton";

const TasksPage = async () => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, tasks } = await fetchTasks(q, page);

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
            <td>Title</td>
            <td>Total amount</td>
            <td>Due amount</td>
            <td>Paid Status</td>
            <td>Description</td>
            <td>Created At</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>U$ {Number(task.labor) + Number(task.overtime)}</td>
                <td>
                  U${" "}
                  {Number(task.labor) +
                    Number(task.overtime) -
                    Number(task.paidAmount)}
                </td>
                <td className={`${styles.status}`}>
                  <span className={`${styles[task.status]}`}>
                    {task.status}
                  </span>
                </td>
                <td className={styles.description}>{task.desc}</td>
                <td>{task.createdAt?.toString().slice(4, 16)}</td>
                <td className={`${styles.cat}`}>
                  <span className={`${styles[task.cat]}`}>{task.cat}</span>
                </td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/tasks/${task.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form action={deleteTask}>
                      <DeleteButtonWithModal id={task.id} text={"task"} />
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default TasksPage;
