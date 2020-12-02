import { useState } from 'react';
import User from './User';
import { useSelector } from 'react-redux';
import AddUser from './AddUser';
const Users = () => {
  const [add, setAdd] = useState(false);
  const allUsers = useSelector((state) => state.users);
  console.log('allUsers:', allUsers);
  return (
    <div className="todos-wrapper">
      <h2>Users</h2>
      <button onClick={() => setAdd(!add)}>Add User</button>
      <br />
      <br />
      <br />
      {add && <AddUser />}
      <br />

      {allUsers.map((user) => {
        console.log(user);
        return <User key={user.id} user={user} />;
      })}
    </div>
  );
};

export default Users;
