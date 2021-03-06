import { createStore } from "./redux/index.js";

import reducer from "./reducers/index.js";
import movies from "./movies.js";
import {
  movieListAsMap,
  getAllIds,
  getMostValuedIds,
  getLeastValuedIds,
} from "./normalize.js";

const initialState = {
  title: "Todas las peliculas",
  movieList: movieListAsMap(movies),
  filter: "all",
  query: "",
  list: {
    all: getAllIds(movies),
    mostValued: getMostValuedIds(movies),
    leastValued: getLeastValuedIds(movies),
  },
};

const store = createStore(reducer, initialState);

export default store;
