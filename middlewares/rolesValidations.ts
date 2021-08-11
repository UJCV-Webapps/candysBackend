import { User } from '../models/User';
import { Role } from '../models/Role';
import { NextFunction, Request, Response } from 'express';

export const onlyRoles = ( roles: string[] ) => {
    return async( req: Request, res: Response, next: NextFunction ) => {
        const { role } = req.user.role;
        if( roles.includes( role ) ) {
            next();
        } else {
            return res.status(401).json( { errors: [ { msg: 'No estas autorizado.' } ] } );
        }
    }
}