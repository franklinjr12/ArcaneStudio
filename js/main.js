import { translations, defaultLanguage } from "./translations.js";
import {
  supportedLanguages,
  getLanguage,
  detectLanguage,
  saveLanguage,
  initLanguageMenu,
} from "./language.js";

let currentLanguage = defaultLanguage;

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function applyText(selector, attr, value) {
  document.querySelectorAll(selector).forEach((el) => {
    const key = el.getAttribute(attr);
    if (key && value[key] != null) {
      if (attr === "data-i18n") {
        el.textContent = value[key];
      } else if (attr === "data-i18n-placeholder") {
        el.placeholder = value[key];
      } else if (attr === "data-i18n-aria") {
        el.setAttribute("aria-label", value[key]);
      } else if (attr === "data-i18n-alt") {
        el.setAttribute("alt", value[key]);
      } else if (attr === "data-i18n-content") {
        el.setAttribute("content", value[key]);
      }
    }
  });
}

function renderLanguage(language) {
  const text = translations[language] || translations[defaultLanguage];
  currentLanguage = language;

  document.documentElement.lang = getLanguage(language).htmlLang;

  applyText("[data-i18n]", "data-i18n", text);
  applyText("[data-i18n-placeholder]", "data-i18n-placeholder", text);
  applyText("[data-i18n-aria]", "data-i18n-aria", text);
  applyText("[data-i18n-alt]", "data-i18n-alt", text);
  applyText("[data-i18n-content]", "data-i18n-content", text);

  languageMenu.setActive(language);
}

function setLanguage(language) {
  if (!supportedLanguages.includes(language)) return;
  saveLanguage(language);
  renderLanguage(language);
}

const languageMenu = initLanguageMenu(setLanguage);
renderLanguage(detectLanguage(defaultLanguage));

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
  requestAnimationFrame(() => {
    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("is-visible");
      }
    });
  });
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = translations[currentLanguage] || translations[defaultLanguage];
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.text.value.trim();

    if (!name || !email || !message) {
      statusEl.textContent = text.form_error;
      statusEl.classList.add("is-visible");
      return;
    }

    const subject = encodeURIComponent(`${text.form_subject} ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:arcane2dstudio@gmail.com?subject=${subject}&body=${body}`;

    statusEl.textContent = text.form_success;
    statusEl.classList.add("is-visible");
    form.reset();
  });
}
