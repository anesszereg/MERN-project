const mongoose = require("mongoose");



mongoose
    .connect("mongodb://localhost:27017/MERN-PROJECT" ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false

    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("failed to connect to  mongo db",err));


