/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import "./post.css"
import { Link } from 'react-router-dom'

export default function Post({post}) {
  return (
    <div className="post">
        <img 
        className="postImg"
        src= {post.image}
        />
        <div className='postInfo'>
        {/* <Link to={`/toeictips/${props.posts._id}`}> */}
            <div>
            <span className='postCat'>{post.categories}</span>
            </div>
            <span className='postTitle'>
            {post.title}
            </span>
            <hr/>
            <span className='postDate'>{post.createAt}</span>
            <div className='postDesc'>
            {post.content}
            </div>
            <Link to={`/toeictips/${post._id}`}>
              Read more
            </Link>
           
        </div> 
    </div>
  )
}
