import React, { useState } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";

// Redux: Initial State
const initialState = {
  users: [],
  roles: [],
};

// Redux: Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "DELETE_USER":
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
    case "ADD_ROLE":
      return { ...state, roles: [...state.roles, action.payload] };
    case "DELETE_ROLE":
      return { ...state, roles: state.roles.filter((role) => role.id !== action.payload) };
    default:
      return state;
  }
};

// Redux: Store
const store = createStore(reducer);

// React Components
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Role-Based Access Control (RBAC) System</h1>
        <UserManagement />
        <RoleManagement />
      </div>
    </Provider>
  );
}

// User Management Component
const UserManagement = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const users = useSelector((state) => state.users);
  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  const addUser = () => {
    if (username && role) {
      dispatch({
        type: "ADD_USER",
        payload: { id: Date.now(), username, role },
      });
      setUsername("");
      setRole("");
    }
  };

  const deleteUser = (id) => {
    dispatch({ type: "DELETE_USER", payload: id });
  };

  return (
    <div className="management-section">
      <h2>User Management</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role (Add from below option)</option>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
        <button onClick={addUser}>Add User</button>
      </div>
      <div className="list">
        {users.map((user) => (
          <div key={user.id} className="list-item">
            {user.username} - {user.role}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Role Management Component
const RoleManagement = () => {
  const [roleName, setRoleName] = useState("");
  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  const addRole = () => {
    if (roleName) {
      dispatch({
        type: "ADD_ROLE",
        payload: { id: Date.now(), name: roleName },
      });
      setRoleName("");
    }
  };

  const deleteRole = (id) => {
    dispatch({ type: "DELETE_ROLE", payload: id });
  };

  return (
    <div className="management-section">
      <h2>Role Management</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <button onClick={addRole}>Add Role</button>
      </div>
      <div className="list">
        {roles.map((role) => (
          <div key={role.id} className="list-item">
            {role.name}
            <button onClick={() => deleteRole(role.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
