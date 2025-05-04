import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router";
import useMutation from "../api/useMutation";

export default function Activity() {
  // activity lower case is a prop/ =(piece of information you pass down the tree) each one of these is a child of the actitives page.
  const { token } = useAuth();
  let params = useParams();

  const {
    mutate,
    data: mutateData,
    loading,
    error: mutateError,
  } = useMutation("DELETE", `/activities/${params.id}`);
  const handleDeleteActivity = async () => {
    await mutate([]);
    console.log(mutateData, loading, mutateError);
  };

  const { data, error } = useQuery(`/activities/${params.id}`);
  console.log(data);
  return (
    <>
      {data && (
        <li>
          {data.name}
          {data.description}
          {data.creatorName}

          {token && (
            <button onClick={() => handleDeleteActivity(params.id)}>
              Delete{" "}
            </button>
          )}

          {mutateError && <p>error deleting activity</p>}
        </li>
      )}
    </>
  );
}
