import { Request, Router, Response } from "express";
import { body, query } from "express-validator";
import validate from "../middleware/validate.middleware";
import userModel from "../model/user.model";
import UserService from "../service/user.service";

const router = Router();

router.post(
  "/",
  body("name").isString().isLength({ min: 1 }).trim(),
  body("email").isEmail().normalizeEmail(),
  validate,
  async (req: Request, res: Response) => {
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(201).json({ message: "OK" });
  }
);

router.get(
  "/",
  query("page").default(0).isInt({ min: 0 }),
  async (req, res) => {
    const users = await UserService.getUsers(req.query?.page);
    res.json(users);
  }
);

router.get("/:id", async (req, res) => {
  const user = await UserService.getUser(req.params.id);
  if (!user) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(user);
  }
});

export default router;
