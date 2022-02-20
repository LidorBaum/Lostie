const db = require('./db-connections/Lostie-db');
const Libs = require('../libs');

const Schema = db.mongoose.Schema;

const TagSchema = Schema(
    {
        dogName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        breed: {
            type: String,
        },
        gender: {
            type: String,
            enun: ['M', 'F']
        },
        description: {
            type: String,
            default: ''
        },
        userId:{
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        collection: 'Tags',
        versionKey: false,
        timestamps: true,
    }
);

// VaseSchema.statics.updateVase = async function (vaseObj) {
//     return this.findOneAndUpdate(
//         { _id: vaseObj._id },
//         {
//             $set: {
//                 name: vaseObj.name,
//                 type: vaseObj.type,
//                 image: vaseObj.image,
//                 sizes: vaseObj.sizes,
//             },
//         },
//         { new: true }
//     );
// };

TagSchema.statics.createTag = function (tagObj) {
    return this.create(tagObj);
};

// VaseSchema.statics.getAllVases = function () {
//     return this.find({}).exec();
// };

// VaseSchema.statics.deleteVase = function (vaseObj) {
//     return this.deleteOne({ _id: vaseObj });
// };

exports.TagModel = db.connection.model('Tag', TagSchema);
