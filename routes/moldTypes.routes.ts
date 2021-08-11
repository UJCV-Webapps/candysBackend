import { Router } from "express";
import { getMoldTypes, saveMoldType, updateMold, deleteMold } from '../controllers/moldType.controller';
import { verifyToken } from '../middlewares/security';
import { onlyRoles } from '../middlewares/rolesValidations';
import { check } from 'express-validator';
import { checkValidations } from '../middlewares/checkValidations';

const router = Router();

router.get( '/', getMoldTypes );

router.post( '/',
[
    verifyToken,
    onlyRoles([ 'Administrador' ]),
    check( 'mold', 'Se debe expecificar el molde para continuar.' ).not().isEmpty(),
    checkValidations
], saveMoldType );

router.put( '/:id',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se debe especificar el ID del molde' ).not().isEmpty(),
    check( 'mold', 'Se debe especificar el nombre del molde' ).not().isEmpty(),
    checkValidations
], updateMold );

router.delete( '/:id',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se debe especificar el ID del molde' ).not().isEmpty(),
    checkValidations
], deleteMold );

export default router;