import { Component } from "../lib/react/index.js";
import styled from '../lib/styled-components.js';

const MovieSliderItemStyled = styled.li`
  position: relative;
  width: 1280px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 32px;
  left: 24px;
`;

const ButtonPrimary = styled.button`
  padding: 10px 24px;
  margin-right: 16px;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background-color: var(--primary);
  box-sizing: border-box;
  cursor: pointer;
`;

const ButtonOutline = styled.button`
  padding: 10px 24px;
  color: var(--primary);
  border-radius: 4px;
  background-color: var(--bg);
  border: 1px solid var(--primary);
  box-sizing: border-box;
  cursor: pointer;
`;

export default class SliderItem extends Component {
  render() {
    const {backdrop_path} = this.props;

    return MovieSliderItemStyled({
      children: [
        MovieImage({ src: `//image.tmdb.org/t/p/original${backdrop_path}` }),
        ButtonsContainer({
          children: [
            ButtonPrimary({class: "text-button"}, "VER AHORA"),
            ButtonOutline({class: "text-button"}, "VER DESPUÉS")
          ],
        }),
      ],
    });
  }
}