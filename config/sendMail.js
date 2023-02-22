const nodemailer = require('nodemailer')
const sendMail = async(email,code) =>{
    const transport = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass:process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
    })
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Register Login-app",
        html: `
        <main>
            <div>
                <h1>Hello, to finish with the registration you just have to enter the following link. Welcome to Login-app !
                </h1>
                <a href='http://localhost:4000/auth/verify/${code}'>Click here</a>
            </div>
        </main>
        `
    }
    await transport.sendMail(mailOptions,(error,response)=>{
        if(error){
            console.log(error)
        }else{
            console.log(response)
        }
    })
}

module.exports =sendMail