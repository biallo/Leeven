var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TeamSchema = new Schema({});

mongoose.model('Team', TeamSchema);