import { API_KEY } from "./constants.js";
class API {
  baseAPI = "https://api.themoviedb.org/3";

  constructor(API_KEY) {
    this.API_KEY = API_KEY;
  }

  get discoverMovie() {
    return `${this.baseAPI}/discover/movie?api_key=${this.API_KEY}&language=es`;
  }

  async moviePage(page) {
    const response = await fetch(`${this.discoverMovie}&page=${page}`);
    const data = await response.json();
    return data;
  }
}

export default new API(API_KEY);
