import { fetchTasks } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import { FiEye, FiTrash2, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { deleteTask } from "@/app/lib/actions";
import DeleteButtonWithModal from "@/app/ui/dashboard/components/DeleteButton/deletebutton";

import styles from "@/app/ui/dashboard/tasks/tasks.module.css";

const TasksPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, tasks } = await fetchTasks(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for tasks..." />
        <Link href="/dashboard/tasks/add">
          <button className={styles.addButton}>
            <FiPlus /> Add New Task
          </button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Total Amount</td>
            <td>Due Amount</td>
            <td>Paid Status</td>
            <td>Description</td>
            <td>Created At</td>
            <td>Category</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.id} className={styles.tableRow}>
              <td>{task.title}</td>
              <td>U$ {Number(task.labor) + Number(task.overtime)}</td>
              <td>U$ {Number(task.labor) + Number(task.overtime) - Number(task.paidAmount)}</td>
              <td>
                <span className={`${styles.status} ${styles[task.status]}`}>
                  {task.status}
                </span>
              </td>
              <td className={styles.description}>{task.desc}</td>
              <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles.taskcaregory} ${styles[task.cat]}`}>
                  {task.cat}
                </span>
              </td>
              <td>
                <div className={styles.actionButtons}>
                  <Link href={`/dashboard/tasks/${task.id}`}>
                    <button className={`${styles.button} ${styles.viewButton}`}>
                      <FiEye /> View
                    </button>
                  </Link>
                  <form action={deleteTask}>
                    <DeleteButtonWithModal id={task.id} text={"task"} />
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination count={count} />
    </div>
  );
};

export default TasksPage;
