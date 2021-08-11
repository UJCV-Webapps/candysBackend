import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Material } from '../models/Material';
import { Size } from '../models/Size';
import { MoldType } from '../models/MoldType';
import { saveImage } from '../helpers/saveImage';
import { v4 as uuid } from 'uuid';
import { ProductType } from '../models/ProductType';

export const getAllProducts = async( req: Request, res: Response ) => {
    try {
        const { page = 1 } = req.params;
        const limit = 12;
        const offset = ( Number(page) - 1 )*limit;

        const total = await Product.count();
        const products = await Product.findAll( { include: [ { model: Material }, { model: Size }, { model: MoldType }, { model: ProductType } ], limit, offset,order: [ ['createdAt', 'DESC'] ] } );

        return res.json( { total, products } );
    }catch(error) {
        console.log(error);
    }
}

export const getLastsProducts = async( req: Request, res: Response ) => {
    try {
        const products: any = await Product.findAll( { include: [ { model: Material }, { model: Size }, { model: MoldType }, { model: ProductType } ], limit: 2, order: [ ['createdAt', 'DESC'] ] } );
        return res.json( products );
    }catch( error ) {
        console.log(error);
    }
}

export const saveProduct = async( req: Request, res: Response ) => {
    try {
        const { name, description, price, productTypeId, sizeId, moldTypeId } = req.body;
        const productId = uuid();
        const file = req.file;
        const profileName = `${Date.now()}_${file?.originalname.substr(-10)}`;
        await saveImage( profileName, file );
        await Product.create( { name, description, price, productTypeId, sizeId, moldTypeId, profile: profileName, productId } );
        return res.json( { msg: 'Producto guardado correctamente.' } );
    }catch( error ) {
        console.log(error);
    }
}