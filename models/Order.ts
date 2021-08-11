import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const Order = connection.define('orders', {
    orderId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});