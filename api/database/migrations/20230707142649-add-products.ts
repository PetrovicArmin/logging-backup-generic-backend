import { QueryInterface, DataTypes, Transaction } from 'sequelize';

enum ProductType {
  SPORTS="SPORTS",
  SCIENCE="SCIENCE",
  MOVIES="MOVIES",
  MUSIC="MUSIC",
  ENTERTAINMENT="ENTERTAINMENT",
  OTHER="OTHER"
};

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => {
      const t: Transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.createTable('Product', {
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
              isIn: [Object.values(ProductType)]
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
        }, { transaction: t });

        await queryInterface.addIndex('Product', ['type'], { transaction: t });

        await t.commit();
      } catch(err) {
        await t.rollback();
        throw err;
      }
    },

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.dropTable('Product')
};