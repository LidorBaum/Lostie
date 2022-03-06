import httpService from './httpService';

export default {
    addTag,
    updateTag,
    getTagById,
    removeTag,
    getAllTags,
    getUserTags,
    getTagByIdForScan,
};

async function addTag(tagObj) {
    return await httpService.post('tag', tagObj);
}
function updateTag(tagObj) {
    return httpService.put(`tag/edit/${tagObj._id}`, tagObj);
}

function getTagById(tagId) {
    return httpService.get(`tag/${tagId}`);
}
function getTagByIdForScan(tagId) {
    return httpService.get(`tag/scan/${tagId}`);
}

function getUserTags(userId) {
    return httpService.get(`tag/user/${userId}`);
}

function removeTag(tagId) {
    return httpService.delete(`tag/${tagId}`);
}

function getAllTags() {
    return httpService.get('tag');
}
