import mongoose from "mongoose";

const apiUsageHistorySchema = new mongoose.Schema({
  _id: { required: true, type: String },
  apiUsage: { required: true, type: Number },
  
  usageHistory: [{
    apiUsage: Number,
    timestamp: Date,
    _id: false,
    service:String
}] 
});

apiUsageHistorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

apiUsageHistorySchema.set("toJSON", { virtuals: true });

export const apiUsageHistory = mongoose.model("apiUsageHistory", apiUsageHistorySchema);
