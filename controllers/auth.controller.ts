import { Request, Response } from 'express';
import { hashPassword, matchPassword, getRandomToken } from '../helpers/security';
import { v4 as uuid } from 'uuid';
import { User } from '../models/User';
import { getToken } from '../helpers/token';
import { Role } from '../models/Role';
import { getNavbarFromRole } from '../helpers/navbar';
import { saveCodeToUser } from '../helpers/codes';
import { sendRecoveryCodeToEmail, sendVerificationCode } from '../helpers/email';
import { Code } from '../models/Code';
import moment from 'moment';

export const userSignUp = async( req: Request, res: Response ) => {
    try {
        const { name, email, phone, password } = req.body;
        const roleId = 2; // Role id del cliente
        const hashedPassword = hashPassword( password );
        const userId = uuid();
        const expiresAt = moment().add( 5, 'd' );
        const code = await getRandomToken();

        await sendVerificationCode( email, code );

        await User.create( { userId, name, phone, email, password: hashedPassword, roleId } );
        await Code.create( { code, expiresAt, userId } );
        return res.json( { msg: 'Cuenta creada correctamente, hemos enviado un codigo de verificación a tu correo.' } );
    }catch( error ) {
        console.log(error);
    }
}

export const verifyAccount = async( req: Request, res: Response ) => {
    try {
        const { token } = req.query;
        const code: any = await Code.findOne( { where: { code: token } } );
        if( !code ) {
            return res.redirect( 'http://localhost:4200' );
        }
        const { userId } = code;
        const user: any = await User.findByPk( userId );
        user.verified = true;
        await user.save();
        await code.destroy();
        return res.redirect( 'http://localhost:4200/auth/login' );
    }catch( error ) {
        console.log(error);
    }
}

export const userSignIn = async( req: Request, res: Response ) => {
    try {
        const { email, password } = req.body;
        const { to } = req.query;
        const user: any = await User.findOne( { where: { email }, include: [ { model: Role } ] } );
        if( !user ) {
            return res.status(400).json( { errors: [ { msg: 'Correo o contraseña incorrectos' } ] } );
        }
        if( !user.active || !user.verified ) {
            return res.status(400).json( { errors: [ { msg: 'Tu cuenta esta inactiva o aun no esta verificada.' } ] } );
        }
        const { password: hashPassword } = user;
        if( matchPassword( password, hashPassword ) ) {
            if( to === 'dashboard' && user.role.role !== 'Administrador' ) {
                return res.status(401).json( { errors: [ { msg: 'No esta autorizado.' } ] } );
            } else {
                const token = getToken( user.userId );
                return res.json( {token} );
            }
        } else {
            return res.status(400).json( { errors: [ { msg: 'Correo o contraseña incorrectos' } ] } );
        }
    }catch( error ) {
        console.log(error);
    }
}

export const getUserProfile = async( req: Request, res: Response ) => {
    try {
        const { userId } = req.user;
        const user = await User.findByPk( userId, { attributes: [ 'userId', 'name', 'phone', 'email' ] } );
        return res.json( user );
    }catch( error ) {
        console.log(error);
    }
} 
 
export const sendCodeToEmail = async( req: Request, res: Response ) => {
    try {
        const { email } = req.body;
        const user: any = await User.findOne( { where: { email } } );
        if( user ) {
            try {
                const { userId, email } = user;
                const code = await saveCodeToUser( userId );
                await sendRecoveryCodeToEmail( email, code! );
                return res.json( { msg: 'Código de verificación enviado', userId } );
            }catch( error ) {
                console.log(error);
            }
        }
        return res.status(400).json( { errors: [ { msg: 'Código no enviado' } ] } );
    }catch( error ) {
        console.log(error);
    }
}

export const verifyRecoveryCode = async( req: Request, res: Response ) => {
    try {
        const { userId, code } = req.body;
        const savedCode: any = await Code.findOne( { where: { userId } } );
        if( savedCode && savedCode.code === code ) {
            savedCode.destroy();
            return res.json( { msg: 'Código verificado' } );
        }else {
            return res.status(400).json( { errors: [ { msg: 'Error al momento de procesar la solicitud.' } ] } )
        }
    }catch( error ) {
        console.log(error);
    }
}

export const changePassword = async( req: Request, res: Response ) => {
    try {
        const { password, userId } = req.body;
        const securePassword = hashPassword( password );
        const user: any = await User.findByPk( userId );

        if( !user ) {
            return res.status( 400 ).json( { errors: [ { msg: 'No se pudo completar la operación' } ] } );
        } else {
            user.password = securePassword;
            await user.save();
            return res.json( { msg: 'Contraseña actualizada correctamente' } );
        }
    }catch( error ) {
        console.log(error);
    }
}

export const getNavbar = async( req: Request, res: Response ) => {
    try { 
        const { roleId } = req.user;
        const role: any = await Role.findByPk( roleId );
        const navbar = getNavbarFromRole( role.role );
        return res.json( navbar );
    }catch( error ) {
        console.log(error);
    } 
}