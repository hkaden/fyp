const bcrypt = require('bcryptjs');

const Mutation = {
  signUp: async (parent, args, context) => {
    const hashedPassword = await bcrypt.hash(args.password, 10);

    const user = await context.User.create({
      email: args.email,
      name: args.name,
      password: hashedPassword
    });

    return { token: user.token(), user };
  },

  signIn: async (parent, args, context) => {
    const user = await context.User.findOne({ email: args.email });

    if (!user) throw new Error('No such user found');

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) throw new Error('Invalid password');

    return { token: user.token(), user };
  },

  trip: (parent, args, context) => 
    context.Trip.create({
      title: args.title,
      content: args.content,
      location: args.location,
      price: args.price,
      gallery: args.gallery,
      lat: args.lat,
      lng: args.lng,
      locationContent: args.locationContent
    }),
  

  post: (parent, args, context) =>
    context.Post.create({
      title: args.title,
      content: args.content,
      author: context.auth.id
    }),

    order: (parent, args, context) =>
    context.Order.create({
      tripId: args.tripid,
      owner: context.auth.id
    })
};

module.exports = Mutation;
