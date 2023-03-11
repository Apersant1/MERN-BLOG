import mongoose from 'mongoose'

const SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    totalMarks:{
        type:Number
    },
    typeExam:{
        type:String,
    }

}, {
    timestamps: true,

});

export default mongoose.model('Subject',SubjectSchema);