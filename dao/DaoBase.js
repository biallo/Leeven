var _ = require('underscore');

DaoBase = (function() {
    var instance = [];

    function constructor(Model) {
        //特权方法
        return {
            create: function(doc, callback) {
                Model.create(doc, function(error, model) {
                    if (error) {
                        return callback(error);
                    } else {
                        return callback(null, model);
                    }
                });
            },
            save: function(model, callback) {
                model.save(function(error) {
                    if (error) {
                        return callback(error);
                    } else {
                        return callback(null, model);
                    }
                });
            },
            findById: function(id, callback) {
                Model.findOne({
                    _id: id
                }, function(error, model) {
                    if (error) {
                        return callback(error, null);
                    }else{
                        return callback(null, model);
                    }
                });
            },
            getModelByQuery: function(query, callback) {
                Model.findOne(query, function(error, model) {
                    if (error) {
                        return callback(error, null);
                    }else{
                        return callback(null, model);
                    }
                });
            },
            findByQuery: function(query, callback) {
                Model.count(query, function(error, model) {
                    if (error) {
                        return callback(error, null);
                    }else{
                        return callback(null, model);
                    }
                });
            },
            getAll: function(callback) {
                Model.find({}, function(error, model) {
                    if (error) {
                        return callback(error, null);
                    }else{
                        return callback(null, model);
                    }
                });
            },
            del: function(query, callback) {
                Model.remove(query, function(error) {
                    if (error) {
                        return callback(error);
                    }else{
                        return callback(null);
                    }
                });
            },
            update: function(conditions, update, options, callback) {
                if (update._id) {
                    delete update._id;
                }
                Model.update(conditions, update, options, function(error) {
                    if (error) {
                        return callback(error);
                    }else{
                        return callback(null);
                    }
                });
            },
            getList: function(options, sort, callback) {
                var criteria = options.criteria || {};
                Model.find(criteria)
                    .sort(sort)
                    .limit(options.perPage)
                    .skip(options.perPage * options.page)
                    .exec(callback);
            }
        }
    }
    return {
        getInstance: function(Model) {
            if (_.indexOf(instance, Model) == -1) {
                instance.push(Model.collection.name)
            }
            return constructor(Model);
        }
    }
})();


module.exports = DaoBase;
