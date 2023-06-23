const express = require("express");

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const { log } = require("console");

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();


router.post("/resume", (req, res) => {
  const { file } = req.files;
  console.log(file);
  const type = file.mimetype.split("/")[1]
  console.log(type);
  if (type !== "pdf") {
    res.status(400).json({
      message: "Invalid format",
    });
  }
  else {
    const filename = `${uuidv4()}.${type}`;
    const path = `${__dirname}/../public/resume/${filename}`
    console.log(path);

    file.mv(path, (err) => {
      if (err) {
        res.status(400).json({
          message: "Error while uploading",
        });
      }
    })
    res.send({
      message: "File uploaded successfully",
      url: `/host/resume/${filename}`,
    });
    // const { file } = req.files;

  };
})
router.post("/profile", (req, res) => {

  const { file } = req.files;
  console.log(file);
  const type = file.mimetype.split("/")[1]
  console.log(type);
  if (type !== "png" && type !== "jpg") {
    res.status(400).json({
      message: "Invalid format",
    });
  }
  else {
    const filename = `${uuidv4()}.${type}`;
    const path = `${__dirname}/../public/profile/${filename}`
    console.log(path);

    file.mv(path, (err) => {
      if (err) {
        res.status(400).json({
          message: "Error while uploading",
        });
      }
    })
    res.send({
      message: "Profile image uploaded successfully",
      url: `/host/profile/${filename}`,
    });
    // pipeline(
    //   file.stream,
    //   fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
    // )
    //   .then(() => {
    //     res.send({
    //       message: "Profile image uploaded successfully",
    //       url: `/host/profile/${filename}`,
    //     });
    //   })
    //   .catch((err) => {
    //     res.status(400).json({
    //       message: "Error while uploading",
    //     });
    //   });
  }
  // if (
  //   file.detectedFileExtension != ".jpg" &&
  //   file.detectedFileExtension != ".png"
  // ) {
  //   res.status(400).json({
  //     message: "Invalid format",
  //   });
  // } else {
  //   const filename = `${uuidv4()}${file.detectedFileExtension}`;

  //   pipeline(
  //     file.stream,
  //     fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
  //   )
  //     .then(() => {
  //       res.send({
  //         message: "Profile image uploaded successfully",
  //         url: `/host/profile/${filename}`,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         message: "Error while uploading",
  //       });
  //     });
  // }
});

module.exports = router;






