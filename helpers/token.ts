import jwt from 'jsonwebtoken';

export const getToken = ( userId: string ) => {
    return jwt.sign( { userId }, process.env.JWT_SECRET!, { expiresIn: '15d' } );
}