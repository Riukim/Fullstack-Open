const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url)

	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type : String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		validate: {
			validator: function(value){
				return /^(\+\d{1,2}\s?)?\d{2,3}-\d{8,}$/g.test(value)
			},
			message: props => `${props.value} is not a valid number!`
		},
		minLength: 7,
		required: true
	}
})

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Person", personSchema)