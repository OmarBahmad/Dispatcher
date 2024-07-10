import { fetchSingleClient } from "@/app/lib/data";
import SingleClient from "@/app/ui/dashboard/clients/singleClient/singleClient";
import styles from "@/app/ui/dashboard/clients/singleClient/singleClient.module.css";

const SingleClientPage = async ({ params }) => {
  const { id } = params;
  const client = await fetchSingleClient(id);
  const cleanClient = JSON.parse(client);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{client.name}</div>
      
      {<SingleClient client={cleanClient} id={id} />}
    </div>
  );
};

export default SingleClientPage;