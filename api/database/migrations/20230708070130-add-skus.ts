import { QueryInterface, DataTypes, Transaction } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => {
      const t: Transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.createTable('Sku', {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          weight: {
            type: DataTypes.DOUBLE,
            validate: {
              isNumeric: true,
              isIn: [0.1, 10000] as any[]
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
              isIn: [0.1, 10000] as any[]
            }
          },
          quantityInStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isInt: true,
              isin: [0, 10000] as any[]
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
        }, { transaction: t });

        await queryInterface.addConstraint('Sku', {
          fields: ['product_id'],
          type: 'foreign key',
          references: { 
            table: 'Product',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
          transaction: t
        });

        await t.commit();
      } catch(err) {
        await t.rollback();
        throw err;
      }
    },

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.dropTable('Sku')
};