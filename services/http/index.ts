import { OPENBOOK_API_URL } from "config/endpoints";
import { OPENBOOK_API_KEY_NAME } from "pages/settings/index.page";

// Can be extended later to add further functionalities like token handling, intercepting requests, and responses .. etc
export class HttpService {
  public OPENBOOK_API_KEY = "";
  public openBookHeaders = {};
  private defaultHeaders = { "Content-Type": "application/json" };

  constructor() {
    (async () => {
      this.OPENBOOK_API_KEY = (await global.localStorage?.getItem(OPENBOOK_API_KEY_NAME)) as string;
      this.openBookHeaders = {
        Authorization: "Bearer " + this.OPENBOOK_API_KEY,
      };
    })();
  }

  public async get<T>(url: string, params?: any) {
    let options: any = { method: "GET", headers: new Headers({ ...this.defaultHeaders }) };
    if (url.includes(OPENBOOK_API_URL!)) {
      options = { ...options, headers: new Headers({ ...this.defaultHeaders, ...this.openBookHeaders }) };
    }
    try {
      const response = await fetch(url + `${params ? "?" : ""}${new URLSearchParams(params)}`, options);
      return response.json();
    } catch (e) {
      console.error("error", e);
    }
  }

  public async post<T>(url: string, payload?: any) {
    let options: any = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({ ...this.defaultHeaders }),
    };
    if (url.includes(OPENBOOK_API_URL!)) {
      options = { ...options, headers: new Headers({ ...this.defaultHeaders, ...this.openBookHeaders }) };
    }
    try {
      const response = await fetch(url, options);
      return response.json();
    } catch (e) {
      console.error("error", e);
    }
  }

  public async patch<T>(url: string, payload?: any) {
    let options: any = {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: new Headers({ ...this.defaultHeaders }),
    };
    if (url.includes(OPENBOOK_API_URL!)) {
      options = { ...options, headers: new Headers({ ...this.defaultHeaders, ...this.openBookHeaders }) };
    }
    try {
      const response = await fetch(url, options);
      return response.json();
    } catch (e) {
      console.error("error", e);
    }
  }

  public async delete<T>(url: string) {
    let options: any = {
      method: "DELETE",
      headers: new Headers({ ...this.defaultHeaders }),
    };
    if (url.includes(OPENBOOK_API_URL!)) {
      options = { ...options, headers: new Headers({ ...this.defaultHeaders, ...this.openBookHeaders }) };
    }
    try {
      const response = await fetch(url, options);
      return response.json();
    } catch (e) {
      console.error("error", e);
    }
  }
}

export const httpService = new HttpService();
