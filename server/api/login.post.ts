import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';
import user from '../db/schema/user';
import { lucia } from '../utils/auth';
import useDatabase from '~/composables/useDatabase';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
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

  const existingUser = (await client.db.select().from(user).where(eq(user.email, data.email)))[0];
  if (!existingUser) {
    throw createError({
      statusCode: 400,
      message: 'Incorrect username or password',
    });
  }

  const isPasswordValid = await verify(existingUser.password, data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      message: 'Incorrect username or password',
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize());
});
