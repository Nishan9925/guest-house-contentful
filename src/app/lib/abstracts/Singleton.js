export default class Singleton {
  static instance
  constructor() {
    if (this.constructor.instance) {
      return this.constructor.instance
    }
    this.constructor.instance = this
  }
  static getInstance(...args) {
    if (!this.instance) {
      this.instance = new this(...args)
    }
    return this.instance
  }
}
