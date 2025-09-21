import 'server-only';
import { cookies } from 'next/headers';
import { auth } from '@/lib/firebase/server';
import type { User } from 'firebase/auth';

const ADMIN_EMAIL = 'shubhamnm671@gmail.com';

export async function getAuthenticatedUser(): Promise<User | null> {
  const token = cookies().get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);
    
    // We can't return the full Firebase Admin user object to the client
    // so we create a simpler object that matches the client-side User type.
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      },
      // These fields are not available in the admin user object but are part of the client User type.
      // We set them to default values.
      isAnonymous: false,
      providerData: [],
      // Make sure to satisfy the User type, these are just illustrative
      // and might need adjustment based on what you use from the User object.
      providerId: 'firebase',
      tenantId: null,
      refreshToken: '',
      delete: async () => {},
      getIdToken: async () => token,
      getIdTokenResult: async () => ({ token, claims: {}, authTime: '', expirationTime: '', issuedAtTime: '', signInProvider: null, signInSecondFactor: null }),
      reload: async () => {},
      toJSON: () => ({}),
    } as unknown as User;

  } catch (error) {
    console.error('Error verifying auth token:', error);
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  return user?.email === ADMIN_EMAIL;
}
