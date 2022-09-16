class Ajax {
  ajax: XMLHttpRequest;
  constructor() {
    this.ajax = new XMLHttpRequest();
  }

  async send(method: string, url: string) {
    return new Promise((resolve, reject) => {
      this.ajax.open(method, url);
      this.ajax.onload = () => resolve(JSON.parse(this.ajax.response));
      this.ajax.onerror = (err) => {
        console.log(err);
        reject({
          status: this.ajax.status,
          message: this.ajax.statusText,
        });
      };

      this.ajax.send();
    });
  }
}

export default Ajax;