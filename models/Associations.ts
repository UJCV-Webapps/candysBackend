
import { DataTypes } from 'sequelize';
import connection from '../db/connection';
import { User } from './User';
import { Address } from './Address';
import { Role } from './Role';
import { Cart } from './Cart';
import { Order } from './Order';
import { Status } from './Status';
import { Product } from './Product';
import { Material } from './Material';
import { ProductType } from './ProductType';
import { Size } from './Size';
import { MoldType } from './MoldType';
import { OrderDetail } from './OrderDetail';
import { Color } from './Color';
import { Code } from './Code';

export const makeAssoc = async () => {
    //Aqui se definen todas las relaciones de los models declarados

    // 1:1 Users And Roles
    User.belongsTo(Role, { foreignKey: 'roleId' });
    Role.hasOne( User, { foreignKey: 'roleId' } ); 

    // 1:1 Cart And User
    User.hasOne( Cart, { foreignKey: 'userId' } );
    Cart.belongsTo( User, { foreignKey: 'userId' } );

    // 1:M User and Order
    User.hasMany( Order, { foreignKey: 'userId' } );
    Order.belongsTo( User, { foreignKey: 'userId' } );

    // 1:M Address And Order
    Address.hasMany( Order, { foreignKey: 'addressId' } );
    Order.belongsTo( Address, { foreignKey: 'addressId' } );

    // 1:M Order And Status
    Status.hasMany( Order, { foreignKey: 'statusId' } );
    Order.belongsTo( Status, { foreignKey: 'statusId' } );

    // 1:M User and Address
    User.hasMany( Address, { foreignKey: 'userId' } );
    Address.belongsTo( User, { foreignKey: 'userId' } );

    // M:M Product And Material
    Product.belongsToMany( Material, { through: 'materialProducts', foreignKey: 'productId' } );
    Material.belongsToMany( Product, { through: 'materialProducts', foreignKey: 'materialId' } ); 

    // 1:1 Product and ProductType
    Product.belongsTo( ProductType, { foreignKey: 'productTypeId' } );
    ProductType.hasOne( Product, { foreignKey: 'productTypeId' } );

    // 1:1 Size And Product
    Product.belongsTo( Size, { foreignKey: 'sizeId' } );
    Size.hasOne( Product, { foreignKey: 'sizeId' } );

    // 1:1 Product And MoldType
    Product.belongsTo( MoldType, { foreignKey: 'moldTypeId' } );
    MoldType.hasOne( Product, { foreignKey: 'moldTypeId' } );

    // M:M Cart And Product
    const cartProducts = connection.define( 'cartProducts', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        colorId: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.STRING(8),
            allowNull: true
        }
    } );

    Cart.belongsToMany( Product, { through: cartProducts, foreignKey: 'cartId' } );
    Product.belongsToMany( Cart, { through: cartProducts, foreignKey: 'productId' } );

    // M:M Order And Products
    const orderProducts = connection.define( 'orderProducts', {
        orderProductsId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    } );

    Order.belongsToMany( Product, { through: orderProducts, foreignKey: 'orderId' } );
    Product.belongsToMany( Order, { through: orderProducts, foreignKey: 'productId' } );

    // 1:1 OrderDetail And OrderProducts
    OrderDetail.belongsTo( orderProducts, { foreignKey: 'orderProductsId' } );
    orderProducts.hasOne( OrderDetail, { foreignKey: 'orderProductsId' } );

    // M:M OrderDetail And Products
    OrderDetail.belongsToMany( Color, { through: 'colorOrders', foreignKey: 'orderDetailsId' } );
    Color.belongsToMany( OrderDetail, { through: 'colorOrders', foreignKey: 'colorId' } );

    // 1:1 User And Codes
    User.hasOne( Code, { foreignKey: 'userId' } );
    Code.belongsTo( User, { foreignKey: 'userId' } );

    await connection.sync({ alter: true });

    //Seeders
    // Role.create( { role: 'Administrador' } );
    // Role.create( { role: 'Empleado' } );
}