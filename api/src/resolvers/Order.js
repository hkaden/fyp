const Order = {
    owner: (parent, args, context) => context.User.findById(parent.owner),
    trip: (parent, args, context) => context.Trip.findById(parent.tripId)
  };
  
  module.exports = Order;
  