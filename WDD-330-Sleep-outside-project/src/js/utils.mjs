// src/js/utils.mjs
export function renderListWithTemplate(templateFn, parentElement, list) {
  if (!parentElement) return;
  parentElement.innerHTML = "";
  const html = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML("afterbegin", html);
}
