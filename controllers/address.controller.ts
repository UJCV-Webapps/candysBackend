import { Request, Response } from 'express';
import { Address } from '../models/Address';
import { User } from '../models/User';

export const hasOneAddress = async( req: Request, res: Response ) => {
    try {
        const { userId } = req.user;
        const addresses = await Address.findAll( { where: { userId } } );
        return res.json( addresses );
    } catch( error ) {
        console.log(error);
    }
}

export const addUserAddress = async( req: Request, res: Response ) => {
    try {
        const { userId } = req.user;
        const { address } = req.body;
        
        await Address.create( { userId, address } );

        return res.json( { msg: 'Dirección registrada correctamente' } );

    }catch( error ) {
        console.log(error);
    }
}