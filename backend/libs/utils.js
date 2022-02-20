function getTotalVases(selectedVases) {
    return selectedVases.reduce((total, selectedVase) => {
        return selectedVase.quantity + total;
    }, 0);
}

module.exports = {
    getTotalVases,
};
