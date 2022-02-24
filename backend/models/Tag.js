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

TagSchema.statics.updateTag = async function (tagObj) {
    return this.findOneAndUpdate(
        { _id: tagObj._id },
        {
            $set: {
                dogName: tagObj.dogName,
                breed: tagObj.breed,
                image: tagObj.image,
                gender: tagObj.gender,
                description: tagObj.description
            },
        },
        { new: true }
    );
};

TagSchema.statics.createTag = function (tagObj) {
    return this.create(tagObj);
};

TagSchema.statics.getUserTags = function (userId){
    return this.find({userId: userId}).exec()
}

TagSchema.statics.getAllTags = function () {
    return this.find({}).exec();
};

TagSchema.statics.getTagById = function (tagId) {
    return this.findById(tagId);
};

TagSchema.statics.deleteTag = function (tagId) {
    return this.deleteOne({ _id: tagId });
};

exports.TagModel = db.connection.model('Tag', TagSchema);
