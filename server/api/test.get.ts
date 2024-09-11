import test from '../db/schema/test';
import useDatabase from '~/composables/useDatabse';

export default defineEventHandler(async (_event) => {
  const client = useDatabase();

  try {
    const res = await client.db.select().from(test);

    return res;
  } catch (error) {
    console.error('get error:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});
