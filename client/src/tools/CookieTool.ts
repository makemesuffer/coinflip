import cookie from 'js-cookie';

class CookieTool {
  setCookie(
    name: string,
    value: string,
    options: cookie.CookieAttributes
  ): void {
    cookie.set(name, value, options);
  }

  removeCookie(name: string): void {
    cookie.remove(name);
  }

  getCookie(name: string) {
    return cookie.get(name);
  }
}

export default new CookieTool();
