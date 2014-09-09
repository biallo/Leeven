var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
            sparse: true
        }
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'avatar.png'
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
    group_id: {
        type: String,
        required: true,
        default: 1
    }
});


UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

UserSchema.path('email').validate(function(email) {
    return email.length;
}, '邮件地址不能为空');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    return hashed_password.length;
}, '密码不能为空');

UserSchema.path('name').validate(function(name) {
    return name.length;
}, '名称不能为空');


/**
 * Methods
 */
UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};

mongoose.model('User', UserSchema);
