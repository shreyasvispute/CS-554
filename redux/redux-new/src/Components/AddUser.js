import { useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../actions';
const AddUser = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: '', email: '' });
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addUser = () => {
    dispatch(actions.addUser(data.name, data.email));
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
  };
  return (
    <div className="add">
      <div className="input-selection">
        <label>
          Name:
          <input
            onChange={(e) => handleChange(e)}
            id="name"
            name="name"
            placeholder="Name...."
          />
        </label>
      </div>
      <div className="input-selection">
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => handleChange(e)}
            id="email"
            name="email"
            placeholder="Email...."
          />
        </label>
      </div>
      <button onClick={addUser}>Add user</button>
    </div>
  );
};

export default AddUser;
