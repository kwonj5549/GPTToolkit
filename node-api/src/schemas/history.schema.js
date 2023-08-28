import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  email_verified_at: { type: Date },
  password: { required: true, type: String },
  profile_image: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
  wordpressAccessToken: { type: String },
  apiUsage: { type: Number },
});

historySchema.set("toJSON", { virtuals: true });

export const historyModel = mongoose.model("History", historySchema);
