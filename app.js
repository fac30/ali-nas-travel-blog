import dotenv from "dotenv";
dotenv.config();

import express from "express";
import expressLayout from "express-ejs-layouts";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import connectDB from "./server/config/db.js";
import mainRoutes from "./server/routers/main.js";
import adminRoutes from "./server/routers/admin.js";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.static("uploads"));

app.use(expressLayout);

connectDB();

app.set("layout", "./layouts/main");

app.use("/", mainRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
