import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './../config';
import { IProductInsertRequest } from '../request/productInsertRequest';

export interface IProductDB {
    id: number;
    name: string;
    summary?: string;
    details?: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
};

export class Product extends Model<IProductDB, IProductInsertRequest> implements IProductDB {
    declare id: number;
    declare name: string;
    declare summary?: string; 
    declare details?: string;
    declare type: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
};

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [3, 10000],
          is: /^[A-Za-z\s]*$/ //only spaces and letters
        }
      },
      summary: DataTypes.STRING,
      details: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: ["SPORTS","SCIENCE","MOVIES","MUSIC","ENTERTAINMENT","OTHER"] as any[]
        }
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
}, { sequelize: sequelizeConnection });