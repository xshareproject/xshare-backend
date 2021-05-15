import express from "express";
import { createUser } from "../db/user_db";

const router = express.Router();

router.post("/", (req: express.Request, res: express.Response) => {
  createUser(req.body)
    .then((result: string) => {
      res.status(200).send(result);
    })
    .catch((error: Error) => {
      res.status(500).send(error.message);
    });
});

export const userRoute = router;
