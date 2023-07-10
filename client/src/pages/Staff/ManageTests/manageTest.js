import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const CreateTestForm = () => {
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [tag, setTag] = useState('');
  const [part, setPart] = useState(0);
  const [time, setTime] = useState(0);
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [audio, setAudio] = useState('');
  const [testsEdit, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedTest, setSelectedTest] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({ name: '', tag: '', part: '', time: '', numberQuestion: '' });
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const navigate = useNavigate();

//edit test
useEffect(() => {
  fetchTests();
}, []);

const fetchTests = async () => {
  try {
    const response = await axios.get('https://ezlish-server.onrender.com/api/test');
    setTests(response.data);
  } catch (error) {
    console.error('Error fetching tests:', error);
  }
};

const handleColumnSort = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  setSortConfig({ key, direction });
};

const indexOfLastTest = currentPage * testsPerPage;
const indexOfFirstTest = indexOfLastTest - testsPerPage;

const sortedTests = [...testsEdit].sort((a, b) => {
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

const currentTests = sortedTests.slice(indexOfFirstTest, indexOfLastTest);

const totalPages = Math.ceil(sortedTests.length / testsPerPage);

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
};

const handleTestClick = (test) => {
  setSelectedTest(test);
  setUpdatedInfo({
    name: test.name,
    tag: test.tag,
    part: test.part,
    time: test.time,
    numberQuestion: test.numberQuestion,
  });
};

const handleInputChange = (e) => {
  setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
};

const updateTest = (e) => {
  e.preventDefault();
  if (!selectedTest) {
    // No test selected, handle the error
    return;
  }

  axios
    .put(`https://ezlish-server.onrender.com/api/test/${selectedTest._id}`, updatedInfo)
    .then((response) => {
      // Handle the response if the update is successful
      console.log('Test updated:', response.data);
      fetchTests(); // Refetch the test data to reflect the changes
      setSelectedTest(null); // Clear the selected test
    })
    .catch((error) => {
      // Handle errors if the update fails
    });
};

const deleteTest = (e) => {
  e.preventDefault();

  if (!selectedTest) {
    // No test selected, handle the error
    return;
  }

  axios
    .delete(`https://ezlish-server.onrender.com/api/test/${selectedTest._id}`)
    .then((response) => {
      // Handle the response if the delete is successful
      console.log('Test deleted:', response.data);
      fetchTests(); // Refetch the test data to reflect the changes
      setSelectedTest(null); // Clear the selected test
    })
    .catch((error) => {
      // Handle errors if the delete fails
    });
};
//edit test




  
  useEffect(() => {
    if (!userInfo.isStaff ) {
      if(!userInfo.isAdmin){
      navigate("/");}
      }
  }, [userInfo, navigate]);



  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the test object
    const newTest = {
      name,
      
      tag,
      part,
      time,
      numberQuestion,
      audio,
    };

    try {
      // Send a POST request to the server to create the test
      console.log(newTest);
      setShowToast(true);
      const res = await axios.post('https://ezlish-server.onrender.com/api/test', newTest);
     
      console.log(res.data); // Log the response from the server
      fetchTests();
      // Reset the form fields
      setName('');
      
      setTag('');
      setPart(0);
      setTime(0);
      setNumberQuestion(0);
      setAudio('');
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    {showForm && (<div className="container h-100 my-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
      <h1>Create Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="part" className="form-label">
            Part
          </label>
          <input
            type="number"
            className="form-control"
            id="part"
            value={part}
            onChange={(e) => setPart(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="number"
            className="form-control"
            id="time"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numberQuestion" className="form-label">
            Number of Questions
          </label>
          <input
            type="number"
            className="form-control"
            id="numberQuestion"
            value={numberQuestion}
            onChange={(e) => setNumberQuestion(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="audio" className="form-label">
            Audio
          </label>
          <input
            type="text"
            className="form-control"
            id="audio"
            value={audio}
            onChange={(e) => setAudio(e.target.value)}
          />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
  
    <button type="submit" className="btn btn-outline-primary btn-floating mr-3">
      Create
    </button>
    
  
    <button className="btn btn-outline-primary btn-floating mx-4" onClick={() => setShowForm(false)}>
      Close
    </button>
    
</div>

      </form>

       {/* Toast notification */}
       {showToast && (
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="2000"
          style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
        >
          <div className="toast-header">
            <strong className="mr-auto">Test {name} Created</strong>
            
          </div>
          <div className="toast-body" style={{backgroundColor: '#e6e6e6'}}>
            Test created successfully!
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>) }  {!showForm &&(
      <div className=" justify-content-center align-items-center text-center h-100 mt-3 mb-3 pb-3 pt-3">
        <button className="btn btn-outline-primary w-25" onClick={() => {setShowForm1(false);
          setShowForm(true)}}>
          Create Test
        </button>
        </div>
      )}

      {showForm1 && (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card" style={{ borderRadius: "25px" }}>
              <div className="card-body">
                <h4 className="card-title">Tests table</h4>
                <div className="table-responsive">
                  <table className="table table-bordered" style={{ tableLayout: 'fixed' }}>
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
                          onClick={() => handleColumnSort('tag')}
                          className={sortConfig.key === 'tag' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          Tag
                        </th>
                        <th
                          onClick={() => handleColumnSort('part')}
                          style={{ width: '8vw' }}
                          className={sortConfig.key === 'part' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          Part
                        </th>
                        <th
                          onClick={() => handleColumnSort('time')}
                          style={{ width: '8vw' }}
                          className={sortConfig.key === 'time' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          Time
                        </th>
                        <th
                          onClick={() => handleColumnSort('numberQuestion')}
                          style={{ width: '12vw' }}
                          className={sortConfig.key === 'numberQuestion' ? `sorted-${sortConfig.direction}` : ''}
                        >
                          Number of Questions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTests.map((test, index) => (
                        <tr
                          key={index + 1 + indexOfFirstTest}
                          className={selectedTest && selectedTest._id === test._id ? 'selected' : ''}
                          onClick={() => handleTestClick(test)}
                        >
                          <td className="text-center">{index + 1 + indexOfFirstTest}</td>
                          <td>{test.name}</td>
                          <td>{test.tag}</td>
                          <td>{test.part}</td>
                          <td>{test.time}</td>
                          <td>{test.numberQuestion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedTest && (
                    <div>
                      <h4>Edit Test</h4>
                      <form>
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={updatedInfo.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="tag">Tag:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            value={updatedInfo.tag}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="part">Part:</label>
                          <input
                            type="number"
                            className="form-control"
                            id="part"
                            name="part"
                            value={updatedInfo.part}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="time">Time:</label>
                          <input
                            type="number"
                            className="form-control"
                            id="time"
                            name="time"
                            value={updatedInfo.time}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="numberQuestion">Number of Questions:</label>
                          <input
                            type="number"
                            className="form-control"
                            id="numberQuestion"
                            name="numberQuestion"
                            value={updatedInfo.numberQuestion}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button className="btn btn-outline-primary" onClick={updateTest}>Update Test</button>
                        <button className="btn btn-outline-danger" onClick={deleteTest}>Delete Test</button>
                      </form>
                    </div>
                  )}
                </div>
                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="form-group mb-0">
                    <span>Tests per page: </span>
                    <select
                      value={testsPerPage}
                      onChange={(e) => {
                        setCurrentPage(1);
                        setSortConfig({ key: ' ', direction: ' ' });
                        setTestsPerPage(parseInt(e.target.value));
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>
                  </div>
                  <div className="page-range">
                    {indexOfFirstTest + 1}-{Math.min(indexOfLastTest, sortedTests.length)} of {sortedTests.length}
                  </div>
                  <div className="page-buttons">
                    <button className="btn btn-lg" onClick={handlePrevPage} disabled={currentPage === 1}>
                      <MdNavigateBefore />
                    </button>
                    <button className="btn btn-lg" onClick={handleNextPage} disabled={currentPage === totalPages}>
                      <MdNavigateNext />
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => setShowForm1(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ) }   {!showForm1&&(
      <div className=" justify-content-center align-items-center text-center h-100 mt-3 mb-3 pb-3 ">
        <button className="btn btn-outline-primary w-25" onClick={() => {setShowForm1(true);
        setShowForm(false)}}>
          Edit Tests
        </button>
        </div>
      )}
      </div>
  );
};

export default CreateTestForm;
