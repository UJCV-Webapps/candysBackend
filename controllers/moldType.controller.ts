import { Request, Response } from 'express';
import { MoldType } from '../models/MoldType';

export const getMoldTypes = async( req: Request, res: Response ) => {
    try {
        const moldTypes = await MoldType.findAll();
        return res.json( moldTypes );
    }catch(error) {
        console.log(error);
    }
}

export const saveMoldType = async( req: Request, res: Response ) => {
    try {
        const { mold } = req.body;
        await MoldType.create( { mold } );
        return res.json( { msg: 'Molde guardado correctamente.' } );
    }catch(error) {
        console.log(error);
    }
}

export const updateMold = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { mold: moldName } = req.body;
        const mold: any = await MoldType.findByPk( id );
        mold.mold = moldName;
        await mold.save();
        return res.json( { msg: 'Molde actializado correctamente.' } );
    }catch( error ) {
        console.log(error);
    }
}

export const deleteMold = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const mold: any = await MoldType.findByPk( id );
        await mold.destroy();
        return res.json( { msg: 'Molde eliminado correctamente.' } );
    }catch( error ) {
        console.log(error);
    }
}