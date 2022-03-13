const db = require("./db-connections/Lostie-db");
const Libs = require("../libs");

const Schema = db.mongoose.Schema;

const VisitorSchema = Schema(
  {
    ip: {
      type: String,
    },
  },
  {
    collection: "Visitors",
    versionKey: false,
    timestamps: true,
  }
);

VisitorSchema.statics.getAllVisitors = function () {
  return this.find({
    _id: {
      $in: productsIds,
    },
  });
};

// ProductSchema.statics.updateProduct = async function (productObj) {
//   return this.findOneAndUpdate(
//     { _id: productObj._id },
//     {
//       $set: {},
//     },
//     { new: true }
//   );
// };

VisitorSchema.statics.createVisitor = function (ip) {
  return this.create(ip);
};


VisitorSchema.statics.getAllVisitors = function () {
  return this.find({}).sort({_id: -1}).exec();
};

// ProductSchema.statics.getProductById = function (productId) {
//   return this.findById(productId);
// };

// ProductSchema.statics.deleteProduct = function (productId) {
//   return this.deleteOne({ _id: productId });
// };

exports.VisitorModel = db.connection.model("Visitor", VisitorSchema);
