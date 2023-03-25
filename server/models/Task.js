import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required: true,
    },
    mark:{
      type:Number,
      required:true,
    },
    bpCode:{
        type:String,
    },
    bpLexems:{
        type:String,
    },
    imageTask:{
        type:String,
    },
    themeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theme",
        required: true,
      },
},{timestamps:true})

export default mongoose.model("Task",TaskSchema);