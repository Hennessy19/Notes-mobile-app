import {Client, Databases, Account } from 'react-native-appwrite';
import {Platform} from 'react-native';

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your API Endpoint
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your project ID
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID, // Your database ID
    col: {
        notes: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID, // Your collection ID
    }
}

// console.log("Appwrite config:", config);

const client = new Client()
    .setEndpoint(config.endpoint) // Your API Endpoint
    .setProject(config.projectId); // Your project ID

switch (Platform.OS) {
    case 'ios':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_IOS_BUNDLE_ID)
        break;
    case 'android':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_ANDROID_BUNDLE_ID); // Use this for self-signed certificates
        break;
    default:
        break;
}

const database = new Databases(client);
const account = new Account(client);

export { database, config, client, account };
