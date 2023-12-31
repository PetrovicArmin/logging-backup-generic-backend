import sequelizeConnection from "../config.js";
import { ISkuInsertRequest } from "../request/skuInsertRequest.js";
import { 
    BelongsToGetAssociationMixin,
    DataTypes, 
    Model 
} from "sequelize";
import { Product } from "./product.js";

export interface ISkuDB {
    id: number;
    weight?: number;
    color?: string;
    skuCode: string;
    productId: number;
    countryOfOrigin?: string;
    price: number;
    quantityInStock: number;
    createdAt: Date;
    updatedAt: Date;
};

export const skuDBProperties: string[] = ['id', 'weight', 'color', 'skuCode', 'productId', 'countryOfOrigin', 'price', 'quantityInStock', 'createdAt', 'updatedAt'];

export class Sku extends Model<ISkuDB, ISkuInsertRequest> implements ISkuDB {
    declare id: number;
    declare weight?: number;
    declare color?: string;
    declare skuCode: string;
    declare productId: number;
    declare countryOfOrigin?: string;
    declare price: number;
    declare quantityInStock: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    declare getProduct: BelongsToGetAssociationMixin<Product>
};

Sku.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      weight: {
        type: DataTypes.DOUBLE,
        validate: {
          isNumeric: true,
          min: 0
        }
      },
      color: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 1000],
          is: /^[A-Za-z\s]*$/ //only spaces and letters
        } 
      },
      skuCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [8, 8],
          isAlphanumeric: true
        }, //manually check if value already exists.
        field: 'sku_code'
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true
        },
        field: 'product_id'
      },
      countryOfOrigin: {
        type: DataTypes.STRING,
        field: 'country_of_origin'
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 0
        }
      },
      quantityInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0
        },
        field: 'quantity_in_stock'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'updated_at'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'created_at'
      }
}, { sequelize: sequelizeConnection, tableName: 'Sku' });