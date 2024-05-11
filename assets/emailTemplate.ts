
export const emailTemplate = (emailSendFrom: string,text:string,phoneNumber:string|null|undefined) => {
    return `
        <body>
    <h3>Email form :${emailSendFrom} </h3>
    ${phoneNumber ? `<h4>Phone number : ${phoneNumber}</h4>` : ''}
    <p>${text}</p>
        </body>
        
        `
}