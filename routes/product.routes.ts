import { Router } from "express";
import { getAllProducts, saveProduct, getLastsProducts } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/security';
import { onlyRoles } from '../middlewares/rolesValidations';
import { check } from "express-validator";
import { checkValidations } from '../middlewares/checkValidations';
import { photosDisk } from '../middlewares/multer';

const router = Router();

router.get( '/page/:page', getAllProducts );
router.get( '/lasts', getLastsProducts );
router.post( '/',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    photosDisk.single( 'profile' ),
    check( 'name', 'Se debe especificar el nombre del producto.' ).not().isEmpty(),
    check( 'description', 'Se debe especificar la descrioción del producto.' ).not().isEmpty(),
    check( 'price', 'Se debe especificar el precio del producto' ).not().isEmpty(),
    check( 'productTypeId', 'Se debe especificar el tipo de producto.' ).not().isEmpty(),
    check( 'sizeId', 'Se debe especificar la talla del producto.' ).not().isEmpty(),
    check( 'moldTypeId', 'Se debe especificar el tipo de molde del producto.' ).not().isEmpty(),
    checkValidations
], saveProduct );

export default router;