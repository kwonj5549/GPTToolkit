import mongoose from "mongoose";

const promptSettingSchema = new mongoose.Schema({
  wordpressSettings: {type: Object },
  appleMusicSettings: {type: Object },
_id:{required:true, type:String}
});

promptSettingSchema.set("toJSON", { virtuals: true });

export const promptSettingModel = mongoose.model("PromptSetting", promptSettingSchema);
