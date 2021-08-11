import { Router } from "express";
import { check } from "express-validator";
import { checkValidations } from '../middlewares/checkValidations';
import { userSignIn, userSignUp, getUserProfile, getNavbar, sendCodeToEmail, verifyRecoveryCode, changePassword, verifyAccount } from '../controllers/auth.controller';
import { isEmailRegistered } from '../middlewares/dbValidations';
import { verifyToken } from '../middlewares/security';

const router = Router();

router.post( '/signup',
[
    check( 'name', 'Ingresa tu nombre para continuar' ).not().isEmpty(),
    check( 'phone', 'El número de telefono es obligatorio' ).not().isEmpty(),
    check( 'email', 'El correo electrónico es obligatorio' ).not().isEmpty(),
    check( 'email', 'Correo electrónico no valido' ).isEmail(),
    check( 'email' ).custom( isEmailRegistered ),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    checkValidations
], userSignUp );

router.post( '/signin',
[
    check( 'email', 'El correo electrónico es obligatorio' ).not().isEmpty(),
    check( 'email', 'Correo electrónico no valido' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    checkValidations
], userSignIn );

router.get( '/profile',
[
    verifyToken
], getUserProfile );

router.get( '/navbar',
[
    verifyToken
], getNavbar );

router.post( '/sendCode',
[
    check( 'email', 'El correo electrónico es necesario.' ).not().isEmpty(),
    check( 'email', 'Correo electrónico con formato incorrecto.' ).isEmail(),
    checkValidations
], sendCodeToEmail );

router.post( '/verifyCode',
[
    check( 'userId', 'Se necesita especificar el ID del usuario.' ).not().isEmpty(),
    check( 'code', 'Se debe especificar el código de verificación.' ).not().isEmpty(),
    checkValidations
], verifyRecoveryCode );

router.post( '/changePassword',
[
    check( 'password', 'Se debe especificar la contraseña.' ).not().isEmpty(),
    check( 'userId', 'Se debe especificar el userId' ).not().isEmpty(),
    checkValidations
], changePassword );

router.get( '/verify', verifyAccount );

export default router;