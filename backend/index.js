const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const testRoute = require("./routes/testRoutes");
const userRoute = require("./routes/userRoutes");
const resultRoute = require("./routes/resultRoutes");
const questionRoute = require("./routes/questionRoutes");
const commentRoute = require("./routes/commentRoutes");
const courseRoute = require("./routes/courseRoutes");
const flashcardRoute = require("./routes/flashcardRoutes")
const postsRoute = require("./routes/postsRoutes");
const Comment = require("./models/commentModel");
const examRoute = require("./routes/examRoutes")

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
/*
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);  */
app.use(
  cors({
    origin: [
      "https://ezlish-i9mc.onrender.com",
      "http://localhost:3000",
      "https://ezlish-soict-hust.onrender.com",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);




app.use(express.json());
app.use("/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/refreshToken", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/flashcard", flashcardRoute);
app.use("/api/posts", postsRoute);
app.use("/api/results", resultRoute);
app.use("/api/exams", examRoute);
app.use("/api/comments", commentRoute);

app.use("/api/courses", courseRoute);

const http = require("http").createServer(app);
const io = require("socket.io")(http,{cors: {origin: "*"}});

// Soketio
let users = [];

io.on("connection", (socket) => {
  console.log(socket.id + " connected.");

  socket.on("joinRoom", (testId) => {
    const user = { userId: socket.id, room: testId };

    const check = users.every((user) => user.userId !== socket.id);

    if (check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((user) => {
        if (user.userId === socket.id) {
          if (user.room !== testId) {
            socket.leave(user.room);
            socket.join(testId);
            user.room = testId;
          }
        }
      });
    }

    // console.log(users)
    // console.log(socket.adapter.rooms)
  });

  socket.on("createComment", async (msg) => {
    const { testId, commentText, username, createdAt, send } = msg;

    const newComment = new Comment({
      testId,
      commentText,
      username,
      createdAt,
    });

    if (send === "replyComment") {
      const { testId, commentText, username, createdAt } = newComment;

      const comment = await Comment.findById(testId);

      if (comment) {
        comment.childComments.push({
          testId,
          commentText,
          username,
          createdAt,
        });

        await comment.save();
        io.to(comment.testId).emit("sendReplyCommentToClient", comment);
      }
    } else {
      await newComment.save();
      io.to(newComment.testId).emit("sendCommentToClient", newComment);
    }
  });

  socket.on("disconnect", () => {
    // console.log(socket.id + ' disconnected.')
    users = users.filter((user) => user.userId !== socket.id);
  });
});

http.listen("5000", () => {
  console.log("Server is running!");
});
