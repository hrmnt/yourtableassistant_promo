import axios from 'axios';
import {config} from '../kernel/config';

class Api {
  http: any;
  constructor() {
    this.http = axios.create({
      baseURL: config.apiUrl,
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
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

  getShowLookups = (params: any) => {
    return this.http.get('/shows', {
      params,
    });
  };

  getDetailedShow = (id: number) => {
    return this.http.get(`/shows/${id}`);
  };
}

export default new Api();
