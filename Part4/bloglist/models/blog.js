const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Must provide a title"]
	},
	author: {
		type: String,
		required: [true, "Must provide an author"]
	},
	url: {
		type: String,
		required: [true, "Must provide an url"]
	},
	likes: {
		type: Number,
		default: 0,
	}
})

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Blog", blogSchema)