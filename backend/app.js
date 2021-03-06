const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const { NotFoundError } = require("./utils/errors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const forumRoutes = require("./routes/forums");
const imageRoutes = require("./routes/images");
const security = require("./middleware/security");

const app = express();

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors());
// parse incoming requests with JSON payloads
app.use(express.json());
// log requests info
app.use(morgan("tiny"));
// for every request, check if a token exists
// in the authorization header
// if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt);
// Use routes after middleware
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/forum", forumRoutes);
app.use("/image", imageRoutes);

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});
module.exports = app;
