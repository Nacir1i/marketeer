import { OAuth2RequestError } from 'arctic';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import useDatabase from '~/composables/useDatabase';
import useFacebookProvider from '~/composables/useFacebookProvider';
import user from '~/server/db/schema/user';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, 'facebook_oauth_state')?.toString() ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      statusCode: 400,
    });
  }

  const facebookProvider = useFacebookProvider();
  const client = useDatabase();

  try {
    const tokens = await facebookProvider.validateAuthorizationCode(code);
    const url = new URL('https://graph.facebook.com/me');
    url.searchParams.set('access_token', tokens.accessToken);
    url.searchParams.set('fields', ['id', 'name', 'picture', 'email'].join(','));
    const response = await fetch(url);
    const facebookUser: FacebookUser = await response.json();

    const queryRes = await client.db.select().from(user).where(eq(user.facebook_id, facebookUser.id));

    const existingUser = queryRes.at(0);

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize());
      return sendRedirect(event, '/');
    }

    // return facebookUser;

    const userId = generateIdFromEntropySize(10);
    await client.db.insert(user).values({
      id: userId,
      email: facebookUser.email,
      username: facebookUser.name,
      profile_picture: facebookUser.picture,
      facebook_id: facebookUser.id,
    });
    const session = await lucia.createSession(userId, {});
    appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize());
    return sendRedirect(event, '/');
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      throw createError({
        status: 400,
        message: error.message,
      });
    }
    throw createError({
      status: 500,
      message: 'Failed to validate authorization code',
    });
  }
});

interface FacebookUser {
  id: number
  name: string
  email: string
  picture: string
}
