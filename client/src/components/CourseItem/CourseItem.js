import React from 'react';
import './CourseItem.css';
import { Link } from "react-router-dom";

function numberWithCommas(x) {
    if (x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function CourseItem(props) {
    return (
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                    <img className="img-fluid" src={ props.course.image } alt=""/>
                    <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                        <Link to={`/courses/${props.course._id}`} className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: "30px 0 0 30px"}}>
                            Read More
                        </Link>
                    </div>
                </div>
                <div className="text-center p-4 pb-0">
                    <h3 className="mb-0">{ numberWithCommas(props.course.price) + " VND" }</h3>
                    <div className="mb-3">
                        { props.course.tag }
                    </div>
                    <h5 className="mb-4">{ props.course.title }</h5>
                </div>
                <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2"></i>{ props.course.lecturer }</small>
                    <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2"></i>{ props.course.duration }</small>
                    <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2"></i>{ props.course.lessonNumber + " lessons" }</small>
                </div>
                <div className="d-flex border-top p-3">{ props.course.shortDescription }</div>
            </div>
        </div>
    )
}

export default CourseItem;