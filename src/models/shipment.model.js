import mongoose, { mongo } from "mongoose";

const shipmentSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    required: true,
  }, // shipment unique id
  sender: {
    name: {
      type: String,
      required: [true, "sender name is required"],
      minLength: [3, "username must be at least 3 characters"],
      maxLength: [30, "username must be at most 30 characters"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      match: /^03\d{9}$/,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exist"],
      lowercase: true,
      trim: true,
    },
  },
  reciver: {
    name: {
      type: String,
      required: [true, "sender name is required"],
      minLength: [3, "username must be at least 3 characters"],
      maxLength: [30, "username must be at most 30 characters"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
      match: /^03\d{9}$/,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exist"],
      lowercase: true,
      trim: true,
    },
  },
  packageType: {
    type: String,
    enum: {
      values: ["DOCUMENT", "ELECTRONICS", "CLOTHES", "FRAGILE", "OTHER"],
      message: "packgeType must [DOCUMENT,ELECTRONICS,CLOTHES,FRAGILE,OTHER]",
    },
  },
  weight: {
    type: Number,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: [true, "pickedUp address is mandatory"],
  },
  deliveryAddress: {
    type: String,
    required: [true, "delivery address is mandatory"],
  },
  shipmentStatus: {
    type: String,
    enum: {
      values: [
        "BOOKED",
        "PICKED_UP",
        "IN_WAREHOUSE",
        "IN_TRANSIT",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      message:
        "status must be [BOOKED,PICKED_UP,IN_WAREHOUSE,IN_TRANSIT,OUT_FOR_DELIVERY,DELIVERED,CANCELLED]",
    },
    default: "BOOKED",
  },
  assignDeliveryAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  currentLocation: {
    lattitude: Number,
    longitude: Number,
  },
  currentWarehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
  },
  trackingHistory: [
    {
      status: String,
      location: String,
      updateAt: Date,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const shipmentModel = mongoose.model("Shipment", shipmentSchema);
