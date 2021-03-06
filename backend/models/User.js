const db = require("./db-connections/Lostie-db");
const Libs = require("../libs");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = db.mongoose.Schema;

const UserSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      uniqueCaseInsensitive: true,
      index: true,
    },
    tagIds:{
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Tags'
        }
      ],
      default: []
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    geocode: {
      type: {
        lat: {
          type: Number,
        },
        lng: {
          type: Number,
        },
        _id: false,
      },
      default: { lat: 32, lng: 34 },
    },
    type: {
      type: String,
      required: true,
      default: "customer",
      enum: ["admin", "customer"],
    },
  },
  {
    collection: "Users",
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

UserSchema.statics.addTag = async function (userId, tagId){
  return this.updateOne({_id: userId}, {
    $addToSet: {
      tagIds: tagId
    }
  })
}

// UserSchema.statics.getExistanceAndType = function (name) {
//     return this.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
// };

UserSchema.statics.getUserByEmail = function (email) {
  return this.findOne({ email: { $regex: `^${email}$`, $options: "i" } });
};

UserSchema.statics.createUser = function (userObj) {
  return this.create(userObj);
};

UserSchema.statics.getAllUsers = function () {
  return this.find({}, { password: 0 }).sort({ name: 1 }).exec();
};

UserSchema.statics.getFilteredUsers = function (filter) {
  if (filter)
    return this.find({ type: filter }, { password: 0 })
      .sort({ createdAt: -1 })
      .exec();
  return this.find({}, { password: 0 }).sort({ type: -1 }).exec();
};

UserSchema.statics.getById = function (userId) {
  return this.findById(userId);
};

UserSchema.statics.deleteUser = function (userId) {
  return this.deleteOne({ _id: userId });
};

UserSchema.statics.getUsersCount = function () {
  return this.countDocuments({});
};

UserSchema.statics.updateUser = function (userObj) {
  return this.findOneAndUpdate(
    { _id: userObj._id },
    {
      $set: {
        name: userObj.name,
        email: userObj.email,
        address: userObj.address,
        phoneNumber: userObj.phoneNumber,
      },
    },
    { new: true }
  );
};

exports.UserModel = db.connection.model("User", UserSchema);
