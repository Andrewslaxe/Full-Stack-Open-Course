const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
		},
	],
	username: { type: String, unique: true, required: true, minLength: 3 },
	name: String,
	passwordHash: String,
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	},
})

const User = mongoose.model('User', userSchema)

module.exports = User
