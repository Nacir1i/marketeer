import { Facebook } from 'arctic';

let facebookProvider: Facebook | null = null;

export default function () {
  const config = useRuntimeConfig();
  if (!config.facebookId || !config.facebookSecret) {
    throw Error('Facebook credentials not found');
  }

  if (facebookProvider) return facebookProvider;

  facebookProvider = new Facebook(config.facebookId as string, config.facebookSecret as string, 'http://localhost:3000/login/facebook/callback');

  return facebookProvider;
};
