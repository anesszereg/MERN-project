const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const { post } = require("../routes/user.routes");
const ObjectId = require("mongoose").Types.ObjectId;




// gat all posts of a user

module.exports.readPosts = async (req, res) => {
  const posts = await PostModel.find().sort({ createdAt: -1 });
  res.status(200).json( posts);
};



 // Create ea new post
module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    // posterId: req.body.posterId,
    message: req.body.message,
    picture:req.body.picture,
    location:req.body.location,
    name:req.body.name,
    video: req.body.video,
    likes: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    res.status(200).json({ message: "post created", post  });
  } catch (error) {
    res.status(400).json({ message: "failed to created new post ", error });
  }
};

// update post by id

module.exports.updatePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const updatePost = await PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
            // message: req.body.message,
            picture: req.body.picture,  
        },
        $set: {
            message: req.body.message,
            // picture: req.body.picture,  
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: "post updated", updatePost });
  } catch (error) {
    res.status(400).json({ message: "failed to update post ", error });
  }
};


// delete Post by id

module.exports.deletePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const deletePost = await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "post deleted", deletePost });
  } catch (error) {
    res.status(400).json({ message: "failed to delete post ", error });
  }
};


// like post by id


module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "invalid id" });
    }
    
    try {
        const likePost = await PostModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
        $addToSet: {
            likes: req.body.id,
            },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json({ message: "post liked", likePost });
    } catch (error) {
        res.status(400).json({ message: "failed to like post ", error });
    }
}


// add id to user likes array


module.exports.userLikes = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "invalid id" });
    }

    try {
        const userLikes = await UserModel.findByIdAndUpdate(
        { _id: req.body.id },
        {   
            $addToSet: {
            likes: req.params.id,
            },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json({ message: "user liked", userLikes });
    } catch (error) {
        res.status(400).json({ message: "failed to like user ", error });
    }
}


// unlike post by id


module.exports.unLikePost = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send({message: "invalid id"})
    }

    try{
        const unLikePost = await PostModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $pull: {
                    likes: req.body.id,
                },
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.status(200).json({message: "post unlike", unLikePost})

 
    }
    catch(error){
        res.status(400).json({message: "failed to unlike post", error})
    }
}

// pull likes from user


module.exports.userUnLikes = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send({message: "invalid id"})
    }

    try{
        const userUnLikes = await UserModel.findByIdAndUpdate(
            {_id: req.body.id},
            {
                $pull: {
                    likes: req.params.id,
                },
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.status(200).json({message: "user unliked", userUnLikes})

 
    }
    catch(error){
        res.status(400).json({message: "failed to unlike user", error})
    }
}

// add comment to post


module.exports.addComment = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send({message: "invalid id"})
    }

    try{
        const addComment = await PostModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $push: {
                    comments: {
                        commenterPseudo: req.body.commenterPseudo,
                        commenterId: req.body.commenterId,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.status(200).json({message: "comment added", addComment})

 
    }
    catch(error){
        res.status(400).json({message: "failed to add comment", error})
    }
}


// delete comment from post

module.exports.deleteComment = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send({message: "invalid id"})
    }

    try{
        const deleteComment = await PostModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $pull: {
                    comments: {
                        commenterPseudo: req.body.commenterPseudo,
                        commenterId: req.body.commenterId,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.status(200).json({message: "comment deleted", deleteComment})

 
    }
    catch(error){
        res.status(400).json({message: "failed to delete comment", error})
    }
}



// update comment 


module.exports.updateComment = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send({message: "invalid id"})
    }

    try{
        const updateComment = await PostModel.findByIdAndDelete(
            {_id: req.params.id},
            {
                $pull: {
                    comments: {
                        commenterPseudo: req.body.commenterPseudo,
                        commenterId: req.body.commenterId,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                        
                    },
                },
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.status(200).json({message: "comment updated", updateComment})

 
    }
    catch(error){
        res.status(400).json({message: "failed to update comment", error})
    }
}



// delete all comments from post

module.exports.deleteAllComments = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send({message: "invalid id"})
    }

    try{
        const deleteAllComments = await PostModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    comments: [],
                },
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.status(200).json({message: "all comments deleted", deleteAllComments})

 
    }
    catch(error){
        res.status(400).json({message: "failed to delete all comments", error})
    }
}
