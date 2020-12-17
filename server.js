const express = require("express");
var multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./public/photo-gallery",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

const port = 3000;

var app = express();
let images = require("./images.json");

app.use(express.json());

app.use(express.static("public"));

app.post("/images", upload.single("photo"), (req, res, next) => {
  console.log(req.file);
  console.log(req.body.caption);
  const newImage = {
    imageFileName: req.file.filename,
    caption: req.body.caption,
  };
  images.push(newImage);
  fs.writeFileSync("./images.json", JSON.stringify(images, null, 2));
  res.redirect("gallery.html");
});

app.get("/images", (req, res) => {
  res.json(images);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
