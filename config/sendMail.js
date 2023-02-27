// const nodemailer = require('nodemailer')
// const sendMail = async(email,code) =>{
//     const transport = nodemailer.createTransport({
//         service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL,
//                 pass:process.env.PASS
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//     })
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: email,
//         subject: "Register Login-app",
//         html: `
//         <main>
//             <div>
//                 <h1>Hello, to finish with the registration you just have to enter the following link. Welcome to Login-app !
//                 </h1>
//                 <a target="_blank" href='https://login-app-back.onrender.com/auth/verify/${code}'>Click here</a>
//             </div>
//         </main>
//         `
//     }
//     await transport.sendMail(mailOptions,(error,response)=>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(response)
//         }
//     })
// }

// module.exports =sendMail

const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const Oauth2 = google.auth.OAuth2

const sendMail = async(email,code) => {
    const client = new Oauth2(
        process.env.ID_CLIENT,
        process.env.SECRET_CLIENT,
        process.env.GOOGLE_URL
    )

    // configurar refresh token 
    client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })
    // codigo nuevo de acceso q mi app lo calcula
    const accessToken = client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_USER,
            type: process.env.GOOGLE_TYPE,
            clientId: process.env.ID_CLIENT,
            clientSecret: process.env.SECRET_CLIENT,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        },
        tls:{
            rejectUnauthorized:false,

        }
    })
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to: email,
        subject: 'Verify Login APP account',
        html: `
        <main>
            <div>
                <h1>Hello, to finish with the registration you just have to enter the following link. Welcome to Login-app !
                </h1>
                <a target="_blank" href='https://login-app-back.onrender.com/auth/verify/${code}'>Click here</a>
            </div>
        </main>
        `
    }
    await transport.sendMail(mailOptions, (error,response)=>{
        if(error){
            console.log(error)
        }else{
            console.log('Email sending')
        }
    })
} 

module.exports = sendMail