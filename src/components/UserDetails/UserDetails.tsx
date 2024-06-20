import { FC } from "react";

type UserDetailsProps = {
    username: string,
    email: string,
    approved: boolean,
    onApprove: () => void,
    onReprove: () => void
  };

const UserDetails: FC<UserDetailsProps> = ({ username, email, approved, onApprove, onReprove }) => {

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">{username}</h2>
      <p className="text-gray-700">{email}</p>
      <p className={approved ? "text-green-500" : "text-red-500"}>
        {approved ? "Approved" : "Not Approved"}
      </p>
      <div className="mt-4">
        <button onClick={onApprove} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Approve
        </button>
        <button onClick={onReprove} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Reprove
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
