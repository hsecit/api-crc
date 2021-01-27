import mongoose from 'mongoose'


const DocCollectionShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id : {
        type:String,
        required:true
    }
    ,
    docs : []
}, { timestamps: true })

const DocSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    doc_url: {
        type: String,
        required: true
    }
},{ timestamps: true })
const Docs = mongoose.model('Docs',DocSchema)
export default mongoose.model('docollections', DocCollectionShema)