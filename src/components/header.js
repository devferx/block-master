import { Component, createElement } from "../lib/react/index.js";
import styled from "../lib/styled-components.js";
import Wrapper from "./wrapper.js";
import store from "../store.js";
import { SEARCH_MOVIE, SET_FILTER } from "../actions/index.js";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  gap: 48px;
  width: 100%;
  height: 112px;
  padding: 24px 0;
  box-sizing: border-box;
`;

const InputContainer = styled.form`
  flex: 1;
  display: flex;
  height: 44px;
`;

const SearchButton = styled.button`
  width: 72px;
  height: 100%;
  padding: 10px 24px;
  border: none;
  border-radius: 0px 4px 4px 0px;
  background-color: var(--primary);
  cursor: pointer;
`;

class Header extends Component {
  state = {
    selected: "all",
  };

  handleChangeFilter = (filter) => {
    this.setState({ selected: filter });
    store.dispatch({
      type: SET_FILTER,
      payload: filter,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("title");
    if (query) {
      return store.dispatch({
        type: SEARCH_MOVIE,
        payload: query,
      });
    }
    return store.dispatch({
      type: SET_FILTER,
      payload: "all",
    });
  };

  render() {
    return Wrapper({
      children: HeaderStyled({
        children: [
          createElement("img", { src: "./images/logo.svg" }),
          createElement(
            "button",
            {
              class: `nav-option text-button ${
                this.state.selected === "all" && "is-selected"
              }`,
              onClick: () => this.handleChangeFilter("all"),
            },
            "Todas"
          ),
          createElement(
            "button",
            {
              class: `nav-option text-button ${
                this.state.selected === "mostValued" && "is-selected"
              }`,
              onClick: () => this.handleChangeFilter("mostValued"),
            },
            "Más valoradas"
          ),
          createElement(
            "button",
            {
              class: `nav-option text-button ${
                this.state.selected === "leastValued" && "is-selected"
              }`,
              onClick: () => this.handleChangeFilter("leastValued"),
            },
            "Menos valoradas"
          ),
          InputContainer({
            onSubmit: this.handleSubmit,
            children: [
              createElement("input", {
                class: "nav-search",
                type: "text",
                name: "title",
                placeholder: "Busca tu pelicula favorita",
              }),
              SearchButton({
                class: "text-button",
                children: createElement("img", {
                  src: "./images/search.svg",
                }),
              }),
            ],
          }),
        ],
      }),
    });
  }
}

export default Header;
