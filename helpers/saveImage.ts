import sharp from "sharp"
import path from 'path';

export const saveImage = async( name: string, file: Express.Multer.File | undefined ) => {
    await sharp( file?.buffer ).jpeg( { quality: 50 } ).toFile( path.join( __dirname, '..', 'public', 'photos', name ) );
}