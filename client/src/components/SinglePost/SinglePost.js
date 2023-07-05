import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import './SinglePost.css'

export default function SinglePost() {
    const { postsId } = useParams();
    const [post, setPost] = useState([]);
  
    console.log(postsId);
  
      useEffect(() => {
        axios
            .get(`http://localhost:5000/api/posts/${postsId}`)
            .then(
                (response) => {
                    console.log(response);
                    setPost(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);
  
    return (
      <div className='singlePost'>
          <div className="singlePostWrapper">
              <h1 className='singlePostTitle'>
                  {post.title}
              </h1>
              <img className='singlePostImg'
              src={post.image}
              alt=""
              />
              <div className="singlePostInfo">
                <span  className="singlePostAuthor">{post.author}</span>
                <span className="singlePostDate">{post.createAt}</span>
              </div>
              <div className="singlePostContent">
              {post.content}
              </div>
  
          </div>
      </div>
    )
  }
