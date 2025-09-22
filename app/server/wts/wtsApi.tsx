'use server';

import { WtsContact } from "@/app/models/WtsContact";

export const getWtsContacts = async (sessionId: string): Promise<WtsContact[]> => {
    try {
        console.log('Fetching contacts for session:', `${process.env.NEXT_PUBLIC_API_URL}${sessionId}`);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${sessionId}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
        });

            console.log("cdsc" + response.statusText);

        const data = await response.json();
        // console.log("responseresponse" + data);

        return data;

    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error; // Re-throw to handle it in the component
    }
}  