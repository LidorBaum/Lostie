const db = require('./db-connections/Lostie-db');
const Libs = require('../libs');

const Schema = db.mongoose.Schema;

const OrderSchema = Schema(
    {
        status:{
            type: String,
            enum: ['Accepted', 'Preapering', 'Shipped', 'Delivered', 'Cancelled' ],
            default: 'Accepted'
        },
        userId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        tagId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Tag',
        }
    },
    {
        collection: 'Orders',
        versionKey: false,
        timestamps: true,
    }
);

OrderSchema.statics.updateOrder = async function (orderObj) {
    return this.findOneAndUpdate(
        { _id: orderObj._id },
        {
            $set: {
                status: orderObj.status,
            },
        },
        { new: true }
    );
};

OrderSchema.statics.createOrder = function (orderObj) {
    return this.create(orderObj);
};

OrderSchema.statics.getUserOrders = function (userId){
    return this.find({userId: userId}).exec()
}

OrderSchema.statics.getAllOrders = function () {
    return this.find({}).exec();
};

OrderSchema.statics.getOrderById = function (orderId) {
    return this.findById(orderId);
};

OrderSchema.statics.deleteOrder = function (orderId) {
    return this.deleteOne({ _id: orderId });
};

exports.OrderModel = db.connection.model('Order', OrderSchema);
