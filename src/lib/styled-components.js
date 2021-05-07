import { createElement } from "./react/index.js";

const styled = {};

const elements = [
  "h1",
  "h2",
  "h3",
  "p",
  "li",
  "div",
  "section",
  "img",
  "article",
  "footer",
  "header",
  "form",
  "input",
  "button",
  "select",
  "option",
];

function buildStyles(strings, dynamicValues, props) {
  let style = strings.slice();
  dynamicValues.forEach((value, index) => {
    style[index] += value(props);
  });

  return style.join("");
}

elements.forEach((tag) => {
  styled[tag] = function (styles, ...dynamicsValues) {
    return function (props, content) {
      const style = buildStyles(styles, dynamicsValues, props);
      return createElement(tag, { ...props, style }, content);
    };
  };
});

export default styled;
