import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import { useParams } from "react-router";
import useMutation from "../api/useMutation";
import RoutineSetForm from "./RoutineSetForm";
import RoutineSet from "./RoutineSet";

export default function Routine() {
  // activity lower case is a prop/ =(piece of information you pass down the tree) each one of these is a child of the actitives page.
  const { token } = useAuth();
  let params = useParams();

  const {
    mutate,
    data: mutateData,
    loading,
    error: mutateError,
  } = useMutation("DELETE", `/routines/${params.id}`);

  const handleDeleteRoutine = async () => {
    await mutate([]);
    console.log(mutateData, loading, mutateError);
  };

  const { data } = useQuery(`/routines/${params.id}`);
  console.log(data);

  const renderSets = () => {
    if (!data?.sets?.length) {
      return (
        <div>
          <p>Make a new set loser</p>
        </div>
      );
    }
    return data.sets.map((set) => {
      return (
        <div key={set.id}>
          <RoutineSet set={set} />
        </div>
      );
    });
  };

  return (
    <>
      {data && (
        <li style={{ display: "flex", flexDirection: "column" }}>
          <span>{data.name}</span>
          <span>{data.goal}</span>
          <span>{data.creatorName}</span>
          <div>{renderSets()}</div>

          {token && (
            <button onClick={() => handleDeleteRoutine(params.id)}>
              Delete{" "}
            </button>
          )}

          {mutateError && <p>error deleting routine</p>}
        </li>
      )}
      {token && <RoutineSetForm />}
    </>
  );
}
