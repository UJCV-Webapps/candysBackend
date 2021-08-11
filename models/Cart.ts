import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const Cart = connection.define('cart', {
    cartId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    }
})