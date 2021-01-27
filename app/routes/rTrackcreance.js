import express from 'express'
import multer from 'multer'
import { v4 as uuidv4, v4 } from 'uuid'
import TrackCollection from '../models/TrackCollection.js'

const router = express.Router()

// configure the storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/collections/docs')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname  +v4() +'.'+ file.originalname.split(".")[1])
    }
})
const uploadDoc = multer({
    storage: storage 
})


// get collections by user id
router.get('/byuser/:userId',(req,res) => {
    const userId = req.params.userId
    TrackCollection.
    find({user_id : userId}).
        then(docs => {
            const response = {
                count: docs.length,
                dossiers: docs.map(doc => {
                    return {
                        ...doc._doc,
                        _self :{
                            type: "GET",
                            url: process.env.API_URL + '/collectiopns'
                        },
                        request: {
                            type: "GET",
                            url: process.env.API_URL + '/collections/' + doc._id
                        },
                        addDoc: {
                            type: "Post",
                            url: process.env.API_URL + '/collections/' + doc._id + "/docs"
                        }
                    }
                })
            }
            res.status(200).json(response);
        }).catch(err => {
            res.status(404).send(err)
        })
})

// add  new collection
router.post('/',(req,res) => {
    const trackcollection = new TrackCollection({
        name: req.body.name,
        description : req.body.description ,
        user_id : req.body.user_id
    })

    // save record

    trackcollection.save().then((result) => {
        res.status(201).json(result)
    })
})

// add doc to the collection

router.post("/:collectionId/docs",uploadDoc.single('doc') ,(req,res) => {
    const collectionId = req.params.collectionId

    TrackCollection.findByIdAndUpdate(collectionId,{
        $push:{
            docs:{
                name: req.body.name,
                description : req.body.description,
                doc_url : `${process.env.API_URL}/${req.file.path}`,
                CreatedAt: new Date()
            }
        }
    },{ new: true, useFindAndModify: false },(err, result) => {
        res.status(201).send(result)
    })
})
 

// get one collection 
router.get('/:collectionId',(req,res) => {
    const collectionId = req.params.collectionId
    TrackCollection.findById(collectionId).then(result => {
        if(result){
            res.status(200).json({
                dossier : result,
                request : {
                    Type : "GET",
                    url : `${process.env.API_URL}/collections`
                },
                addDoc : {
                    type: "POST",
                    url:`${process.env.API_URL}/collections/${result._id}`
                }
            })
        }
    })
})

export default router