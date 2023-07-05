import React, { useRef, useEffect } from "react";
import "./FormInput.css";

import TokenService from "../../utils/tokenService";
function FormInput({ id, socket, setReply, send, name }) {
  const nameRef = useRef(); //userName
  const contentRef = useRef();

  useEffect(() => {
    if (name) {
      contentRef.current.innerHTML = `
                <a href="#!"
                    style="color: crimson;
                    font-weight: 600;
                    text-transform: capitalize;"
                >${name}: </a>
            `;
    }
  }, [name]);

  const commentSubmit = () => {
    const content = contentRef.current.innerHTML;

    const createdAt = new Date().toISOString();
    console.log(createdAt);
    socket.emit("createComment", {
      testId: id,
      commentText: contentRef.current.innerHTML,
      username: TokenService.getuserInfo().name,
      createdAt,
      send,
    });

    contentRef.current.innerHTML = "";

    if (setReply) setReply(false);
  };

  return (
    <div className="form_input">
      <h1>Comment</h1>
      <div
        ref={contentRef}
        contentEditable="true"
        style={{
          height: "100px",
          border: "1px solid #ccc",
          padding: "5px 10px",
          outline: "none",
        }}
      />

      <button onClick={commentSubmit}>Send</button>
    </div>
  );
}

export default FormInput;
