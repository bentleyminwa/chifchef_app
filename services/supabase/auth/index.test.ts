import { afterEach, describe, expect, it, vi } from 'vitest';
import { createQueryBuilder } from '@/test/mocks/supabase';
import { getProfile, signIn, signOut, signUp } from './index';

const { supabaseMock } = vi.hoisted(() => ({
  supabaseMock: {
    from: vi.fn(),
    rpc: vi.fn(),
    auth: {
      getSession: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}));

vi.mock('../client/supabase', () => ({
  supabase: supabaseMock,
}));

describe('supabase auth service', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when a profile is missing', async () => {
    supabaseMock.from.mockReturnValueOnce(
      createQueryBuilder({
        data: null,
        error: { code: 'PGRST116' },
      }),
    );

    await expect(getProfile('user-1')).resolves.toBeNull();
  });

  it('signs in with password credentials', async () => {
    supabaseMock.auth.signInWithPassword.mockResolvedValueOnce({
      data: { session: { access_token: 'token' } },
      error: null,
    });

    await signIn({ email: 'chef@example.com', password: 'secret123' });

    expect(supabaseMock.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'chef@example.com',
      password: 'secret123',
    });
  });

  it('creates a profile row during sign-up when a user is returned', async () => {
    supabaseMock.auth.signUp.mockResolvedValueOnce({
      data: { user: { id: 'user-1' } },
      error: null,
    });
    const profileBuilder = createQueryBuilder({
      data: null,
      error: null,
    });
    supabaseMock.from.mockReturnValueOnce(profileBuilder);

    await signUp({
      email: 'chef@example.com',
      password: 'secret123',
      fullName: 'Chef Ada',
    });

    expect(profileBuilder.upsert).toHaveBeenCalledWith({
      id: 'user-1',
      full_name: 'Chef Ada',
      onboarded: false,
    });
  });

  it('throws when sign-out fails', async () => {
    supabaseMock.auth.signOut.mockResolvedValueOnce({
      error: new Error('unable to sign out'),
    });

    await expect(signOut()).rejects.toThrow('unable to sign out');
  });
});
