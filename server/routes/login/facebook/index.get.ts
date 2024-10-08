import { generateState } from 'arctic';
import useFacebookProvider from '~/composables/useFacebookProvider';

export default defineEventHandler(async (event) => {
  const facebookProvider = useFacebookProvider();
  const state = generateState();
  const url = await facebookProvider.createAuthorizationURL(state);

  setCookie(event, 'facebook_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return sendRedirect(event, url.toString());
});
