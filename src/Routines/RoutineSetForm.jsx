import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useParams, useNavigate } from "react-router";

export default function RoutineForm() {
  let params = useParams();
  let navigate = useNavigate();

  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const {
    mutate: add,
    loading: addLoading,
    error: addError,
  } = useMutation("POST", "/sets", ["sets"]);

  const addRoutine = (formData) => {
    const activity = formData.get("activity");
    const reps = formData.get("reps");
    console.log(activity, reps);
    add({ activityId: activity, routineId: params.id, count: reps });
    if (!addError) {
      navigate(0);

      // refresh the page
    }
  };
  const renderActivityOptions = () => {
    if (activities) {
      return activities.map((actitivity) => {
        return (
          <option key={actitivity.id} value={actitivity.id}>
            {actitivity.name}
          </option>
        );
      });
    }
  };

  return (
    <>
      <h2>Add a new set</h2>
      <form action={addRoutine}>
        <label>
          Activity
          <select name="activity" id="">
            {renderActivityOptions()}
          </select>
        </label>
        <label>
          Reps
          <input type="number" name="reps" />
        </label>
        <button>{addLoading ? "Adding..." : "Add set"}</button>
        {addError && <p>{addError}</p>}
      </form>
    </>
  );
}
