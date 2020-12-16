const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const tripSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    gallery: {
        type: String,
        required: true
    },
    lat: {
      type: String,
      trim: true
    },
    lng: {
      type: String,
      trim: true
    },
    locationContent: {
      type: String
    }
  },
  {
    toJSON: { getters: true },
    timestamps: true
  }
);

const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);

module.exports = Trip;
