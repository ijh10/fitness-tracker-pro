import useMutation from "../api/useMutation";

export default function RoutineSet({ set }) {
  // activity lower case is a prop/ =(piece of information you pass down the tree) each one of these is a child of the actitives page.

  const {
    mutate: mutateSet,
    data: mutateSetData,
    error: mutateSetError,
  } = useMutation("DELETE", `/sets/${set.id}`);

  const deleteSet = async () => {
    await mutateSet([]);
    console.log(mutateSetData, mutateSetError);
  };

  return (
    <>
      <p>{set.name}</p>
      <p>{set.description}</p>
      <button onClick={() => deleteSet(set.id)}>Delete Set</button>
      {mutateSetError && <p>{mutateSetError}</p>}
    </>
  );
}
