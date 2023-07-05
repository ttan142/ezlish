import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Message } from '../../components/shared';
import TokenService from "../../utils/tokenService"
import "./CourseDetails.css";
import axios from 'axios';

function numberWithCommas(x) {
    if (x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function RegisterButton(props){
    const [message, setMessage] = useState(null);

    if (props.user == null){
        return (
            <p>Please sign in with your account to register</p>
        )
    }

    const userId = props.user._id;
    const courseId = props.course._id;
    const studentList = props.course.students;
    
    const registerHandler = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/courses/enroll/${courseId}`, { "userId": userId })
            .catch((error) => { setMessage("There was an error registering this course. Please try again"); return; })
        setMessage("Course registered successfully");
        e.target.style.display = "none";
    };

    if (studentList && studentList.includes(userId)){
        return (
            <p>You have already registered for this course</p>
        )
    } else {
        return (
            <>
                {message && <Message variant="danger">{message}</Message>}
                <br></br>
                <div className="btn btn-primary" onClick={registerHandler}>Register</div>
            </>
        )
    }
}

function CourseDetails() {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState([]);
    
    const userInfo = TokenService.getuserInfo();

    console.log(courseId);
    console.log(userInfo);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/api/courses/${courseId}`)
            .then(
                (response) => {
                    console.log(response);
                    setCourse(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <section>
                <h2>Loading...</h2>
            </section>
        )
    }

    return (
        <>
            <section id="course-details" className="course-details">
                <div className="container" data-aos="fade-up">

                    <div className="row">
                        <div className="col-lg-8">
                            <img src={ course.image } className="img-fluid course-img" alt=""/>
                            <h3>Course description</h3>
                            <div dangerouslySetInnerHTML={{__html: course.description }}></div>
                        </div>
                        <div className="col-lg-4">

                            <div className="course-info d-flex justify-content-between align-items-center">
                                <h3>{ course.title }</h3>
                            </div>

                            <div className="course-info d-flex justify-content-between align-items-center">
                                <RegisterButton course={ course } user={ userInfo }/>
                            </div>                            

                            <div className="course-info d-flex justify-content-between align-items-center">
                                <h5>Lecturer/Organizer</h5>
                                <p>{ course.lecturer }</p>
                            </div>

                            <div className="course-info d-flex justify-content-between align-items-center">
                                <h5>Registration fee</h5>
                                <p>{ numberWithCommas(course.price) + " VND" }</p>
                            </div>

                            <div className="course-info d-flex justify-content-between align-items-center">
                                <h5>Duration</h5>
                                <p>{ course.duration }</p>
                            </div>

                            <div className="course-info d-flex justify-content-between align-items-center">
                                <h5>Number of lessons</h5>
                                <p>{ course.lessonNumber }</p>
                            </div>

                            <div className="course-info d-flex justify-content-between align-items-center">
                                <p>{ course.shortDescription }</p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    
    )
}

export default CourseDetails;