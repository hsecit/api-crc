// import module
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
// import routes
import TestimonialRoute from './app/routes/rTestimonial.js'
import RendezVousRoute from './app/routes/rRendezVous.js'
import ContactRoute from './app/routes/rContact.js'
import UserRoute from './app/routes/rUser.js'
import TrackCreanceRouter from './app/routes/rTrackcreance.js'

// app conf
const app = express()
dotenv.config()
const port = process.env.PORT || 3000
// cors origin
app.use(cors())

// db config
const url_connection = 'mongodb+srv://hamza:hamza123@cluster0.lw0c7.mongodb.net/crcma?retryWrites=true&w=majority';
mongoose.connect(url_connection ,{
    useNewUrlParser: true ,
    useCreateIndex : true,
    useUnifiedTopology: true
})

// middleware 
app.use(express.json())
app.use('/imgage',express.static(process.cwd()+'/storage/img'))
app.use('/storage/testimonials',express.static(process.cwd()+'/storage/testimonials'));
app.use('/storage/collections/docs',express.static(process.cwd()+'/storage/collections/docs'))
app.use('/testimentals',TestimonialRoute);
app.use('/rdvs',RendezVousRoute);
app.use('/contacts',ContactRoute)
app.use('/users',UserRoute)
app.use('/collections',TrackCreanceRouter)
// api routes
app.get('/', (req,res) => {
    res.status(200).send("helloo from the server")
})

// launch the server to listen
app.listen(port , ()=> console.log(`starting server on ${port}`) )