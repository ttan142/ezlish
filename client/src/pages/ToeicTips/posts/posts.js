import React, { useState, useEffect } from 'react';
import Post from './post'
import "./posts.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import SinglePost from '../singlepost/singlepost';
import Sidebar from '../sidebar/sidebar';


export default function Posts() {
  //const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts`)
      .then(
        (response) => {
          console.log(response);
          setPosts(response.data);
        },
        (error) => {
          console.log(error);
        }
      )
  }, []);
  return (
    <div className="posts">
      {posts.map(posts => (
              <Post key={posts._id} post={ posts }/>
            ))}
    </div>
  )
}
