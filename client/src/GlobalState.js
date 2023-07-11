// import React from "react";
// import { createContext, useState, useEffect } from "react";

// import io from "socket.io-client";

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const socket = io();
//     setSocket(socket);
//     return () => socket.close();
//   }, []);

//   const state = {
//     socket,
//   };

//   return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
// };

import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectSocket = () => {
      const socketInstance = io("https://ezlish-server.onrender.com");

      socketInstance.on("connect", () => {
        console.log("Socket connected");
      });

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      setSocket(socketInstance);
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);

  return <DataContext.Provider value={{ socket }}>{children}</DataContext.Provider>;
};
