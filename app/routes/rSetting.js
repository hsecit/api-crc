import express from 'express'
import SocialMediaLinks from '../models/Setting.js'


const router = express.Router()

// get links
router.put('/socials',(req,res,next)=>{
    SocialMediaLinks.findOne((err,socials)=>{
        socials.fb = req.body.fb
        socials.twt = req.body.twt
        socials.ig = req.body.ig
        socials.lk = req.body.lk
        socials.save((err,s)=>{
           if(!err){
            res.status(200).send({
                update: true,
                s: s
            })
           }else{
            res.status(201).send({
                update: false,
            
            })
           }
        })

    })
})
///

router.get('/socials',(req,res,next)=>{
    SocialMediaLinks.findOne((err,result)=>{
        res.status(200).send({
            socials: result
        })
    })
})

router.get('/init',(req,res,next)=>{
    const sos = new SocialMediaLinks({
        fb:'',
        twt:''
    })
    sos.save((err,result)=>{
        res.status(200).send({
            socials: "inited"
        })
    })
    
    
})

export default router