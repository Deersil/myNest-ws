const router = require('express').Router();
const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const Room = mongoose.model('Room');
const token = require('../utils/tokenChecker');


router.get('/:id', token.required, (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(404);
  }
  Hotel.findById(id)
    .then((hotel) => {
      if (!hotel){
        return res.sendStatus(401);
      }

      return res.json(hotel.toJSONFor());
    }).catch(next);
});

router.get('/', token.required, (req, res, next) => {
  Hotel.find({}, function(err, hotels) {
    const result = [];
    if (err) {
      return res.sendStatus(422);
    }
    hotels.forEach((item) => {
      result.push(item.toJSONFor());
    });
    return res.json([...result]);
  });
});

router.post('/', token.required, (req, res, next) => {
  const hotel = new Hotel(req.body);
  hotel.save()
    .then(
      () => res.json(hotel.toJSONFor())
    )
    .catch(next);
});

router.put('/:id', token.required, (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(404);
  }
  Hotel.findById(id)
    .then((hotel) => {
      if (!hotel){
        return res.sendStatus(401);
      }
      const { 
        title,
        description,
        photo,
        stars,
        rate,
        services,
        cost,
        type,
        lat,
        lng,
        prepurchase,
      } = req.body;
      if (typeof username !== 'undefined'){
        hotel.username = username;
      }
      if (typeof title !== 'undefined'){
        hotel.title = title;
      }
      if (typeof description !== 'undefined'){
        hotel.description = description;
      }
      if (typeof photo !== 'undefined'){
        hotel.photo = photo;
      }
      if (typeof stars !== 'undefined'){
        hotel.stars = stars;
      }
      if (typeof rate !== 'undefined'){
        hotel.rate = rate;
      }
      if (typeof services !== 'undefined'){
        hotel.services = services;
      }
      if (typeof cost !== 'undefined'){
        hotel.cost = cost;
      }
      if (typeof type !== 'undefined'){
        hotel.type = type;
      }
      if (typeof lat !== 'undefined'){
        hotel.lat = lat;
      }
      if (typeof lng !== 'undefined'){
        hotel.lng = lng;
      }
      if (typeof prepurchase !== 'undefined'){
        hotel.prepurchase = prepurchase;
      }
      if (typeof services !== 'undefined'){
        hotel.services = services;
      }
      hotel.save()
        .then(
          () => res.json(hotel.toJSONFor())
        )
        .catch(next);
    }).catch(next);
  
});

router.delete('/:id', token.required, (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(404);
  }
  Hotel.findById(id).remove().exec();
  return req.sendStatus(204);

});

router.get('/:hotelId/room', token.required, (req, res, next) => {
  const { hotelId } = req.params;
  if (!hotelId) {
    return res.sendStatus(404);
  }
  Hotel.findById(hotelId)
    .then((hotel) => {
      if (!hotel){
        return res.sendStatus(401);
      }
      return res.json(hotel.getRooms());
    }).catch(next);
});


router.post('/:hotelId/room', token.required, (req, res, next) => {
  const { hotelId } = req.params;
  if (!hotelId) {
    return res.sendStatus(404);
  }
  Hotel.findById(hotelId)
    .then((hotel) => {
      if (!hotel){
        return res.sendStatus(401);
      }
      const room = new Room(req.body);
      room.hotel = hotel;
      room.save().then(() => {
        hotel.rooms.push(room);
        hotel.save();
        return res.json(room.toJSONFor());
      }).catch(next);
      
    }).catch(next);
});

router.put('/:hotelId/room/:id', token.required, (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(404);
  }
  Room.findById(id)
    .then((room) => {
      if (!room){
        return res.sendStatus(401);
      }
      const { 
        title,
        description,
        services,
        photos,
      } = req.body;
      if (typeof title !== 'undefined'){
        room.title = title;
      }
      if (typeof description !== 'undefined'){
        room.description = description;
      }
      if (typeof services !== 'undefined'){
        room.services = services;
      }
      if (typeof photos !== 'undefined'){
        room.photos = photos;
      }
      room.save()
        .then(
          () => res.json(room.toJSONFor())
        )
        .catch(next);
      
    }).catch(next);
});


router.delete('/:hotelId/room/:id', token.required, (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.sendStatus(404);
  }
  Room.find({_id: id}).remove().exec();
  res.sendStatus(204);
});

module.exports = router;