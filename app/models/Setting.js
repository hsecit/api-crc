import mongoose from 'mongoose'

const SocialMediaLinkSchema = mongoose.Schema({
    fb:{type:String,default:''},
    twt:{type:String,default:''},
    lk:{type:String,default:''},
    ig:{type:String,default:''}
}) 

export default mongoose.model('settings',SocialMediaLinkSchema)