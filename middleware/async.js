module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            handler();
        }
        catch (ex) { next(); }
    }
}