import { getAuthtoken } from "./authStorage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getCurrentUser() {
    const token = await getAuthtoken();

    if(!token){
        return null;
    }

    const response = await fetch(`${API_URL}/api/auth/me`,{
        method:  'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if(response.status=== 401){
        return null;
    }

    if(!response.ok){
        throw new Error('Failed to get current user');
    }

    const data= await response.json();

    return data.user;
}