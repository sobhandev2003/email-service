// Import the express in typescript file
import express, { NextFunction, Request, Response, Router } from 'express';



const app: express.Application = express();

import dotenv from 'dotenv'
import cors from 'cors'
import { mailOptionKeyType, senEmail } from './utils/sendEmail';
import { errorHandler } from './midilwer/errorHandeler';



dotenv.config()
app.use(cors())

const port = process.env.PORT || 5000;
// Handling  Request
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Sobhandev Email Sending API');
});


app.post('/send-email', async (req: Request, res: Response, next: NextFunction) => {

    try {

        interface RequestBody {
            mailSendFrom: string;
            mailSendTo: string;
            phoneNumber?:string;
            mailSubject: string;
            mailText: string;
            html?: string;
        }
        const { mailSendFrom, mailSubject, mailText, html }: RequestBody = req.body

        if (!mailSendFrom  || !mailSubject || !mailText) {
            res.status(400)
            throw new Error("Input not valid")
        }


        const mailOption: mailOptionKeyType = {
            from: process.env.EMAIL!,
            to: 'sobhandevp2021+protfolio@gmail.com',
            subject: mailSubject,
            html: html
        }
        await senEmail(mailOption)
        res.json({ success: true })
    } catch (error) {
        next(error)
    }
});

// app.post('/send-email', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         interface RequestBody {
//             mailSendFrom: string;
//             mailSendTo: string;
//             phoneNumber?: string;
//             mailSubject: string;
//             mailText: string;
//             html?: string;
//         }

//         const { mailSendFrom, mailSendTo, mailSubject, mailText, html }: RequestBody = req.body;

//         if (!mailSendFrom || !mailSendTo || !mailSubject || !mailText) {
//             res.status(400);
//             throw new Error("Input not valid");
//         }

//         const mailOption: mailOptionKeyType = {
//             from: `Your App <onboarding@resend.dev>`, // Must be a verified sender in Resend
//             to: mailSendTo,
//             subject: mailSubject,
//             html: html || `<p>${mailText}</p>` // fallback if no HTML provided
//         };

//         await senEmail(mailOption);

//         res.json({ success: true });
//     } catch (error) {
//         next(error);
//     }
// });

app.use(errorHandler)
// Server setup
app.listen(port, () => {
    console.log(`server start on http://localhost:${port}/`);
});

export default app