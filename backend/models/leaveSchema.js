import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"employees",
        required:true
    },
    fromDate:{
        type:Date,
        required:true
    },
    toDate:{
        type:Date,
        required:true
    },
    reasonType:{
        type:String,
        enum:["sick","casual","paid"],
        default:"casual"
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
},{timestamps:true}
);

const Levae = mongoose.model("leaves",leaveSchema)
export default Levae;