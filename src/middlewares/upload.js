const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    const filename =
      "" +
      Date.now() +
      Math.floor(Math.random() * 1e6) +
      "." +
      file.mimetype.split("/")[1];

    cb(null, filename);
  },
});

module.exports = multer({ storage });
