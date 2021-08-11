import { DataTypes } from 'sequelize';
import connection from '../db/connection';

export const Style = connection.define( 'styles', {
    styleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    style: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
} );