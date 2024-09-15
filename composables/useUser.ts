import type { User } from 'lucia';

export default function () {
  const user = useState<User | null>('user', () => null);
  return user;
};
