import z from 'zod';
import test, { type NewTest } from '../db/schema/test';
import useDatabase from '~/composables/useDatabase';

const schema: z.ZodType<NewTest> = z.object({
  name: z.string(),
});

export default defineEventHandler(async (event) => {
  const client = useDatabase();
  const validationResult = await readValidatedBody(event, schema.safeParse);

  if (!validationResult.success) {
    const formattedError = validationResult.error.format();

    console.error('Error when validating request body', formattedError);
    throw createError({
      statusCode: 400,
      message: formattedError._errors[0],
    });
  }

  const data = validationResult.data;

  try {
    await client.db.insert(test).values(data);

    return;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
});
