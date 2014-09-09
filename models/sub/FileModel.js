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
        required: true
    },
    state: {
        type: Number,
        required: true,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
    project_id: {
        type: ObjectId,
        ref: 'project'
    },
    log_id: {
    	type: ObjectId,
    	ref: 'filelog'
    }
});

FileSchema.path('name').validate(function(name) {
    return name.length;
}, '名称不能为空');

FileSchema.path('content').validate(function(content) {
    return content.length;
}, '内容不能为空');


mongoose.model('File', FileSchema);