import { QueryInterface, Transaction, Op } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => {
      const t: Transaction = await queryInterface.sequelize.transaction();
      try {
        await queryInterface.bulkInsert('Product', [
          {
            id: 1,
            name: 'basketball',
            summary: 'This is ball for playing basket',
            details: 'This is detailed description of basketball object',
            type: 'SPORTS'
          },
          {
            id: 2,
            name: 'chicken',
            summary: 'This is food',
            details: 'This is detailed description of chicken foods',
            type: 'OTHER'
          }
        ], { transaction: t });
        await t.commit();
      } catch(err) {
        await t.rollback();
        throw err;
      }
    },

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.bulkDelete('Product', { id: { [Op.in]: [1, 2] } }) as Promise<any>
};