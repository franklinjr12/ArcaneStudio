const english = {
  page_title: "Beach Volleyball VR — 2v2 VR Volleyball | Arcane Studio",
  social_locale: "en_US",
  social_image_alt: "Official Beach Volleyball VR artwork with players and a volleyball on the beach",
  meta_description: "Step onto the sand in Beach Volleyball VR. 2v2 beach volleyball, online multiplayer, solo matches and VR training. Coming soon to Meta Quest and Steam.",
  skip: "Skip to content", logo_home: "Arcane Studio home", nav_primary: "Primary", nav_about: "ABOUT", nav_contact: "CONTACT", lang_switch: "Language",
  back: "A GAME BY ARCANE STUDIO", release: "COMING SOON TO META QUEST & STEAM",
  hero_line_one: "Your beach.", hero_line_two: "Your game.",
  hero_description: "Feet in the sand. Eyes on the ball. Feel the energy of beach volleyball in 2v2 matches made for virtual reality.",
  wishlist: "Wishlist on Meta Quest", steam_soon: "Coming soon", privacy: "Privacy policy", explore: "Explore the game",
  key_art_alt: "Beach Volleyball VR artwork: a player spikes the ball as an opponent jumps to block",
  fact_matches: "EVERY POINT, TOGETHER", fact_players_value: "Up to 4", fact_players: "PLAYERS ONLINE", fact_movement_value: "Your movement", fact_movement: "BRINGS THE GAME TO LIFE",
  team_alt: "Two teams play the ball at the net on a beach volleyball court", in_game: "IN-GAME CAPTURE",
  gameplay_label: "REAL VOLLEYBALL. YOU'RE ON THE COURT.", gameplay_title_one: "Feel every touch.", gameplay_title_two: "Celebrate every point.",
  gameplay_body: "Receive the serve, set up your teammate and time the perfect spike. Your movements control the ball, and smart positioning makes all the difference.",
  gameplay_body_two: "From your first pass to the match-winning block, find your rhythm in a game built for VR.", find_mode: "Find your way to play",
  movement_label: "Volleyball actions", move_serve: "Serve", move_pass: "Pass", move_set: "Set", move_spike: "Spike", move_block: "Block",
  play_label: "THE NEXT MATCH IS YOURS", play_title: "Your beach. Your pace.", play_intro: "A friendly showdown or one more practice before the next great rally. It's your call.",
  online_kicker: "BETTER TOGETHER", online_title: "Bring your teammate.", online_body: "Join public rooms or create private matches for up to 4 players. Play with friends across supported platforms; bots fill the open spots.", online_bottom: "ONLINE MULTIPLAYER · CROSS-PLAY",
  solo_kicker: "THE COURT IS ALWAYS OPEN", solo_title: "Own the challenge.", solo_body: "Play full 2v2 matches against AI teams with three difficulty levels. No internet connection needed to hit the court.", solo_bottom: "OFFLINE SOLO · 3 DIFFICULTIES",
  training_kicker: "EVERY TOUCH COUNTS", training_title: "Find your game.", training_body: "Learn with a guided tutorial and practice each skill at your own pace. Optional assists help with movement, positioning and reaching the net.", training_bottom: "TUTORIAL · TRAINING · ASSISTS",
  gallery_label: "A LITTLE TASTE OF YOUR NEXT BEACH", gallery_title: "Inside the court.", gallery_hint: "Click the images for a closer look ↗",
  court_alt: "First-person view of a rally with a player preparing to block", store_alt: "Official Beach Volleyball VR artwork over the game's beach environment", training_alt: "Training menu with options to practice volleyball skills",
  gallery_rally: "In the middle of the rally", gallery_art: "The spirit of the game", gallery_training: "Your next practice",
  pass_alt: "First-person view of a player receiving the ball with a forearm pass",
  serve_alt: "A player holds the ball in one hand with the other raised to serve",
  score_alt: "A player looks up at the score and match time above the court",
  block_alt: "First-person view of a player raising both hands at the net, preparing to block",
  gallery_pass: "Receive the ball", gallery_serve: "Time to serve", gallery_score: "Keeping score", gallery_block: "Ready to block",
  wishlist_label: "SEE YOU ON THE SAND", wishlist_title: "Your next point starts here.", wishlist_body: "Beach Volleyball VR is on its way. Add it to your wishlist and follow the launch on Meta Quest.", play_styles: "Seated, standing or roomscale. Choose how you play.",
  questions_label: "BEFORE YOUR FIRST SERVE", questions_title: "A few quick answers.", contact_us: "Talk to Arcane Studio",
  faq_release_q: "Is the game available yet?", faq_release_a: "Not yet. Beach Volleyball VR is listed as “Coming soon” on Meta Quest. Follow the store page for launch updates.",
  faq_offline_q: "Can I play without internet?", faq_offline_a: "Yes. Solo matches against AI work offline. Online multiplayer requires an internet connection.",
  faq_languages_q: "Which languages are supported?", faq_languages_a: "Portuguese (Brazil), English, Spanish (Spain), French (France), German, Japanese and Chinese (China).",
  footer_contact: "Get in touch ↗", dialog_label: "Expanded image", dialog_close: "Close image",
};

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

function setLanguage(language, persist = false) {
  if (!["pt", "en"].includes(language)) return;
  for (const { element, attribute, key, portuguese } of entries) {
    const value = language === "en" ? (english[key] ?? portuguese) : portuguese;
    if (attribute) element.setAttribute(attribute, value);
    else element.textContent = value;
  }
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  const graph = JSON.parse(structuredData.textContent);
  graph["@graph"].find(entity => entity["@type"] === "WebPage").inLanguage = language === "pt" ? "pt-BR" : "en";
  graph["@graph"].find(entity => entity["@type"] === "VideoGame").description = language === "en"
    ? "VR beach volleyball with 2v2 matches, online multiplayer for up to four players, offline solo matches against AI and guided training. Coming soon to Meta Quest and Steam."
    : "Jogo de vôlei de praia em realidade virtual com partidas 2v2, multiplayer online para até quatro jogadores, partidas solo offline contra IA e treino guiado. Em breve no Meta Quest e na Steam.";
  structuredData.textContent = JSON.stringify(graph);
  document.querySelectorAll("[data-lang]").forEach(button => {
    const selected = button.dataset.lang === language;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelectorAll('a[href*="meta.com/"]').forEach(link => {
    link.href = `https://www.meta.com/${language === "pt" ? "pt-br/" : ""}experiences/beach-volleyball-vr/1376538408868746/`;
  });
  updateDialogCopy();
  if (persist) {
    try { localStorage.setItem("language", language); } catch { /* Private storage can be disabled. */ }
  }
}

let savedLanguage;
try { savedLanguage = localStorage.getItem("language"); } catch { /* Use the browser preference. */ }
const browserLanguage = (navigator.languages || [navigator.language])
  .map(locale => locale.split("-")[0]).find(language => ["pt", "en"].includes(language));
setLanguage(["pt", "en"].includes(savedLanguage) ? savedLanguage : browserLanguage || "pt");
document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang, true));
});
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
