import express from "express";
import Post from "../models/post.js";
import User from "../models/user.js";
import fs from "fs";
import multer from "multer";
import path from "path";
import { OpenAI } from "openai";
import nodemailer from "nodemailer";

import { authMiddleware } from "../../controller/authController.js";
const router = express.Router();

const adminLayout = "../views/layouts/admin";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }).single("image");

router.get("/admin/dashboard", authMiddleware, async (req, res) => {
  try {
    const data = await Post.find();
    const user = await User.findOne();
    res.render("admin/dashboard", {
      data,
      layout: adminLayout,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/new-post", authMiddleware, upload, async (req, res) => {
  try {
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        image: req.file.filename,
      });

      await Post.create(newPost);
      const users = await User.find({}, "email");

      // Prepare email content
      const emailContent = {
        from: process.env.EMAIL_USER,
        subject: "ALi & Nas Blog",
        text: "A new post has been added. Visit the website to check it out!",
        html: "<p>A new post has been added. Visit the website to check it out!</p>",
      };

      // Configure nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Send email to each user
      for (const user of users) {
        emailContent.to = user.email;
        await transporter.sendMail(emailContent);
      }
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/new-post", authMiddleware, async (req, res) => {
  try {
    const user = [];
    const data = await Post.find();
    res.render("admin/new-post", {
      data,
      user,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/update/:id", authMiddleware, async (req, res) => {
  try {
    const user = [];
    const data = await Post.findOne({ _id: req.params.id });

    res.render("admin/update", {
      data,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:id", authMiddleware, upload, async (req, res) => {
  let new_image = "";
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("./uploads/" + req.body.old_image);
    } catch (error) {
      console.log(error);
    }
  } else {
    new_image = req.body.old_image;
  }
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      image: new_image,
      updatedAt: Date.now(),
    });

    res.redirect(`/admin/dashboard`);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
});

router.post("/generate", async (req, res) => {
  try {
    const subject = req.body.subject;

    const contentResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `Write content for a blog post about ${subject}:`,
        },
      ],
      max_tokens: 300,
      temperature: 0.5,
    });

    const content = contentResponse.choices[0].message.content.replace(
      /\n/g,
      "<br>"
    );

    res.json({ content });
  } catch (error) {
    console.error("Error generating OpenAI response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
