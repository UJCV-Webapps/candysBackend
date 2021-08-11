import { DataTypes } from 'sequelize';
import connection from '../db/connection';

export const Address = connection.define( 'addresses', {
    addressId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
} );