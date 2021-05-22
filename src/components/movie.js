import { Component, createElement } from "../lib/react/index.js";
import styled from "../lib/styled-components.js";

import { renderModal } from "../utils/modal";

const StarStyled = styled.img`
  margin-right: 8px;
`;

class Movie extends Component {
  render() {
    const { poster_path, modal, vote_average } = this.props;
    return createElement("article", {
      onClick: () => {
        if (modal) {
          return;
        }
        renderModal(this.props);
      },
      class: `movie ${vote_average >= 7 ? "recommended" : ""}`,
      children: [
        createElement("img", {
          class: "movie-poster",
          src: `//image.tmdb.org/t/p/w220_and_h330_face${poster_path}`,
        }),
        createElement("span", {
          class: "movie-rate headline-3",
          children: [
            StarStyled({
              src: "/images/star.svg",
            }),
            createElement("span", {}, vote_average),
          ],
        }),
      ],
    });
  }
}

export default Movie;
