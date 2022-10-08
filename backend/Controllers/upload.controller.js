const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


module.exports.uploadProfile = async (req, res) => {
  try {
    if (
      req.file.detectedMineType !== "image/jpeg" &&
      req.file.detectedMineType !== "image/png" &&
      req.file.detectedMineType !== "image/jpg"
    ) 
    //   throw Error(" invalid file type");
      res.status(400).json({ message: "err" })
      const fileName = req.file.name + ".jpg";
      await pipeline(
        req.file.stream,
        fs.createWriteStream(`
            ${__dirname}/../client/public/uploads/profile/${fileName}
            `)
      );
    
    // if (req.file.size > 500000)
    // res.status.(400).json({ message: "err" })
  } catch (err) {
    return res.status(400).json({ message: "error in file upload" , err});
  }

 
};
