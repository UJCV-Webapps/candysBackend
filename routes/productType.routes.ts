import { Router } from 'express';
import { getProductTypes, saveProductType, updateProductType, deleteProductType } from '../controllers/productType.controller';
import { verifyToken } from '../middlewares/security';
import { onlyRoles } from '../middlewares/rolesValidations';
import { check } from 'express-validator';
import { checkValidations } from '../middlewares/checkValidations';

const router = Router();

router.get( '/', getProductTypes );

router.post( '/',
[
    verifyToken,
    onlyRoles([ 'Administrador' ]),
    check( 'type', 'Se debe especificar el tipo de producto que se desea agregar.' ).not().isEmpty(),
    checkValidations
], saveProductType );

router.put( '/:id',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se deve especificar el ID del tipo de producto' ).not().isEmpty(),
    check( 'type', 'Se debe especificar el nombre del tipo de producto.' ).not().isEmpty(),
    checkValidations
], updateProductType );

router.delete( '/:id',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se deve especificar el ID del tipo de producto' ).not().isEmpty(),
    checkValidations
], deleteProductType );

export default router;