const db = require("./db-connections/Lostie-db");
const Libs = require("../libs");

const Schema = db.mongoose.Schema;

const ProductSchema = Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Tag", "Card"],
    },
  },
  {
    collection: "Products",
    versionKey: false,
    timestamps: true,
  }
);

ProductSchema.statics.getProductsByIds = async function (productsIds) {
  return this.find({
    _id: {
      $in: productsIds,
    },
  });
};

ProductSchema.statics.updateProduct = async function (productObj) {
  return this.findOneAndUpdate(
    { _id: productObj._id },
    {
      $set: {},
    },
    { new: true }
  );
};

ProductSchema.statics.createProduct = function (productObj) {
  return this.create(productObj);
};

ProductSchema.statics.getUserProducts = function (userId) {
  return this.find({ userId: userId }).exec();
};

ProductSchema.statics.getAllProducts = function () {
  return this.find({}).exec();
};

ProductSchema.statics.getProductById = function (productId) {
  return this.findById(productId);
};

ProductSchema.statics.deleteProduct = function (productId) {
  return this.deleteOne({ _id: productId });
};

exports.ProductModel = db.connection.model("Product", ProductSchema);
