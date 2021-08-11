import { Code } from '../models/Code';
import moment from 'moment';

export const saveCodeToUser = async( userId: string ) => {
    try {
        let codeGenerated = '';
        for( let i = 0; i < 6; i++ ) {
            const number = Math.floor( Math.random()*9 );
            codeGenerated += number.toString();
        }
        const userCode: any = await Code.findOne( { where: { userId } } );
        if( userCode ) {
            await userCode.destroy();
        }
        const expiresAt = moment().add( 5, 'd' );
        await Code.create( { code: codeGenerated, expiresAt, userId } );

        return codeGenerated;
    }catch( error ) {
        console.log(error);
    }
}