var mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/my-app`, (err, client) => {
  console.log("here in mongo");
  if (err) {
    console.log("error in connecting to db");
  } else {
    if (client) {
      console.log("success in connecting to db my-app");
    }
  }
});
