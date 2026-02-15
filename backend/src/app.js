import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("App.js connected successfully 🚀");
});

export default app;
