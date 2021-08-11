import { Router } from "express";
import { check } from "express-validator";
import { getMaterials, saveMaterial, deleteMaterial, updateMaterial } from '../controllers/material.controller';
import { verifyToken } from '../middlewares/security';
import { onlyRoles } from '../middlewares/rolesValidations';
import { checkValidations } from '../middlewares/checkValidations';

const router = Router();

router.get( '/',
[
    verifyToken,
    onlyRoles([ 'Administrador', 'Cliente' ])
] ,getMaterials );

router.post( '/',
[
    verifyToken,
    onlyRoles([ 'Administrador' ]),
    check( 'material', 'Se debe especificar el nombre del material' ).not().isEmpty(),
    checkValidations
], saveMaterial );

router.put( '/:id',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se debe especificar el ID del material' ).not().isEmpty(),
    checkValidations
], updateMaterial )

router.delete( '/:id',
[
    verifyToken,
    onlyRoles( [ 'Administrador' ] ),
    check( 'id', 'Se debe especificar el ID del material' ).not().isEmpty(),
    checkValidations
], deleteMaterial );

export default router;