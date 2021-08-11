import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashPassword = ( plainPassword: string ) => {
    const hashedPassword = bcrypt.hashSync( plainPassword, bcrypt.genSaltSync() );
    return hashedPassword;
}

export const matchPassword = ( plainPassword: string, hashPassword: string ) => {
    const result = bcrypt.compareSync( plainPassword, hashPassword );
    return result;
}

export const getRandomToken = (): Promise<string> => {
    return new Promise( ( resolve, reject ) => {
        crypto.randomBytes( 32, function( err, buffer ) {
            if( err ) {
                reject( err );
            }
            resolve( buffer.toString( 'hex' ) ) 
        } );
    } );
}