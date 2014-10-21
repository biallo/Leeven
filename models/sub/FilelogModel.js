var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FilelogSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    file_id: {
        type: ObjectId,
        ref: 'file'
    },
    user_id: {
    	type: ObjectId,
    	ref: 'users'
    }
});


mongoose.model('Filelog', FilelogSchema);