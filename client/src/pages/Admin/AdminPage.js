import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './AdminPage.css'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({ name: '', email: '', type:'' });
  const selectedUserIdRef = useRef(null);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userInfo.isAdmin) {
      if(userInfo.isStaff){
      navigate("/staff");}
      else{
      navigate("/");}
    } 
  }, [userInfo, navigate]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://ezlish-server.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleColumnSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    selectedUserIdRef.current = user._id;
    setUpdatedInfo({ name: user.name, email: user.email, type: user.type, balance: user.balance });
  };

  const handleInputChange = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };

  const updateUser = (e) => {
    e.preventDefault();
    const userId = selectedUserIdRef.current;
    
    if (!userId) {
      // No user selected, handle the error
      return;
    }
    
    axios
      .put(`https://ezlish-server.onrender.com/api/users/${userId}`, updatedInfo)
      .then((response) => {
        // Handle the response if the update is successful
        console.log('User updated:', response.data);
      fetchUsers(); // Refetch the user data to reflect the changes
      setSelectedUser(null); // Clear the selected user
      })
      .catch((error) => {
        // Handle errors if the update fails
      });
  };



  const deleteUser = (e) => {
    e.preventDefault();
    const userId = selectedUserIdRef.current;
  
    if (!userId) {
      // No user selected, handle the error
      return;
    }
  
    axios
      .delete(`https://ezlish-server.onrender.com/api/users/${userId}`)
      .then((response) => {
        // Handle the response if the delete is successful
        console.log('User deleted:', response.data);
        fetchUsers(); // Refetch the user data to reflect the changes
        setSelectedUser(null); // Clear the selected user
      })
      .catch((error) => {
        // Handle errors if the delete fails
      });
  };
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Users table</h4>
                <div className="table-responsive">
                  <table className="table table-bordered"style={{ tableLayout: 'fixed' }}>
                    <thead>
                      <tr>
                        <th
                          className="text-center"
                          style={{ width: '5vw' }}
                          onClick={() => handleColumnSort('id')}
                        >
                          #
                        </th>
                        <th
                          onClick={() => handleColumnSort('name')}
                          style={{ width: '25vw' }}
                          className={sortConfig.key === 'name' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          Name
                        </th>
                        <th
                          onClick={() => handleColumnSort('email')}
                          
                          className={sortConfig.key === 'email' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          Email
                        </th>
                        <th
                          onClick={() => handleColumnSort('balance')}
                          style={{ width: '10vw' }}
                          className={sortConfig.key === 'balance' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          balance
                        </th>
                        <th
                          onClick={() => handleColumnSort('type')}
                          style={{ width: '8vw' }}
                          className={sortConfig.key === 'type' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user, index) => (
                        <tr key={index + 1 + indexOfFirstUser} className={selectedUser && selectedUser.id === user.id ? 'selected' : ''}  onClick={() => handleUserClick(user)}>
                          <td className="text-center">{index + 1 + indexOfFirstUser}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.balance}</td>
                          <td>{user.type}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedUser && (
        <div>
        <h4>Edit User</h4>
        <form>
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              value={updatedInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="text"
              class="form-control"
              id="email"
              name="email"
              value={updatedInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="type">balance:</label>
            <input
              type="number"
              class="form-control"
              id="balance"
              name="balance"
              value={updatedInfo.balance}
              onChange={handleInputChange}
            />
          </div>
          <div class="form-group">
            <label for="type">Type:</label>
            <input
              type="text"
              class="form-control"
              id="type"
              name="type"
              value={updatedInfo.type}
              onChange={handleInputChange}
            />
          </div>
          <button class="btn btn-outline-primary" onClick={updateUser}>Update User</button>
          <button class="btn btn-outline-danger" onClick={deleteUser}>Delete User</button>
        </form>
      </div>
      
      )}
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="form-group mb-0">
                    <span>Rows per page: </span>
                    <select 
                      value={usersPerPage}
                      onChange={(e) => {
                        setCurrentPage(1);
                        setSortConfig({ key: ' ', direction: ' ' });
                        setUsersPerPage(parseInt(e.target.value));
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>
                  </div>
                  <div className="page-range">
                    {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, sortedUsers.length)} of {sortedUsers.length}
                  </div>
                  <div className="page-buttons">
                    <button className="btn btn-lg" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <MdNavigateBefore />
                    </button>
                    <button className="btn btn-lg" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <MdNavigateNext />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;