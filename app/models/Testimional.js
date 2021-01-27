import mongoose from 'mongoose'

const TestimonialSchema = mongoose.Schema({
    author: String ,
    job : String, 
    statement : String ,
    photo_url : String
}
)

export default mongoose.model('testimonials' , TestimonialSchema);