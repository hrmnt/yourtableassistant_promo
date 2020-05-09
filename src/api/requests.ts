import firestore from '@react-native-firebase/firestore';

import {convertQuery} from 'src/utils/data-types';

class Api {
  http: any;
  constructor() {
    this.http = firestore();
  }

  addHeader = (key: any, value: any) => {
    this.http.defaults.headers = {
      ...this.http.defaults.headers,
      [key]: value,
    };
  };

  removeHeader = (key: string) => {
    if (key in this.http.defaults.headers) {
      delete this.http.defaults.headers[key];
    }
  };

  getShowLookups = async () => {
    const items = await this.http
      .collection('itemType')
      .get()
      .then((querySnapshot: any) => {
        return convertQuery(querySnapshot);
      });

    return items;
  };

  getDetailedShow = async (id: string) => {
    const items = await this.http
      .collection('items')
      .where('itemTypeId', '==', id)
      .get()
      .then((querySnapshot: any) => {
        return convertQuery(querySnapshot);
      });

    return items;
  };

  writeUserData = async (user: any) => {
    await this.http
      .collection('users')
      .doc(user.uid)
      .set({...user});
  };

  makeOrder = async (orderList: any) => {
    return await this.http
      .collection('orders')
      .add(orderList)
      .then(() => 'Success')
      .catch(() => 'Error');
  };
}

export default new Api();
