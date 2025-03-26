import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import connectDB from "./lib/connectDB.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const app = express();
app.use(clerkMiddleware());

app.use("/webhooks", webhookRouter);

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.get("/protect", requireAuth(), (req, res) => {
  const {userId} = req.auth;

  if(!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  res.status(200).json({
    message: "Protected route",
    userId
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3000, async () => {
  await connectDB();
  console.log("Server running on port 3000");
});
