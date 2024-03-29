require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");
const userRoute = require("./routes/user-route");
const publicRoute = require("./routes/public-route");

const authenticate = require("./middlewares/authenticate");
const limiter = require("./middlewares/rate-limit");
const error = require("./middlewares/error");
const notFound = require("./middlewares/notFound");

const app = express();

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/public", express.static("public"));

app.use("/auth", authRoute);
app.use("/admin", authenticate, adminRoute);
app.use("/user", authenticate, userRoute);
app.use("/public", publicRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT;
app.listen(port, () => console.log("server running on ", port));
