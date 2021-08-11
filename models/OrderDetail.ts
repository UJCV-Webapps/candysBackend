import { DataTypes } from 'sequelize';
import connection from '../db/connection';

export const OrderDetail = connection.define( 'orderDetails', {
    orderDetailsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    petName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    ownerName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    ownerPhone: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
} )