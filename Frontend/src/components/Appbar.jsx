import { Button } from "./Button";
import { useNavigate } from "react-router-dom";


export const Appbar = () => {

  const navigate  = useNavigate();

  return (
    <div className="shadow h-14 flex justify-between">
      <div className=" flex flex-col justify-center h-full ml-4">PayKaro</div>
      <div className="flex">
        
       

        <div className="mt-2 pr-3 ">
          <Button 
            label={"Logout"}
            onClick={() => {
              localStorage.removeItem("token");
             navigate("/signin")
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
