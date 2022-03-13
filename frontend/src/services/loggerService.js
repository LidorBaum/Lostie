import httpService from './httpService';

export default {
    logVisitor
};

function logVisitor(){
    return httpService.get(`logger/visit`)
}