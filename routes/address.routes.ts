import { Router } from "express";
import { verifyToken } from '../middlewares/security';
import { hasOneAddress, addUserAddress } from '../controllers/address.controller';
import { check } from "express-validator";
import { checkValidations } from '../middlewares/checkValidations';

const router = Router();

router.get( '/', 
[
    verifyToken
], hasOneAddress );

router.post( '/',
[
    verifyToken,
    check( 'address', 'Se debe especificar la dirección a agregar' ).not().isEmpty(),
    checkValidations
], addUserAddress );

export default router;