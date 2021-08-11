import { Request, Response } from 'express';
import { Size } from '../models/Size';

export const getSizes = async( req: Request, res: Response ) => {
    try {
        const sizes = await Size.findAll();
        return res.json( sizes );
    }catch(error) {
        console.log(error);
    }
}

export const saveSize = async( req: Request, res: Response ) => {
    try {
        const { size } = req.body;
        await Size.create( { size } );
        return res.json( { msg: 'Tamaño agregado correctamente.' } );
    }catch(error) {
        console.log(error);
    }
}

export const updateSize = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { size: sizeName } = req.body;
        const size: any = await Size.findByPk( id );
        size.size = sizeName;
        await size.save();
        return res.json( { msg: 'Talla actualizada correctamente' } );
    }catch( error ) {
        console.log(error);
    }
}

export const deleteSize = async( req: Request, res: Response ) => {
    try{
        const { id } = req.params;
        const size: any = await Size.findByPk( id );
        await size.destroy();
        return res.json( { msg: 'Talla eliminada correctamtene.' } );
    }catch( error ) {
        console.log(error);
    }
}