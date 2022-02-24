const db = require('./db-connections/Lostie-db');
const Libs = require('../libs');
var uniqueValidator = require('mongoose-unique-validator');

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
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            default: 'customer',
            enum: ['admin', 'customer'],
        },
    },
    {
        collection: 'Users',
        versionKey: false,
        timestamps: true,
    }
);

UserSchema.plugin(uniqueValidator, {
    message: 'Error, expected {PATH} to be unique.',
});

// UserSchema.statics.getExistanceAndType = function (name) {
//     return this.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
// };

UserSchema.statics.getUserByEmail = function(email){
    console.log(email);
    return this.findOne({email:{$regex: `^${email}$`, $options: 'i'}})
}

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

UserSchema.statics.updateUser = function (userObj) {
    return this.findOneAndUpdate(
        { _id: userObj._id },
        {
            $set: {
                name: userObj.name,
                image: userObj.image || undefined,
                type: userObj.type,
                password: userObj.password || undefined,
            },
        },
        { new: true }
    );
};

exports.UserModel = db.connection.model('User', UserSchema);
