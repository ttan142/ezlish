import React, { useState, useEffect } from 'react';
import CourseItem from "../../components/CourseItem/CourseItem";
import { Link } from "react-router-dom";
import axios from 'axios';

function Course() {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/courses`)
      .then(
        (response) => {
          console.log(response);
          setCourses(response.data);
        },
        (error) => {
          console.log(error);
        }
      )
    setLoading(false);
  }, []);

  if (loading){
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    )
  }

  return (
    <>
      <div className="container-fluid bg-primary py-5 mb-5 page-header">
          <div className="container py-5">
              <div className="row justify-content-center">
                  <div className="col-lg-10 text-center">
                      <h1 className="display-3 text-white animated slideInDown">Courses</h1>
                      <nav aria-label="breadcrumb">
                          <ol className="breadcrumb justify-content-center">
                              <li className="breadcrumb-item"><Link className="text-white" to={`/`}>Home</Link></li>
                              <li className="breadcrumb-item text-white active" aria-current="page">Courses</li>
                          </ol>
                      </nav>
                  </div>
              </div>
          </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 class="section-title bg-white text-center text-primary px-3">Courses</h6>
            <h1 class="mb-5">Popular courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {courses.map(course => (
              <CourseItem key={course._id} course={ course }/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Course