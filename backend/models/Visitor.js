const db = require("./db-connections/Lostie-db");

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


VisitorSchema.statics.createVisitor = function (ip) {
  return this.create(ip);
};


VisitorSchema.statics.getAllVisitors = function () {
  return this.find({}).sort({_id: -1}).exec();
};

VisitorSchema.statics.isAlertNeeded = function (ip) {
  return this.find({ip: ip, "createdAt": { $gt: new Date(Date.now() - 60*60 * 1000) } })
}


exports.VisitorModel = db.connection.model("Visitor", VisitorSchema);
