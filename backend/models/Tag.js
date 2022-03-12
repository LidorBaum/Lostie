const db = require("./db-connections/Lostie-db");
const Libs = require("../libs");

const Schema = db.mongoose.Schema;

const TagSchema = Schema(
  {
    petName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending", "Lost"],
      default: "Pending",
    },
    image: {
      type: String,
    },
    breed: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    description: {
      type: String,
      default: "",
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    collection: "Tags",
    versionKey: false,
    timestamps: true,
  }
);

TagSchema.statics.updateTag = async function (tagObj) {
  return this.findOneAndUpdate(
    { _id: tagObj._id },
    {
      $set: {
        petName: tagObj.petName,
        breed: tagObj.breed,
        image: tagObj.image,
        gender: tagObj.gender,
        description: tagObj.description,
        status: tagObj.status,
      },
    },
    { new: true }
  );
};

TagSchema.statics.getTagsCount = function () {
  return this.countDocuments({});
};

TagSchema.statics.createTag = function (tagObj) {
  return this.create(tagObj);
};

TagSchema.statics.getUserTags = function (userId) {
  return this.find({ userId: userId }).exec();
};

TagSchema.statics.getAllTags = function () {
  return this.find({}).exec();
};

TagSchema.statics.getTagById = function (tagId) {
  return this.findById(tagId);
};

TagSchema.statics.deleteTag = function (tagId) {
  return this.deleteOne({ _id: tagId });
};

exports.TagModel = db.connection.model("Tag", TagSchema);
