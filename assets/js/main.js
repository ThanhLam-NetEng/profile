/* =============================================
   NAV — scroll effect
============================================= */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

/* =============================================
   NAV — hamburger mobile menu
============================================= */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

// Đóng menu khi click vào bất kỳ link nào
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  }),
);

/* =============================================
   TYPEWRITER EFFECT
   Thêm / bỏ role ở đây khi cần cập nhật
============================================= */
const roles = [
  "Network Engineer",
  "Security Enthusiast",
  "SDN Developer",
  "Open-source Builder",
  "Network Automation Learner",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function type() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typewriterEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1800); // dừng lại 1.8s trước khi xóa
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 350); // dừng 0.35s trước khi gõ role mới
      return;
    }
  }

  setTimeout(type, isDeleting ? 45 : 85);
}

setTimeout(type, 900); // delay trước khi bắt đầu

/* =============================================
   CONTACT FORM — Formspree AJAX
   Hiện thông báo thành công thay vì redirect trang
============================================= */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const res = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      contactForm.reset();
      contactForm.style.display = "none";
      formSuccess.style.display = "block";
    } else {
      submitBtn.textContent = "Failed — try email directly";
      submitBtn.disabled = false;
    }
  } catch {
    submitBtn.textContent = "Failed — try email directly";
    submitBtn.disabled = false;
  }
});

/* =============================================
   SCROLL REVEAL
   Mỗi phần tử .reveal tự động hiện khi scroll đến
============================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // chỉ chạy 1 lần
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  // Stagger delay: các phần tử trong cùng nhóm 4 hiện lệch nhau 80ms
  if (!el.style.transitionDelay) {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  }
  revealObserver.observe(el);
});
