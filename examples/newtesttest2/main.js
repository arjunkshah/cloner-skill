const header = document.getElementById("site-header");

function syncHeaderState() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 12);
}

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -8% 0px",
  }
);

reveals.forEach((node) => revealObserver.observe(node));
