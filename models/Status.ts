import { DataTypes } from 'sequelize';
import connection from '../db/connection';

export const Status = connection.define( 'status', {
    statusId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
} );