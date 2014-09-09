exports.validator = function(res, parameter, info) {
    if (parameter == '' || parameter == null) {
        return res.requestError(info)
    }
}