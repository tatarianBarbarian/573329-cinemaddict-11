export const render = (container, element) => {
  container.appendChild(element);
};

export const htmlStringToElement = (html) => {
  const template = document.createElement(`template`);
  const trimmedHtml = html.trim();
  template.innerHTML = trimmedHtml;

  return template.content.firstChild;
};
