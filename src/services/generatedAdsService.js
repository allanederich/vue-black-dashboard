import { db } from '@/firebase';
import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore';
import moment from 'moment';

export default {
  refGeneratedAds() {
    return collection(db, 'google_ads_generated_ads');
  },

  async getAll() {
    try {
      const snapshot = await getDocs(this.refGeneratedAds());
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

  async new(object) {
    try {
        var value = object;
        value.platform_id = object.platform.id;
        value.platform_name = object.platform.name;
        value.status_id = object.status.id;
        value.status_name = object.status.name;
        value.creation_date = moment().format('YYYY-MM-DD HH:mm:ss');
        await addDoc(this.refGeneratedAds(), value);
    } catch (error) {
        console.log('error', error);
      throw new Error('Não foi possívei criar o objeto!');
    }
  },

//   async get(id) {
//     try {
//         const snapshot = await this.ref().doc(id).get();
//         if (snapshot.empty) {
//             return null;
//         } else {
//             return snapshot.docs.map((e) => ({
//                 id: e.id,
//                 ...e.data(),
//             }));
//         }
//     } catch (error) {
//       throw new Error('Objeto não encontrado!');
//     }
//   },

//   async update(object) {
//     if (!object.id) {
//       throw new Error('Objeto não possui identificador para atualização!');
//     } else if (!object.name) {
//       throw new Error('Produto deve possuir um nome!');
//     }
//     return this.ref().doc(object.id).update(object);
//   },
};