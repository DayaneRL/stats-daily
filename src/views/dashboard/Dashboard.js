import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect } from "react";
import db from "../../services/connection";
import { AuthContext } from "../../contexts/auth";

const Dashboard = () => {


  useEffect(()=>{
    async function fetchData() {
      const myUser = await getDocs(collection(db, "users"))
      
          console.log(myUser);
      
    }
    fetchData();
  },[]);

  return (
      <>
      <h1>Dashboard</h1>
      </>
  )
}

export default Dashboard