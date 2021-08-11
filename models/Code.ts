import { DataTypes } from 'sequelize';
import db from '../db/connection';

export const Code = db.define( 'code', {
    codeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
} ); 