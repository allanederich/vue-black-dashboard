import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

export default {
    refStatusAds() {
        return collection(db, 'google_ads_model_status');
    },
    refTitleAds() {
      return collection(db, 'google_ads_model_titles');
    },
    refDescriptionAds() {
      return collection(db, 'google_ads_model_descriptions');
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
    async getTitlesAll() {
      try {
          const snapshot = await getDocs(this.refTitleAds());
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
    async getDescriptionsAll() {
      try {
          const snapshot = await getDocs(this.refDescriptionAds());
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