


import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users.jsx"
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const Dashboard = () => {


  const [balance , setBalance] = useState(0);

  useEffect(() => {  
    const fetchBalance = async () => {  
        try {  
            const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {  
                headers: {  
                    Authorization: "Bearer " + localStorage.getItem("token")  
                }  
            });  

            console.log("hi");

            console.log(response);
            setBalance(response.data.balance); // Assuming the response structure is correct  
        } catch (error) {  
            console.error("Error fetching balance:", error);  
        }  
    };  
    fetchBalance();  
}, []); // f

  
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users  balance ={balance} />
        </div>
    </div>
}

export default Dashboard;