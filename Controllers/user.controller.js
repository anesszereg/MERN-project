const { json } = require("express/lib/response");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

//get all users

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-Password");
  res.status(200).json({ users });
};

//get user by id

module.exports.userInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown:" + err);
  }).select("-password");
};

// update user by id

module.exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
   const updateUser = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },)

      res.status(200).json({message:"user update successfully" ,updateUser });


      // (err, docs) => {
      //   if (!err) return res.send({ message: "user updated" });
      //   if (err) return res.status(500).send({ message: err });
      // }
    
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// delete user by id

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).send({ message: "user deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// follow user by id

module.exports.followUser = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow)
  )
     res.status(400).send("ID unknown:" + req.params.id);

  try {
    // add to the followers  list
    const followers= await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },)

      res.status(200).json({message:"user followers  is" ,followers });
    
  
    // add to the following  list
  //  const following = await UserModel.findByIdAndUpdate(
  //     req.body.idToFollow,
  //     { $addToSet: { followers: req.params.id } },
  //     { new: true, upsert: true },)

  //     res.status(200).json({message:"user follow successfully" ,following });
     
  } catch (err) {
     res.status(500).json({ message: err ,err});
  }
};







// unFollow user by id

module.exports.unFollowUser = async (req, res) => {
  if (
    !ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("ID unknown:" + req.params.id);

  try {
    // remove from the followers  list
    const unFollowUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true, },);

      res.status(200).json({message:"user unFollow successfully", unFollowUser });

    // // remove from the following  list
    // await UserModel.findByIdAndUpdate(
    //     req.body.idToUnFollow,
    //     { $pull: { followers: req.params.id } },
    //     { new: true, upsert: true,  },);
    //     res.status(200).json({message:"user unFollow successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};



