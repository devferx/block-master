import {
  ADD_MOVIES,
  SET_FILTER,
  SEARCH_MOVIE,
  CHANGE_TITLE,
} from "../actions/index.js";

import {
  movieListAsMap,
  getAllIds,
  getLeastValuedIds,
  getMostValuedIds,
} from "../normalize.js";

function filterByTitle(title, movies) {
  const list = [];
  movies.forEach((movie) => {
    if (movie.title.toLowerCase().includes(title.toLowerCase())) {
      list.push(movie.id);
    }
  });
  return list;
}

function findById(id, allIds) {
  const parsedId = parseInt(id, 10);
  if (allIds.includes(parsedId)) {
    return [parsedId];
  }
  return allIds;
}

function searchMovie(query, list, allIds) {
  if (isNaN(query)) {
    return filterByTitle(query, list);
  }
  return findById(query, allIds);
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_MOVIES:
      const movieList = movieListAsMap(payload, state.movieList);
      const all = getAllIds(payload, state.list.all);
      const leastValued = getLeastValuedIds(payload, state.list.leastValued);
      const mostValued = getMostValuedIds(payload, state.list.mostValued);

      return {
        ...state,
        movieList,
        list: { ...state.list, all, leastValued, mostValued },
      };
    case CHANGE_TITLE:
      return { ...state, title: payload };
    case SET_FILTER:
      return { ...state, filter: payload };
    case SEARCH_MOVIE:
      return {
        ...state,
        filter: "search",
        title: "Resultados de busqueda",
        query: payload,
        list: {
          ...state.list,
          search: searchMovie(payload, state.movieList, state.list.all),
        },
      };
    default:
      return state;
  }
};

export default reducer;
