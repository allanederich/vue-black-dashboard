import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

export default {
    refStatusAds() {
        return collection(db, 'google_ads_model_status');
    },

    async getStatusAll() {
        try {
            const snapshot = await getDocs(this.refStatusAds());
            if (snapshot.empty) {
              return [];
            } else {
              var objects = snapshot.docs.map((e) => ({
                id: e.id,
                ...e.data(),
              }));
            }
            return objects;
          } catch (error) {
            console.error('get all error', error);
        }
    },
}