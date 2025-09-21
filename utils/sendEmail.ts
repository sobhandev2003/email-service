
import nodemailer from 'nodemailer'
// import asyncHandler from 'express-async-handler'


//data which is accept
export interface mailOptionKeyType {
  from: string, // sender address
  to: string, // list of receivers
  subject: string, // Subject line
  text?: string, // plain text body
  html?: string
}


export const senEmail = (async (mailOption: mailOptionKeyType) => {

// console.log("mailOption",mailOption);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  try {
    const info = await transporter.sendMail(mailOption)
    // console.log("Message sent: %s", info);

  } catch (error) {
    // console.log("Email sending error:", error);
    throw new Error("Service not running")
  }
}
)


// utils/sendEmail.ts
// import { Resend } from "resend";

// export type mailOptionKeyType = {
//   from: string;
//   to: string;
//   subject: string;
//   html: string;
// };


// export async function senEmail(mailOptions: mailOptionKeyType) {
//   try {
//     const Resend_Key = process.env.RESEND_API_KEY;
//     console.log("Resend_Key", Resend_Key);

//     const resend = new Resend(process.env.RESEND_API_KEY);

//     const response = await resend.emails.send({
//       from: mailOptions.from,   // must be a verified sender
//       to: [`${mailOptions.to}`],
//       subject: mailOptions.subject,
//       html: mailOptions.html,
//     });

//     return response;
//   } catch (error: any) {
//     console.error("Email sending error:", error);
//     throw new Error(error.message || "Failed to send email");
//   }
// }

