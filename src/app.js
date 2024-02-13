require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");

const limiter = require("./middlewares/rate-limit");
const error = require("./middlewares/error");
const notFound = require("./middlewares/notFound");

const app = express();

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoute);
app.use("/admin",adminRoute);
app.use(notFound);
app.use(error);

const port = process.env.PORT;
app.listen(port, () => console.log("server running on ", port));
