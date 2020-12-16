const Query = {
  hello: () => 'Hello World!',
  users: (parent, args, context) => context.User.find(),
  user: (parent, args, context) => context.User.findById(args.id),
  posts: (parent, args, context) => context.Post.find(),
  trips: (parent, args, context) => context.Trip.find(),
  trip: (parent, args, context) => context.Trip.findById(args.id)
};

module.exports = Query;
