import React, { useEffect, useRef, useContext } from "react";
import { DataContext } from "../../GlobalState";

import axios from "axios";
import "./CommentCard.css";
import "./Comment.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
/* id:{
    id: string;
   childCommments: string[];
    commentText: string;
    isRootNode: boolean;
    parentNodeId: null;
}*/
import Loading from "../../img/loading.gif";
import FormInput from "./FormInput";
import CommentItem from "./CommentItem";

function CommentCard({ id }) {
  const globalState = useContext(DataContext);

  // socket
  const socket = globalState.socket;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageEnd = useRef();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/comments/${id}?limit=${page * 5}`)
      .then((res) => {
        setComments((r) => (r = res.data.comments));
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data.msg));
  }, [id, page]);

  //Realtime
  // Join room
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", id);
    }
  }, [socket, id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, []);

  // Reply Comments
  useEffect(() => {
    if (socket) {
      socket.on("sendReplyCommentToClient", (msg) => {
        const newArr = [...comments];

        newArr.forEach((cm) => {
          if (cm._id === msg._id) {
            cm.childComments = msg.childComments;
          }
        });

        setComments(newArr);
      });

      return () => socket.off("sendReplyCommentToClient");
    }
  }, [socket, comments]);

  return (
    <>
      <div className="detail_product_page">
        <div className="comments">
          <FormInput id={id} socket={socket} />
          <div className="comments_list">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                socket={socket}
              />
            ))}
          </div>
        </div>
        {loading && (
          <div className="loading">
            <img src={Loading} alt="" />
          </div>
        )}
        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load more
        </button>
      </div>
    </>
  );
}

export default CommentCard;
