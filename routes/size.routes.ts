import { Router } from "express";
import { getSizes, saveSize, updateSize, deleteSize } from '../controllers/size.controller';
import { verifyToken } from '../middlewares/security';
import { onlyRoles } from '../middlewares/rolesValidations';
import { check } from 'express-validator';
import { checkValidations } from '../middlewares/checkValidations';

const router = Router();

router.get( '/', getSizes );

router.post( '/',
[
    verifyToken,
    onlyRoles([ 'Administrador' ]),
    check( 'size', 'Se debe especificar el tamaño a registrar' ).not().isEmpty(),
    checkValidations
], saveSize );

router.put( '/:id', [
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se debe especificar el ID de la talla' ).not().isEmpty(),
    check( 'size', 'Se debe especificar el tamaño a registrar' ).not().isEmpty(),
    checkValidations
], updateSize );

router.delete( '/:id',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se debe especificar el ID de la talla' ).not().isEmpty(),
    checkValidations
], deleteSize );

export default router;