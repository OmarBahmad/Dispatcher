import { fetchSingleClient } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";
import SingleClientForm from "@/app/ui/dashboard/clients/singleClient/singleClientForm";

const SingleClientPage = async ({ params }) => {
  const { id } = params;
  const client = await fetchSingleClient(id);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{client.name}</div>
      {client && <SingleClientForm client={client} />}
    </div>
  );
};

export default SingleClientPage;