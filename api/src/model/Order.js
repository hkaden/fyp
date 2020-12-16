const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const orderSchema = new Schema(
  {
    tripId: {
      type: String,
      required: true,
      trim: true,
      ref: 'Trip'
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    toJSON: { getters: true },
    timestamps: true
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
