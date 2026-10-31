// Scroll entrance animations (respects prefers-reduced-motion via CSS)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Filterable skill cards
const filterButtons = document.querySelectorAll(".filter-btn");
const skillCards = document.querySelectorAll(".skill-card");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    const filter = button.dataset.filter;
    skillCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
      if (show) card.classList.add("visible");
    });
  });
});

// Interactive experience timeline (expand and collapse)
document.querySelectorAll(".timeline-head").forEach((head) => {
  head.addEventListener("click", () => {
    const body = head.nextElementSibling;
    const expanded = head.getAttribute("aria-expanded") === "true";
    head.setAttribute("aria-expanded", String(!expanded));
    body.hidden = expanded;
  });
});

// Quick contact modal
const overlay = document.getElementById("modal-overlay");
const openBtn = document.getElementById("contact-modal-btn");
const closeBtn = overlay.querySelector(".modal-close");
function openModal() {
  overlay.hidden = false;
  closeBtn.focus();
}
function closeModal() {
  overlay.hidden = true;
  openBtn.focus();
}
openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) closeModal();
});

// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => links.classList.remove("open"));
});
