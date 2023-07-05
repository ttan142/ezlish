import React from 'react'
import Posts from './posts/posts';
import Sidebar from './sidebar/sidebar';
import "./ToeicTips.css"
// TODO : tan
function ToeicTips() {
  return (
    <div className='tips'>
      <Posts />  
      <Sidebar />
    </div>
  );
}

export default ToeicTips;
