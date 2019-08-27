const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3
    },
    address: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        // validate: {
            /*validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
            */
        //  },
    },
    email: {
        type: String,
        trim: true,
        // validate: (value) => {
            /* return validator.isEmail(value)
        },
            message: props => `${props.value} is not a valid phone number!`
            */
        //  },
    },
    // birthdate: { type: Date },
}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;