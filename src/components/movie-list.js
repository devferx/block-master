import { Component, createElement } from "../lib/react/index.js";
import styled from "../lib/styled-components.js";

import Wrapper from "./wrapper.js";
import Movie from "./movie.js";
import store from "../store.js";
import api from "../api.js";
import { ADD_MOVIES } from "../actions/index.js";
// import movies from "../movies.js";

const MovieListStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 220px));
  justify-content: space-between;
  box-sizing: border-box;
  gap: 1em;
  margin-top: 48px;
`;

class MovieList extends Component {
  state = {
    page: 1,
  };

  getPage = async (page) => {
    const { results } = await api.moviePage(page);
    store.dispatch({
      type: ADD_MOVIES,
      payload: results,
    });
  };

  handleIntersection = ([entry]) => {
    if (entry.isIntersecting) {
      this.getPage(this.state.page);
      this.setState({
        page: this.state.page + 1,
      });
      console.log("traer nueva página");
    }
  };

  componentDidMount() {
    // this.getPage(this.state.page);
    store.subscribe(() => {
      this.setState();
    });
    const observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: "50px",
    });
    observer.observe(window.intersector);
  }

  render() {
    const state = store.getState();
    const moviesListId = state.list[state.filter];
    const movieList = state.movieList;

    return Wrapper({
      children: [
        createElement("h3", { class: "headline-1" }, "Todas las peliculas"),
        MovieListStyled({
          children: moviesListId.map((id) => new Movie(movieList.get(id))),
        }),
      ],
    });
  }
}

export default MovieList;
