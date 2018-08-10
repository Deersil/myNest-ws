var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var HotelSchema = new mongoose.Schema({
  title: String,
  description: String,
  photo: String,
  stars: Number,
  rate: Number,
  cost: Number,
  type: Number,
  lat: Number,
  lng: Number,
  prepurchase: Boolean,
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }],
  services: [{
    type: Number
  }],
}, {
  timestamps: true
});

HotelSchema.plugin(uniqueValidator, {
  message: 'is already taken'
});

HotelSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    photo: this.photo,
    services: this.services,
    stars: this.stars,
    rate: this.rate,
    cost: this.cost,
    type: this.type,
    lat: this.lat,
    lng: this.lng,
    prepurchase: this.prepurchase,
    rooms: this.rooms,
    services: this.services,
  };
};

HotelSchema.methods.getRooms = function(user){
  return this.rooms;
};

mongoose.model('Hotel', HotelSchema);