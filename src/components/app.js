import { Component } from "../lib/react/index.js";
import styled from "../lib/styled-components.js";

import Header from "./header.js";
import Slider from "./slider.js";
import MovieList from "./movie-list.js";

const AppStyled = styled.div``;

class App extends Component {
  render() {
    return AppStyled({
      children: [
        new Header(),
        new Slider(),
        new MovieList(),
      ],
    });
  }
}

export default App;
