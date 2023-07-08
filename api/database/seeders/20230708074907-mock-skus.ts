import { QueryInterface, Transaction, Op } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => {
      const t: Transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.bulkInsert('Sku', [
          {
            sku_code: '11111111',
            weight: 2.3,
            color: 'yellow',
            product_id: 1,
            country_of_origin: 'USA',
            price: 20.0,
            quantity_in_stock: 10
          },
          {
            sku_code: '22222222',
            weight: 2.3,
            color: 'red',
            product_id: 1,
            country_of_origin: 'BA',
            price: 15.0,
            quantity_in_stock: 100
          },
          {
            sku_code: '33333333',
            weight: 2.3,
            color: 'black',
            product_id: 2,
            country_of_origin: 'CHINA',
            price: 2.0,
            quantity_in_stock: 24
          },
          {
            sku_code: '44444444',
            weight: 2.3,
            color: 'purple',
            product_id: 2,
            country_of_origin: 'TANZANIA',
            price: 2.0,
            quantity_in_stock: 100
          }
        ], { transaction: t });
        await t.commit();
      } catch(err) {
        await t.rollback();
        throw err;
      }
    },

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.bulkDelete('Sku', { "sku_code": { [Op.in]: ['11111111', '22222222', '33333333', '44444444'] } }) as Promise<any>
};