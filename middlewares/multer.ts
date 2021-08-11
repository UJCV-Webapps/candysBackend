
import multer from 'multer';

const storage = multer.memoryStorage();

export const photosDisk = multer( { storage } );