import React, { useState, useEffect, useCallback } from "react";
import FormInput from "./FormInput";
import CommentC from "./CommentC";

let showComments = [];

function CommentItem({ comment, socket }) {
  const [reply, setReply] = useState(false);
  const [name, setName] = useState("");

  const [replyComment, setReplyComment] = useState([]);
  const [hideReplyComment, setHideReplyComment] = useState([]);
  const [next, setNext] = useState(3);
  const loadMore = () => {
    setNext(next + hideReplyComment);
  };

  useEffect(() => {
    const loopWithSlice = () => {
      let start =
        comment.childComments.length - next < 0
          ? 0
          : comment.childComments.length - next;

      showComments = comment.childComments.slice(
        start,
        comment.childComments.length
      );

      setHideReplyComment(start);
      setReplyComment(showComments);
    };

    loopWithSlice();
  }, [comment.childComments, next]);

  const handleReply = (username) => {
    setReply(true);
    setName(username);
  };

  const hideReply = () => {
    setReply(false);
    setNext(0);
  };
  return (
    <>
      <CommentC comment={comment}>
        <div className="nav_comment">
          <p onClick={() => handleReply(comment.username)}>Reply</p>
          {hideReplyComment > 0 && (
            <p onClick={loadMore}>Load more {hideReplyComment} comments</p>
          )}

          <p onClick={hideReply}>Hide Reply</p>
        </div>

        <div className="reply_comment">
          {replyComment.map((rep) => (
            <>
              <CommentC comment={rep} key={rep._id}>
                <div className="nav_comment">
                  <p onClick={() => handleReply(rep.username)}>Reply</p>
                </div>
              </CommentC>
            </>
          ))}
        </div>

        {reply && (
          <FormInput
            id={comment._id}
            socket={socket}
            name={name}
            setReply={setReply}
            send="replyComment"
          />
        )}
      </CommentC>
    </>
  );
}
export default CommentItem;
