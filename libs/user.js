const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email required',
        validate: [
            {
                validator: async value => {
                    return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value)
                },
                msg: 'Invalid email.'
            }
        ],
        unique: 'Email already registered'
    },
    displayName: {
        type: String,
        required: 'Display name required',
        unique: 'Display name already registered'
    }
}, {
    timestamps: true,
})

userSchema.statics.publicFields = ['email', 'displayName']

userSchema.statics.getPublicFields = user => ({
    email: user.email,
    displayName: user.displayName
})

module.exports = mongoose.model('User', userSchema)
