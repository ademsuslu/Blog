const mongoose = require("mongoose");

// resim, yazı, etiket, baslık

const blogSchema = new mongoose.Schema(
  {
    user: {
      // hangi userin texti ise onu belirtiyor
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    image: {
      type: String,
      require: [true, "Please add an image"],
    },
    tag: {
      type: String,
      require: [true, "Please add a tag value"],
    },
    title: {
      type: String,
      require: [true, "Please add a title value"],
    },
    desc: {
      type: String,
      require: [true, "Please add a tag value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
