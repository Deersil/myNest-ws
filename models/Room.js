var mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  title: String,
  description: String,
  services: [{
    type: Number
  }],
  photos: [{
    type: String,
  }],
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  }
}, {
  timestamps: true
});

// Requires population of author
RoomSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    services: this.services,
    photos: this.photos,
  };
};
RoomSchema.methods.getHotel = function(user){
  return this.hotel;
};

mongoose.model('Room', RoomSchema);