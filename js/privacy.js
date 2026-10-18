import { translations } from "./privacy-translations.js";
import { supportedLanguages, getLanguage, detectLanguage, saveLanguage, initLanguageMenu } from "./language.js";

// English is authored in privacypolice/index.html and stays readable without JavaScript.
const translatedAttributes = {
  "data-i18n": null,
  "data-i18n-aria": "aria-label",
  "data-i18n-content": "content",
};
const entries = Object.entries(translatedAttributes).flatMap(([dataAttribute, attribute]) =>
  [...document.querySelectorAll(`[${dataAttribute}]`)].map(element => ({
    element, attribute, key: element.getAttribute(dataAttribute),
    english: attribute ? element.getAttribute(attribute) : element.textContent,
  }))
);

function setLanguage(language, persist = false) {
  if (!supportedLanguages.includes(language)) return;
  const text = translations[language] || {};
  for (const { element, attribute, key, english } of entries) {
    const value = text[key] ?? english;
    if (attribute) element.setAttribute(attribute, value);
    else element.textContent = value;
  }
  document.documentElement.lang = getLanguage(language).htmlLang;
  languageMenu.setActive(language);
  if (persist) saveLanguage(language);
}

const languageMenu = initLanguageMenu(language => setLanguage(language, true));
// Store reviewers and visitors without a supported language get the authored English policy.
setLanguage(detectLanguage("en"));
document.getElementById("year").textContent = new Date().getFullYear();
