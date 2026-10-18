export const languages = [
  { code: "pt", short: "PT", name: "Português", htmlLang: "pt-BR", ogLocale: "pt_BR" },
  { code: "en", short: "EN", name: "English", htmlLang: "en", ogLocale: "en_US" },
  { code: "es", short: "ES", name: "Español", htmlLang: "es", ogLocale: "es_ES" },
  { code: "fr", short: "FR", name: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
  { code: "ja", short: "JA", name: "日本語", htmlLang: "ja", ogLocale: "ja_JP" },
  { code: "zh", short: "中文", name: "简体中文", htmlLang: "zh-CN", ogLocale: "zh_CN" },
];

export const supportedLanguages = languages.map(language => language.code);

export function getLanguage(code) {
  return languages.find(language => language.code === code) || languages[0];
}

export function detectLanguage(fallback = "pt") {
  let saved;
  try { saved = localStorage.getItem("language"); } catch { /* Private storage can be disabled. */ }
  if (supportedLanguages.includes(saved)) return saved;

  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const locale of preferred) {
    const code = String(locale).split("-")[0].toLowerCase();
    if (supportedLanguages.includes(code)) return code;
  }
  return fallback;
}

export function saveLanguage(code) {
  try { localStorage.setItem("language", code); } catch { /* Private storage can be disabled. */ }
}

// Wires the header dropdown: a toggle button plus a list built from `languages`.
export function initLanguageMenu(onSelect) {
  const menu = document.querySelector(".lang-menu");
  if (!menu) return { setActive() {} };

  const toggle = menu.querySelector(".lang-toggle");
  const current = menu.querySelector(".lang-current");
  const list = menu.querySelector(".lang-list");

  list.replaceChildren(...languages.map(language => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lang-option";
    button.dataset.lang = language.code;
    button.lang = language.htmlLang;
    button.textContent = language.name;
    button.addEventListener("click", () => {
      close(true);
      onSelect(language.code);
    });
    item.append(button);
    return item;
  }));
  const options = [...list.querySelectorAll(".lang-option")];

  function open() {
    list.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    (options.find(option => option.classList.contains("is-active")) || options[0]).focus();
  }

  function close(refocus = false) {
    if (list.hidden) return;
    list.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    if (refocus) toggle.focus();
  }

  toggle.addEventListener("click", () => (list.hidden ? open() : close()));
  toggle.addEventListener("keydown", event => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      open();
    }
  });
  list.addEventListener("keydown", event => {
    const index = options.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      options[(index + step + options.length) % options.length].focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      options[event.key === "Home" ? 0 : options.length - 1].focus();
    } else if (event.key === "Tab") {
      close();
    }
  });
  document.addEventListener("click", event => {
    if (!menu.contains(event.target)) close();
  });

  return {
    setActive(code) {
      const language = getLanguage(code);
      current.textContent = language.short;
      for (const option of options) {
        const selected = option.dataset.lang === language.code;
        option.classList.toggle("is-active", selected);
        if (selected) option.setAttribute("aria-current", "true");
        else option.removeAttribute("aria-current");
      }
    },
  };
}
