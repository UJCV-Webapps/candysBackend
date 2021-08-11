import { Request, Response } from 'express';
import { ProductType } from '../models/ProductType';

export const getProductTypes = async( req: Request, res: Response ) => {
    try {
        const productTypes = await ProductType.findAll();
        return res.json( productTypes );
    }catch(error) { 
        console.log(error);
    }
}

export const saveProductType = async( req: Request, res: Response ) => {
    try {
        const { type } = req.body;
        await ProductType.create( { type } );
        return res.json( { msg: 'Tipo de producto registrado correctamente.' } );
    }catch(error) {
        console.log(error);
    }
}

export const updateProductType = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const { type: typeName } = req.body;
        const productType: any = await ProductType.findByPk( id );
        productType.type = typeName;
        await productType.save();
        return res.json( { msg: 'Tipo de producto actualizado correctamente.' } );
    }catch( error ) {
        console.log(error);
    }
}

export const deleteProductType = async( req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const productType: any = await ProductType.findByPk( id );
        await productType.destroy();
        return res.json( { msg: 'Tipo de producto eliminado correctamente.' } ); 
    }catch( error ) {
        console.log(error);
    }
}