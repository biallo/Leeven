var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TeamSchema = new Schema({
	name: {
        type: String,
        required: true,
        trim: true
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
    user_id: {
        type: ObjectId,
        ref: 'users'
    }
});

TeamSchema.path('name').validate(function(name) {
    return name.length;
}, '名称不能为空');

mongoose.model('Team', TeamSchema);