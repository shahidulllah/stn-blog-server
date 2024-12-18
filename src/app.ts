import express from "express";

const app = express();


app.get("/", (req, res) => {
  res.send("Hello, Welcome to the STN blog Server!");
});

export default app;
