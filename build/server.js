"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the express in typescript file
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const sendEmail_1 = require("./utils/sendEmail");
const emailTemplate_1 = require("./assets/emailTemplate");
const errorHandeler_1 = require("./midilwer/errorHandeler");
dotenv_1.default.config();
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000;
// Handling  Request
app.use(express_1.default.json());
app.post('/send-email', async (req, res, next) => {
    try {
        const { mailSendFrom, mailSendTo, mailSubject, mailText, html } = req.body;
        if (!mailSendFrom || !mailSendTo || !mailSubject || !mailText) {
            res.status(400);
            throw new Error("Input not valid");
        }
        const mailOption = {
            from: process.env.EMAIL,
            to: mailSendTo,
            subject: mailSubject,
            html: (0, emailTemplate_1.emailTemplate)(mailSendFrom, mailText)
        };
        await (0, sendEmail_1.senEmail)(mailOption);
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
});
app.use(errorHandeler_1.errorHandler);
// Server setup
app.listen(port, () => {
    console.log(`server start on http://localhost:${port}/`);
});
exports.default = app;
