import express from "express";
import ejs from "ejs";
import validator from "validator";
import Post from "../models/post.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { handleError } from "../../controller/errorController.js";
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

router.get("/", async (req, res) => {
  try {
    const data = await Post.find();
    const user = req.session.user || null;
    res.render("index", { data, user });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, passwordConfirmation } = req.body;

    // Validate input data
    const newUser = new User({
      username,
      email,
      password,
      passwordConfirmation,
    });
    await newUser.validate();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).redirect("/login");
  } catch (error) {
    handleError(res, error, "register");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Manual validation for email format
    if (!validator.isEmail(email)) {
      return res.render("login", {
        errors: ["Invalid email format"],
        user: {},
      });
    }

    // Manual validation for password presence
    if (!password) {
      return res.render("login", {
        errors: ["Please provide a password"],
        user: {},
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", { errors: ["Invalid user"], user: {} });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render("login", { errors: ["Invalid password"], user: {} });
    }

    req.session.user = user;
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    // Redirect based on user role
    if (user.role === "admin") {
      res.redirect(`/admin/dashboard`);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    handleError(res, error, "login", ["Internal server error"]);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/register", async (req, res) => {
  const errors = [];
  const user = [];
  res.render("register", { errors, user });
});

router.get("/login", async (req, res) => {
  const errors = [];
  const user = {};
  res.render("login", { errors, user });
});

router.post("/search", async (req, res) => {
  try {
    const user = req.session.user || null;
    let query = req.body.query;
    const searchNoSpecialChar = query.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("index", {
      data,
      user,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/post/:id", async (req, res) => {
  try {
    const user = req.session.user || null;
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    res.render("post", {
      data,
      user,
      currentRoute: `/post/${slug}`,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    console.log("Logout route accessed");
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.clearCookie("token");
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});
export default router;
