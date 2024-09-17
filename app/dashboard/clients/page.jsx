import { fetchClients } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import { deleteClient } from "@/app/lib/actions";
import { FiEye, FiTrash2, FiPlus } from "react-icons/fi";
import DeleteButtonWithModal from "@/app/ui/dashboard/components/DeleteButton/deletebutton";

import styles from "@/app/ui/dashboard/clients/clients.module.css";

const ClientsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, clients } = await fetchClients(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for the user..." />
        <Link href="/dashboard/clients/add">
          <button className={styles.addButton}>
            <FiPlus /> Add New Client
          </button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Phone</td>
            <td>Insurance Company</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client) => (
            <tr key={client.id} className={styles.tableRow}>
              <td>
                <div className={styles.user}>
                  <div className={styles.userName}>{client.name}</div>
                </div>
              </td>
              <td>{client.email}</td>
              <td>{client.createdAt?.toString().slice(4, 16)}</td>
              <td>{client.phone}</td>
              <td>{client.insuranceData[0]?.company || 'N/A'}</td>
              <td>
                <div className={styles.actionButtons}>
                  <Link href={`/dashboard/clients/${client.id}`}>
                    <button className={`${styles.button} ${styles.viewButton}`}>
                      <FiEye /> View
                    </button>
                  </Link>
                  <form action={deleteClient}>
                    <DeleteButtonWithModal id={client.id} text={"client"} />
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

export default ClientsPage;
