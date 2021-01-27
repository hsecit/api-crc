import nodemailer from 'nodemailer'


const sendMailTo = ({
    email,
    rely
}) => {

    const html = `
    
    <div style="padding:15px;gap: 5px;border-radius: 10px;flex-direction:column;box-shadow: 1px 0px 5px 5px #EFEFEF;font-size: large;font-weight: 400;">
        ${rely}
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
            console.log('Email sent: ' + info.response);
        }
    })
}

export default sendMailTo;