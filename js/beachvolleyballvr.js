import { translations } from "./beachvolleyballvr-translations.js";
import { supportedLanguages, getLanguage, detectLanguage, saveLanguage, initLanguageMenu } from "./language.js";

// Keep the authored Portuguese HTML as a readable fallback without JavaScript.
const translatedAttributes = {
  "data-i18n": null,
  "data-i18n-alt": "alt",
  "data-i18n-aria": "aria-label",
  "data-i18n-content": "content",
};
const entries = Object.entries(translatedAttributes).flatMap(([dataAttribute, attribute]) =>
  [...document.querySelectorAll(`[${dataAttribute}]`)].map(element => ({
    element, attribute, key: element.getAttribute(dataAttribute),
    portuguese: attribute ? element.getAttribute(attribute) : element.textContent,
  }))
);
const dialog = document.querySelector(".image-dialog");
const dialogImage = dialog.querySelector("img");
const dialogCaption = dialog.querySelector(".dialog-caption");
let activeGalleryItem;

function updateDialogCopy() {
  if (!activeGalleryItem) return;
  dialogImage.alt = activeGalleryItem.querySelector("img").alt;
  dialogCaption.textContent = activeGalleryItem.querySelector("[data-i18n]").textContent;
}

const structuredData = document.querySelector('script[type="application/ld+json"]');
const portugueseDescription = JSON.parse(structuredData.textContent)["@graph"]
  .find(entity => entity["@type"] === "VideoGame").description;

function setLanguage(language, persist = false) {
  if (!supportedLanguages.includes(language)) return;
  const text = translations[language] || {};
  const translate = (key, portuguese) => language === "pt" ? portuguese : (text[key] ?? translations.en[key] ?? portuguese);
  for (const { element, attribute, key, portuguese } of entries) {
    const value = translate(key, portuguese);
    if (attribute) element.setAttribute(attribute, value);
    else element.textContent = value;
  }
  const { htmlLang } = getLanguage(language);
  document.documentElement.lang = htmlLang;
  const graph = JSON.parse(structuredData.textContent);
  graph["@graph"].find(entity => entity["@type"] === "WebPage").inLanguage = htmlLang;
  graph["@graph"].find(entity => entity["@type"] === "VideoGame").description = translate("structured_description", portugueseDescription);
  structuredData.textContent = JSON.stringify(graph);
  languageMenu.setActive(language);
  document.querySelectorAll('a[href*="meta.com/"]').forEach(link => {
    link.href = `https://www.meta.com/${language === "pt" ? "pt-br/" : ""}experiences/beach-volleyball-vr/1376538408868746/`;
  });
  updateDialogCopy();
  if (persist) saveLanguage(language);
}

const languageMenu = initLanguageMenu(language => setLanguage(language, true));
setLanguage(detectLanguage("pt"));
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-gallery]").forEach(button => {
  button.addEventListener("click", () => {
    activeGalleryItem = button;
    dialogImage.src = button.dataset.gallery;
    updateDialogCopy();
    dialog.showModal();
  });
});
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
