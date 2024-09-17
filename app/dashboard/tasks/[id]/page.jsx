// app/ui/dashboard/tasks/singleTask/SingleTaskPage.jsx
import { fetchSingleTask } from "@/app/lib/data";
import SingleTaskForm from "@/app/ui/dashboard/tasks/singleTask/singleTaskForm";

const SingleTaskPage = async ({ params }) => {
  const { id } = params;
  const task = await fetchSingleTask(id);

  return (
    <div>
      <SingleTaskForm task={task} />
    </div>
  );
};

export default SingleTaskPage;
