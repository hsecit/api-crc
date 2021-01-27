import express from 'express'
import Contact from '../models/Contact.js'
import dotenv from 'dotenv'
import e from 'express'
import sendReply from '../mails/replyEmail.js'
import nodemailer from 'nodemailer'
// conf router
dotenv.config()
const router = express.Router()

// state all contact us
router.get('/', (req, res) => {
    Contact.find().sort('-createdAt').
        exec((err,docs) => {
            if(!err){

                const response = {
                    count: docs.length,
                    contact_us: docs.map(doc => {
                        return {
                            ...doc._doc,
                            _self :{
                                type: "GET",
                                url: process.env.API_URL + '/contacts'
                            },
                            request: {
                                type: "GET",
                                url: process.env.API_URL + '/contacts/' + doc._id
                            }
                        }
                    })
                }
                res.status(200).json(response);
            }else{
                res.status(500).json({
                error: err
            });
            }
        })
      
})

router.post('/send',(req,res,next) => {
    const reply = req.body.reply
    const email = req.body.email
    const html = `
    
    <div style="padding:15px;gap: 5px;border-radius: 10px;flex-direction:column;box-shadow: 1px 0px 5px 5px #EFEFEF;font-size: large;font-weight: 400;">
        ${reply}
    </div>
   
    `
    // create serv
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'crc.mourad',
            pass: 'cDNse9APac}y?#R['
        }
    })

    var mailOptions = {
        from: 'crc-support@gmail.com',
        to: email,
        subject: 'Reply',
        html: html
    }

    mail.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
             res.status(200).json({
                message: "sent"
            });
            console.log('Email sent: ' + info.response);
        }
    })
    

})
// add new contact
router.post('/', (req, res) => {
    const contact = new Contact({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        object: req.body.object,
        demand: req.body.demand
    });
    contact.save()
        .then(result => {
            res.status(201).json({
                ...result._doc,
                request: {
                    type: 'GET',
                    url: process.env.API_URL + '/contacts'
                }
            })
        })

})

// get contact us by id
router.get('/:contactId', (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findById(contactId).
        then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    contact_us: doc,
                    request: {
                        type: 'GET',
                        url: process.env.API_URL + '/contacts'
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
})

// update 
// TODO alter update route
router.patch("/:contactId", (req, res, next) => {
    const id = req.params.contactId;
    const updateOps = {};
    
    for (const ops of Object.keys(req.body)) {
        updateOps[ops.propName] = ops.value;
    }
    Contact.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Contact updated',
                request: {
                    type: 'GET',
                    url: process.env.API_URL + '/contacts/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
// delete contact
router.delete("/:contactId", (req, res, next) => {
    const id = req.params.contactId;
    Contact.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Contact deleted or canceled',
                request: {
                    type: 'POST',
                    url: process.env.API_URL + '/contacts',
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

export default router ; 