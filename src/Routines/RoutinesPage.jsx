import RoutinesList from "./RoutinesList";
import { useAuth } from "../auth/AuthContext";

import RoutineForm from "./RoutineForm";

export default function ActivitiesPage() {
  const { token } = useAuth();
  return (
    <>
      <h1>Routines</h1>
      <RoutinesList />
      {token && <RoutineForm />}
    </>
  );
}
