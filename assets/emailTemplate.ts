
export const emailTemplate = (emailSendFrom: string,text:string) => {
    return `
        <body>
    <h3>Email form :${emailSendFrom} </h3>
    <p>${text}</p>
        </body>
        
        `
}