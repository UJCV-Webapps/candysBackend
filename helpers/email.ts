import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const sendVerificationCode = ( email: string, token: string ) => {
    return new Promise( ( resolve, reject ) => {
        let transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD
            } 
        });
        const mailDetails: Mail.Options = {
            from: process.env.EMAIL_ACCOUNT,
            to: email,
            subject: 'Verificación de cuenta',
            html: `
                <h1>Haz click para verificar tu cuenta</h1>
                <a href="${process.env.BASE_URL}/api/auth/verify?token=${token}">Verificar cuenta</a>
            `
        };
        transporter.sendMail( mailDetails, function( err, data ) {
            if(err) {
                console.log(err);
                reject( err );
            } else {
                console.log(data);
                resolve( data );
            } 
        } );
    } );
}

export const sendRecoveryCodeToEmail = ( email: string, code: number | string ) => {
    return new Promise( ( resolve, reject ) => {
        let transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD
            } 
        }); 
        const mailDetails: Mail.Options = {
            from: process.env.EMAIL_ACCOUNT,
            to: email,
            subject: 'Recuperación de contraseña',
            html: `
                <h1>To código de recuperación es: ${code}</h1>
            `
        };

        transporter.sendMail( mailDetails, function( err, data ) {
            if(err) {
                console.log(err);
                reject( err );
            } else {
                console.log(data);
                resolve( data );
            } 
        } );
    } );
}