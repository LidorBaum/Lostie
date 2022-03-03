import httpService from './httpService';

export default {
    addProduct,
    updateProduct,
    getProductById,
    removeProduct,
    getAllProducts,
    getUserProducts,
    getProductByIdForScan
};

async function addProduct(productObj) {
    return await httpService.post('product', productObj);
}
function updateProduct(productObj) {
    return httpService.put(`product/edit/${productObj._id}`, productObj);
}

function getProductById(productId) {
    return httpService.get(`product/${productId}`);
}
function getProductByIdForScan(productId) {
    return httpService.get(`product/scan/${productId}`);
}

function getUserProducts(userId){
    return httpService.get(`product/user/${userId}`)
}

function removeProduct(productId) {
    return httpService.delete(`product/${productId}`);
}

function getAllProducts() {
    return httpService.get('product');
}
