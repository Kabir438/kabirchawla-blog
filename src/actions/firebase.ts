import admin from 'firebase-admin';

// Initialize Firebase Admin SDK using environment variables
const firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Replace escaped newlines
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

// Validate required environment variables
const missingVars = Object.entries(firebaseConfig).filter(
    ([, value]) => !value
).map(([key]) => key);

if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
}

if (admin.apps.filter(Boolean).length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
        // Optionally, specify other properties like databaseURL or storageBucket
        // databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com',
        // storageBucket: '<YOUR_PROJECT_ID>.appspot.com',
    });
}

// Example: Using Firestore
export const db = admin.firestore();
export default admin;