import React, { useEffect } from 'react'
import "./Test.css"
import { useLocation } from 'react-router-dom';
import Comments from "../../components/comments/Comments";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function generate() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};
const getNewComment = (commentValue, isRootNode = false, parentNodeId) => {
  return {
    id: generate(),
    commentText: commentValue,
    childCommments: [],
    isRootNode,
    parentNodeId,
  };
};

/* id:{
    id: string;
   childCommments: string[];
    commentText: string;
    isRootNode: boolean;
    parentNodeId: null;
}*/
const initialState = {
  "027d8fd9-b08c-4e07-9ac0-3523872d2d99": {
    childCommments: ["7017c441-84f9-4a9b-b252-e82cdbf34ceb"],
    commentText: "xin",
    id: "027d8fd9-b08c-4e07-9ac0-3523872d2d99",
    isRootNode: true,
    parentNodeId: null,
  },
  "7017c441-84f9-4a9b-b252-e82cdbf34ceb": {
    childCommments: [],
    commentText: "ko",
    id: "7017c441-84f9-4a9b-b252-e82cdbf34ceb",
    isRootNode: false,
    parentNodeId: "027d8fd9-b08c-4e07-9ac0-3523872d2d99",
  },
};



function Test() {
  const location = useLocation();
  const state = location.state;   /*   test data  table     */
  console.log(state);
  const history = useNavigate();

   


  const handleTest = async ()=>{
     const  {data} = await axios.get('http://localhost:5000/api/questions/'.concat(state._id));
    state.questions = data.answer
    state.parts = data.array
     history("/toeic", { state: state });
  }

   const [comments, setComments] = useState({});
   const [rootComment, setRootComment] = useState("");

   useEffect(()=>{
     axios
       .get(`http://localhost:5000/api/comments/?testId=`.concat(state._id))
       .then((res) => {
         console.log(res.data);
         setComments(res.data)
       });
   },[])


   




   const addComment = (parentId, newCommentText) => {
     let newComment = null;
     if (parentId) {
       newComment = getNewComment(newCommentText, false, parentId);
       setComments((comments) => ({
         ...comments,
         [parentId]: {
           ...comments[parentId],
           childCommments: [
             ...comments[parentId].childCommments,
             newComment.id,
           ],
         },
       }));
     } else {
       newComment = getNewComment(newCommentText, true, null);
     }
     setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
   };

   useEffect(() => {
     console.log(comments);
   }, [comments]);

   const commentMapper = (comment) => {
     return {
       ...comment,
       childCommments: (comment.childCommments||[])
         .map((id) => comments[id])
         .map((comment) => commentMapper(comment)),
     };
   };

   const enhancedComments = Object.values(comments)
     .filter((comment) => {
       return !comment.parentNodeId;
     })
     .map(commentMapper);

   const onAdd = () => {
     addComment(null, rootComment);
     setRootComment("");
   };
  return (
    <>
      <section>
        <div className="test">
          <div className="test-info">
            <h1>
              {state.name} Test {state.test}
            </h1>
            <div class="btn-group">
              <button id="group">Thong tin de thi</button>
              <button id="group">Dap an/Transcript</button>
            </div>
            <p>
              Thoi gian lam bai: {state.time} phut | {state.part} phan thi |{" "}
              {state.numberQuestion} cau hoi
            </p>
            <div></div>

            <div class="alert alert-warning" role="alert" id="alert">
              Sẵn sàng để bắt đầu làm full test? Để đạt được kết quả tốt nhất,
              bạn cần dành ra 120 phút cho bài test này.
            </div>

            <button
              type="button"
              class="btn btn-primary"
              id="button-start"
              onClick={handleTest}
            >
              Bat dau lam bai thi
            </button>
          </div>

          <div className="App">
            <header style={{ marginBottom: "2rem", fontSize: "2rem" }}>
              Nested Comment Example
            </header>
            <div className="comments-container">
              <input
                type="text"
                value={rootComment}
                onChange={(e) => setRootComment(e.target.value)}
                placeholder="add comment"
                style={{ width: "80%", marginRight: "1rem" }}
              />{" "}
              <button onClick={onAdd}>Add</button>
            </div>
            <div
              style={{
                border: "1px solid blue",
                margin: "auto",
                overflowX: "auto",
                padding: "2rem",
                
              }}
            >
              {enhancedComments.map((comment, key) => {
                return (
                  <Comment
                    key={key}
                    comment={comment}
                    addComment={addComment}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Test



const Comment = ({ comment, addComment }) => {
  const { commentText, childCommments, id } = comment;
  const [childComment, setChildComment] = useState("");
  const [show, setShow] = useState(true);
  const [showAddComponet, setShowAddComponet] = useState(false);
  const onAdd = () => {
    addComment(id, childComment);
    setChildComment("");
    setShowAddComponet(false);
  };
  return (
    <div className="Comment">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ textAlign: "left" }}>{commentText}</div>
        &nbsp;
        {childCommments.length > 0 && (
          <button onClick={() => setShow((show) => !show)}>
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      <div>
        <div>
          {showAddComponet ? (
            <>
              <input
                type="text"
                value={childComment}
                onChange={(e) => setChildComment(e.target.value)}
                placeholder="add comment"
              />{" "}
              <button onClick={onAdd}>Submit</button>
            </>
          ) : (
            <a
              style={{ cursor: "pointer", fontSize: "0.7rem", color: "blue" }}
              onClick={() => setShowAddComponet(true)}
            >
              Add a reply
            </a>
          )}
        </div>
      </div>
      {show &&
        childCommments.map((childCommentEl, key) => {
          return (
            <Comment
              key={key}
              comment={childCommentEl}
              addComment={addComment}
            />
          );
        })}
    </div>
  );
};





/*  Comment Version 
 <div className="comment">
        
          <Comments
            commentsUrl="http://localhost:3004/comments"
            currentUserId="1"
          />
      </div>
      
      */