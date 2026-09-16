const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

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

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const text = form.text.value.trim();

    if (!name || !email || !text) {
      statusEl.textContent = "Please fill in all fields.";
      statusEl.classList.add("is-visible");
      return;
    }

    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`${text}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:arcane2dstudio@gmail.com?subject=${subject}&body=${body}`;

    statusEl.textContent = "Opening your email client…";
    statusEl.classList.add("is-visible");
    form.reset();
  });
}
