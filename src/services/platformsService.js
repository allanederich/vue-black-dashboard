import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
    ref() {
        return collection(db, 'google_ads_platforms');
    },

    async getAll() {
        try {
            const snapshot = await getDocs(this.ref());
            if (snapshot.empty) {
                return [];
            } else {
                return snapshot.docs.map((e) => ({
                    id: e.id,
                    ...e.data(),
                }));
            }
        } catch (error) {
            console.error('get all error', error);
        }
    }
}