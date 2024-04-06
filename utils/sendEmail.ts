
import nodemailer from 'nodemailer'
// import asyncHandler from 'express-async-handler'


//data which is accept
export interface mailOptionKeyType{
    from: string, // sender address
    to: string, // list of receivers
    subject: string, // Subject line
    text?: string, // plain text body
    html?: string
}


export const senEmail = (async(mailOption:mailOptionKeyType) => {


    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
   
        try {
            const info= await transporter.sendMail(mailOption)
            // console.log("Message sent: %s", info.messageId);
           
        } catch (error) {
            throw new Error("Service not running")
        }
}
)
