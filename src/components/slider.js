import { createElement, Component } from "../lib/react/index.js";
import styled from "../lib/styled-components.js";

import store from "../store.js";
import SliderItem from "./slider-item.js";

const SliderStyled = styled.section`
  margin-top: 24px;
  margin-bottom: 56px;
`;

export default class Slider extends Component {
  mountGlider = () => {
    setTimeout(() => {
      new Glide(".glide", {
        type: "carousel",
        perView: 1.2,
        gap: 24,
        focusAt: "center",
      }).mount();
    }, 0);
  };

  componentDidMount() {
    this.mountGlider();
  }

  render() {
    const { movieList } = store.getState();
    const firstMovies = [];
    let counter = 0;

    movieList.forEach((movie) => {
      counter < 6 && firstMovies.push(movie);
      counter++;
    });

    return SliderStyled({
      children: createElement("div", {
        children: createElement("div", {
          class: "glide",
          children: [
            createElement("div", {
              class: "glide__track",
              ["data-glide-el"]: "track",
              children: createElement("ul", {
                class: "glide__slides",
                children: firstMovies.map((movie) => new SliderItem(movie)),
              }),
            }),
            // Bullets
            createElement("div", {
              class: "glide__bullets",
              ["data-glide-el"]: "controls[nav]",
              children: firstMovies.map((_, index) =>
                createElement("button", {
                  class: "glide__bullet",
                  ["data-glide-dir"]: `=${index}`,
                })
              ),
            }),
            // Arrows
            createElement("div", {
              class: "glide__arrows",
              ["data-glide-el"]: "controls",
              children: [
                createElement("button", {
                  class: "glide__arrow glide__arrow--left",
                  ["data-glide-dir"]: "<",
                }),
                createElement("button", {
                  class: "glide__arrow glide__arrow--right",
                  ["data-glide-dir"]: ">",
                }),
              ],
            }),
          ],
        }),
      }),
    });
  }
}
