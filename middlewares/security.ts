import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Role } from '../models/Role';

export const verifyToken = ( req: Request, res: Response, next: NextFunction ) => {
    const token = req.header('token');

    if( !token ) {
        return res.status(401).json( { errors: [ { msg: 'No estas autorizado' } ] } );
    }

    jwt.verify( token, process.env.JWT_SECRET!, async( error, payload: any ) => {
        if( error ) {
            return res.status(401).json( { errors: [ { msg: 'No estas autorizado' } ] } );
        }
        const user: any = await User.findByPk( payload.userId, { include: [ { model: Role } ] } );
        req.user = user;
        next();
    } )
}