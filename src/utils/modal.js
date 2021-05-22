import { Component, createElement } from "../lib/react/";
import styled from "../lib/styled-components";

import Wrapper from "../components/wrapper";
import Movie from "../components/movie";
import { render } from "../lib/react-dom";

const CloseButtonContainer = styled.div`
  grid-area: close;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MovieContainer = styled.div`
  grid-area: picture;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const MovieStyled = styled.div`
  width: 55%;
  perspective-origin: bottom center;
  transform: perspective(1000px) rotateX(55deg) rotateZ(-40deg);
`;

const MovieOverviewContainer = styled.div`
  grid-area: overview;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  z-index: 999;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  margin-top: 40px;
`;

const ButtonPrimary = styled.button`
  flex: 1;
  padding: 10px 24px;
  margin-right: 16px;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background-color: var(--primary);
  box-sizing: border-box;
  cursor: pointer;
`;

const ButtonOutline = styled.button`
  flex: 1;
  padding: 10px 24px;
  color: var(--primary);
  border-radius: 4px;
  background-color: var(--bg);
  border: 1px solid var(--primary);
  box-sizing: border-box;
  cursor: pointer;
`;

export function renderModal(movie) {
  render(new Modal(movie), document.getElementById("modal"));
}

class Modal extends Component {
  render() {
    const { title, overview, release_date, original_language, vote_average } =
      this.props;
    const modalContent = createElement("section", {
      class: "modal",
      children: createElement("div", {
        children: Wrapper({
          class: "modal-container",
          children: [
            CloseButtonContainer({
              children: CloseButton({
                onClick: () =>
                  document.getElementById("modal").removeChild(modalContent),
                children: createElement("img", {
                  src: "/images/close.svg",
                  alt: "Close",
                }),
              }),
            }),
            MovieContainer({
              children: MovieStyled({
                children: new Movie({ ...this.props, modal: true }),
              }),
            }),
            MovieOverviewContainer({
              children: [
                createElement("h3", { class: "headline-1" }, title),
                createElement(
                  "p",
                  { class: "overview body-1 regular" },
                  overview
                ),
                createElement(
                  "p",
                  { class: "overview body-1 regular color-grey" },
                  `${release_date} • ${original_language} • ${vote_average}`
                ),
                ButtonsContainer({
                  children: [
                    ButtonPrimary({ class: "text-button" }, "VER AHORA"),
                    ButtonOutline({ class: "text-button" }, "VER DESPUÉS"),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    });

    return modalContent;
  }
}
