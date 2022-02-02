const {Schema, model} = require("mongoose");

const Card = new Schema({
    
        id: {type: Number, default: 0, required: true},
        name: {type: String, required: true},
        username: {type: String, required: true},
        email: {type: String, required: true},
        address: {
          street: {type: String, required: true},
          suite: {type: String, required: true},
          city: {type: String, required: true},
          zipcode: {type: String, required: true},
          geo: {
            lat: {type: String, required: true},
            lng: {type: String, required: true}
          }
        },
        phone: {type: String, required: true},
        website: {type: String, required: true},
        company: {
          name: {type: String},
          catchPhrase: {type: String, required: true},
          bs: {type: String, required: true}
        }

});

module.exports = model('Card', Card);