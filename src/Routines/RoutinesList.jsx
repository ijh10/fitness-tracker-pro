import useQuery from "../api/useQuery";
import { useNavigate } from "react-router";

/** Shows a list of activities. */
export default function RoutinesList() {
  const { data: routines, loading, error } = useQuery("/routines", "rountine");

  if (loading || !routines) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  console.log(routines);
  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

/** Shows a single activity. Logged-in users will also see a delete button. */
function RoutineListItem({ routine }) {
  //const {
  //mutate: deleteActivity,
  //loading,
  // error,
  //} = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);
  let navigate = useNavigate();
  return (
    <li>
      <p>{routine.name}</p>
      <p onClick={() => navigate(`/routines/${routine.id}`)}>view Routine</p>
    </li>
  );
}
