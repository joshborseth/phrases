import { trpc } from "src/utils/trpc";
import Loading from "./Loading";

const AllUsersList = () => {
  const { data, error, isLoading } = trpc.userRouter.getAllUsers.useQuery();
  return (
    <ul>
      {data &&
        data.map((user) => <User key={user.id} name={user.name} role={user.role} />)}
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

type userProps = { name: string | null; role: string };

const User = (props: userProps) => {
  return (
    <li className="relative mx-auto flex w-1/2 items-center justify-between gap-5 border-2 p-10">
      <div className="flex gap-2">
        <p>{props.name ? props.name : "Anonymous User"}</p>
        <p>|</p>
        <p className="capitalize">{props.role.toLowerCase()}</p>
      </div>
      <button disabled={props.role === "ADMIN"} className="btn-success btn">
        promote to admin
      </button>
    </li>
  );
};
