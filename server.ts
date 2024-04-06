// Import the express in typescript file
import express, { NextFunction, Request, Response, Router } from 'express';



const app: express.Application = express();

import dotenv from 'dotenv'
import cors from 'cors'
import { mailOptionKeyType, senEmail } from './utils/sendEmail';
import { emailTemplate } from './assets/emailTemplate';
import { text } from 'stream/consumers';
import { errorHandler } from './midilwer/errorHandeler';



dotenv.config()
app.use(cors())

const port = process.env.PORT || 5000;
// Handling  Request
app.use(express.json())


app.post('/send-email', async (req: Request, res: Response, next: NextFunction) => {

    try {
     
        interface RequestBody {
            mailSendFrom: string;
            mailSendTo: string;
            mailSubject: string;
            mailText: string;
            html?: string;
        }
        const { mailSendFrom, mailSendTo, mailSubject, mailText, html }: RequestBody = req.body

        if (!mailSendFrom || !mailSendTo || !mailSubject || !mailText) {
            res.status(400)
            throw new Error("Input not valid")
        }
        

        const mailOption: mailOptionKeyType = {
            from: process.env.EMAIL!,
            to: mailSendTo,
            subject: mailSubject,
            html: emailTemplate(mailSendFrom, mailText)
        }
        await senEmail(mailOption)
        res.json({ success: true })
    } catch (error) {
        next(error)
    }
});
app.use(errorHandler)
// Server setup
app.listen(port, () => {
    console.log(`server start on http://localhost:${port}/`);
});