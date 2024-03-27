import { db } from '@/firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, query, where } from 'firebase/firestore';
import moment from 'moment';
import store from '@/store/index';

export default {
  refGeneratedAds() {
    return collection(db, 'google_ads_generated_ads');
  },

  async getAll() {
    try {
      const uid = store.getters.getUser.uid;
      const q = query(this.refGeneratedAds(), where("user_id", "==", uid));
      const snapshot = await getDocs(q);
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
        
        value.product_bottle_biggest_anchoring_price = parseFloat(object.product_bottle_biggest_anchoring_price.replace('$', ''));
        value.product_bottle_biggest_price = parseFloat(object.product_bottle_biggest_price.replace('$', ''));
        value.product_bottle_biggest_price_quantity = parseFloat(object.product_bottle_biggest_price_quantity.replace('$', ''));
        value.product_bottle_biggest_total_price = parseFloat(object.product_bottle_biggest_total_price.replace('$', ''));
        value.product_bottle_lowest_price = parseFloat(object.product_bottle_lowest_price.replace('$', ''));
        value.product_bottle_lowest_price_quantity = parseFloat(object.product_bottle_lowest_price_quantity.replace('$', ''));
        value.product_bottle_middle_price = parseFloat(object.product_bottle_middle_price.replace('$', ''));
        value.product_bottle_middle_price_quantity = parseFloat(object.product_bottle_middle_price_quantity.replace('$', ''));
        value.product_comission = parseFloat(object.product_comission.replace('$', ''));
        value.product_guarantee = parseFloat(object.product_guarantee.replace('$', ''));

        value.user_id = store.getters.getUser.uid;

        return await addDoc(this.refGeneratedAds(), value);
    } catch (error) {
        console.log('error', error);
      throw new Error('Não foi possívei criar o objeto!');
    }
  },

  async get(id) {
    try {
        const docRef = doc(db, "google_ads_generated_ads", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.empty) {
            return null;
        } else {
            var returnObject = docSnap.data();
            returnObject.id = docSnap.id;
            return returnObject;
        }
    } catch (error) {
      throw new Error('Objeto não encontrado!');
    }
  },

  async update(object) {
    if (!object.id) {
      throw new Error('Objeto não possui identificador para atualização!');
    }

    try {
      var value = object;
      value.platform_id = object.platform.id;
      value.platform_name = object.platform.name;
      value.status_id = object.status.id;
      value.status_name = object.status.name;
      value.creation_date = moment().format('YYYY-MM-DD HH:mm:ss');
      
      value.product_bottle_biggest_anchoring_price = parseFloat(object.product_bottle_biggest_anchoring_price.replace('$', ''));
      value.product_bottle_biggest_price = parseFloat(object.product_bottle_biggest_price.replace('$', ''));
      value.product_bottle_biggest_price_quantity = parseFloat(object.product_bottle_biggest_price_quantity.replace('$', ''));
      value.product_bottle_biggest_total_price = parseFloat(object.product_bottle_biggest_total_price.replace('$', ''));
      value.product_bottle_lowest_price = parseFloat(object.product_bottle_lowest_price.replace('$', ''));
      value.product_bottle_lowest_price_quantity = parseFloat(object.product_bottle_lowest_price_quantity.replace('$', ''));
      value.product_bottle_middle_price = parseFloat(object.product_bottle_middle_price.replace('$', ''));
      value.product_bottle_middle_price_quantity = parseFloat(object.product_bottle_middle_price_quantity.replace('$', ''));
      value.product_comission = parseFloat(object.product_comission.replace('$', ''));
      value.product_guarantee = parseFloat(object.product_guarantee.replace('$', ''));

      const docRef = doc(db, "google_ads_generated_ads", object.id);
      await updateDoc(docRef, value);
    }
    catch (e) {
      throw e;
    }
  }

//   async update(object) {
//     if (!object.id) {
//       throw new Error('Objeto não possui identificador para atualização!');
//     } else if (!object.name) {
//       throw new Error('Produto deve possuir um nome!');
//     }
//     return this.ref().doc(object.id).update(object);
//   },
};