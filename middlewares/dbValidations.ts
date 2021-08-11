import { User } from '../models/User';

export const isEmailRegistered = async( email: string ) => {

    const user = await User.findOne( { where: { email } } );
    
    if( user ) {
        throw new Error( 'Correo electrónico ya registrado' );
    }

}