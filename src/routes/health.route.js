import express from "express";
const router = express.Router();

router.route.get("/ping", (req, res) => {
  res.status(200).send("Pong!");
});

export default router;