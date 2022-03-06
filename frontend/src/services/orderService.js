import httpService from './httpService';

export default {
    createOrder,
    updateOrder,
    getOrderById,
    removeOrder,
    getAllOrders,
    getUserOrders,
    getOrderByIdForScan,
};

async function createOrder(orderObj) {
    return await httpService.post('order', orderObj);
}
function updateOrder(orderObj) {
    return httpService.put(`order/edit/${orderObj._id}`, orderObj);
}

function getOrderById(orderId) {
    return httpService.get(`order/${orderId}`);
}
function getOrderByIdForScan(orderId) {
    return httpService.get(`order/scan/${orderId}`);
}

function getUserOrders(userId) {
    return httpService.get(`order/user/${userId}`);
}

function removeOrder(orderId) {
    return httpService.delete(`order/${orderId}`);
}

function getAllOrders() {
    return httpService.get('order');
}
