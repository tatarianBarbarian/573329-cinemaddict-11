export const htmlStringToElement = (html) => {
  const template = document.createElement(`template`);
  const trimmedHtml = html.trim();
  template.innerHTML = trimmedHtml;

  return template.content.firstChild;
};
