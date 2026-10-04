import * as SecureStore from 'expo-secure-store';


//just identfiy key
const AUTH_TOKEN_KEY= 'auth_token';

//after login save JWT 
export async function saveAuthToken(token: string) {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

//Stored JWT read
export async function getAuthtoken() {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}


//after logout delete JWT tokens
export async function removeAuthToken() {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}