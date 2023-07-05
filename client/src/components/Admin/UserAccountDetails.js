import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAccountDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`/api/users/${user.id}`, user);
      // Show success message or perform necessary actions
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/users/${user.id}`);
      // Show success message or perform necessary actions
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Account Details</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <button onClick={updateUser}>Save</button>
        <button onClick={deleteUser}>Delete</button>
      </form>
    </div>
  );
};

export default UserAccountDetails;
