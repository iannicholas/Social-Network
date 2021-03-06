const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// schema to create the User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      trimmed: true,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
      required: [true, "Email is required"],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "friend" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual property to get the amount of friends a user has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// initializes the User model
const User = model("user", userSchema);

module.exports = User;
