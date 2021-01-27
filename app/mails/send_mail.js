import nodemailer from 'nodemailer'
import {temple_password}  from './password.js'

const sendMailTo = ({
    rEmail,
    rName,
    rPassword,
    type
}) => {

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
        to: rEmail,
        subject: 'Recieve password',
        html: type!=='forgot'?temple_password(rName,rEmail,rPassword): rPassword
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
///[nodemon] restarting due to changes...
///home/api/api-crc
//#scp -i /Users/lahcenzmimi/crc_digitalocean  -r   /Users/lahcenzmimi/Desktop/morad/api-crc-master/* root@64.225.26.229:/home/api/api-crc