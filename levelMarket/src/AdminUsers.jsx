import { useState, useEffect } from "react";
import Loading from './assets/Loading'
import UserAdminDetail from './UserAdminDetail'
import API_BASE from './config'

const AdminUsers = () =>{

  const [userList, setUserList] = useState(null);
const [isPending, setIsPending] = useState(true);
const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`${API_BASE}/admin/userList`, {credentials: 'include'})
      .then((res) => {
        if (!res.ok) {
          throw Error("Fetch failure");
        }
        return res.json();
      })
      .then((userList) => {
        setIsPending(false);
        setUserList(userList);
      })
      .catch((err) => 
      ( setIsPending(false),
        setError(err.message)));
  }, []);

  return (
    <div className="m-4 gap-10 sm:m-8 p-4 sm:p-8 grid grid-cols-1">
      {error && <div className="align-middle">{error}</div>}
      {isPending && <Loading/>}
      {userList && <UserAdminDetail users={userList}></UserAdminDetail>}
    </div>
  )
}

export default AdminUsers;
