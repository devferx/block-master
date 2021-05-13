import { Component, createElement } from "../lib/react/index.js";
import styled from "../lib/styled-components.js";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  height: 80vh;
`;

export default class NotFound extends Component {
  render() {
    return NotFoundContainer({
      children: [
        createElement("img", {
          src: "/images/not-found.svg",
          alt: "Not Found",
        }),
        createElement(
          "h3",
          { class: "headline-1" },
          `No hay resultados para "${this.props.query}"`
        ),
      ],
    });
  }
}
