var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FileSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: ''
    },
    file_type: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        required: true,
        default: 1
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    project_id: {
        type: ObjectId,
        ref: 'projects'
    },
    log_id: {
        type: ObjectId,
        ref: 'filelog'
    }
});

FileSchema.path('name').validate(function(name) {
    return name.length;
}, '名称不能为空');

mongoose.model('File', FileSchema);