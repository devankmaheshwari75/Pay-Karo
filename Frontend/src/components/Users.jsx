import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

export const Users = ({ balance }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/bulk?filter=` + filter , {
        headers: {  
          Authorization: "Bearer " + localStorage.getItem("token")  
      }  
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          // Providing a unique key prop here

          <User balance={balance} key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user , balance }) {
  const navigate = useNavigate();
  console.log("below is the user");
  console.log(user);

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          {" "}
          {/* Corrected "h-ful" to "h-full" */}
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {

            console.log()
            navigate(
              "/send?id=" +
                user._id +
                "&name=" +
                user.firstName +
                "&balance=" + // Ensure this is included
                balance // Make sure that `user.balance` is defined
            );
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
