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
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subject',
        required:true,
    },
    mark:{
      type:Number,
      required:true,
    },
    bpCode:{
        type:String,
    },
    imageTask:{
        type:String,
    },
},{timestamps:true})

export default mongoose.model("Task",TaskSchema);