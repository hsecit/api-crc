import mongoose from 'mongoose'

const RDVShema = mongoose.Schema({
    fullname: {type: String , required : true},
    email: {type: String , required : true},
    phone: {type: String , required : true},
    date_rdv : {type: String , required : true},
    seen : {type:Boolean,default:false}
},
{ timestamps: true }
)

export default mongoose.model('rendez-vous', RDVShema);