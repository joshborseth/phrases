import { trpc } from "src/utils/trpc";
import Loading from "./Loading";

const AllUsersList = () => {
  const { data, error, isLoading } = trpc.userRouter.getAllUsers.useQuery();
  return (
    <ul>
      {data &&
        data.map((user) => (
          <User key={user.id} id={user.id} name={user.name} role={user.role} />
        ))}
      {error && <p>{error.message}</p>}
      {isLoading && (
        <div className="flex w-screen justify-center">
          <Loading />
        </div>
      )}
    </ul>
  );
};

export default AllUsersList;

type userProps = { name: string | null; role: string; id: string };

const User = (props: userProps) => {
  const utils = trpc.useContext();
  const { mutate: promoteUser, isLoading } =
    trpc.userRouter.promoteUserToAdmin.useMutation({
      onSuccess: () => {
        utils.userRouter.getAllUsers.invalidate();
      },
    });
  return (
    <li className="relative mx-auto flex w-5/6 flex-col items-center justify-between gap-5 border-2 p-5 lg:w-1/2 lg:flex-row lg:p-10">
      <div className="flex gap-2">
        <p>{props.name ? props.name : "Anonymous User"}</p>
        <p>|</p>
        <p className="capitalize">{props.role.toLowerCase()}</p>
      </div>
      <button
        onClick={() => promoteUser({ userId: props.id })}
        disabled={props.role === "ADMIN"}
        className={`btn-success btn ${isLoading && "loading"}`}
      >
        promote
      </button>
    </li>
  );
};
