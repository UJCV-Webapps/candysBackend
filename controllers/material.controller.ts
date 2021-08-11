import { Request, Response } from 'express';
import { Material } from '../models/Material';

export const getMaterials = async( req: Request, res: Response ) => {
    try{
        const materials = await Material.findAll();
        return res.json( materials );
    }catch(error) {
        console.log(error);
    }
}

export const saveMaterial = async( req: Request, res: Response ) => {
    try {
        const { material } = req.body;
        await Material.create( { material } );
        return res.json( { msg: 'Material agregado correctamente' } );
    }catch(error) {
        console.log(error);
    }
}

export const updateMaterial = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { material: materialName } = req.body;
        const material: any = await Material.findByPk( id );
        material.material = materialName;
        await material.save();
        return res.json( { msg: 'Material actualizado correctamente.' } );
    }catch( error ) {
        console.log(error);
    }
}

export const deleteMaterial = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const material: any = await Material.findByPk( id );
        await material.destroy();
        return res.json( { msg: 'Material eliminado correctamente' } );
    }catch( error ) {
        console.log(error);
    }
}