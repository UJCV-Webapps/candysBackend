import { DataTypes } from 'sequelize';

import connection from '../db/connection';

export const Product = connection.define('products', {
    productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    avaliable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    profile: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
});