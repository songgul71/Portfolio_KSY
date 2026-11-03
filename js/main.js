/* 순수 JavaScript: AOS, 현재 섹션 표시, 이메일 복사, 읽기 진행 표시 */
(() => {
  "use strict";

  const root = document.documentElement;
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let aosInitialized = false;

  // AOS 옵션을 바꾸면 전체 스크롤 효과를 조절할 수 있습니다.
  function setupMotion() {
    if (motionPreference.matches || !window.AOS) {
      root.classList.remove("aos-enabled");
      return;
    }

    try {
      root.classList.add("aos-enabled");
      if (!aosInitialized) {
        window.AOS.init({
          duration: 650,
          easing: "ease-out-cubic",
          offset: 55,
          delay: 0,
          once: true,
          mirror: false,
          anchorPlacement: "top-bottom"
        });
        aosInitialized = true;
      } else {
        window.AOS.refreshHard();
      }
    } catch {
      root.classList.remove("aos-enabled");
    }
  }

  setupMotion();
  motionPreference.addEventListener("change", setupMotion);
  window.addEventListener("load", () => {
    if (aosInitialized) window.AOS.refresh();
  }, { once: true });
  if (document.fonts) {
    document.fonts.ready.then(() => {
      if (aosInitialized) window.AOS.refresh();
    });
  }

  // 키보드로 이동한 링크도 즉시 볼 수 있게 합니다.
  document.addEventListener("focusin", (event) => {
    const animatedParent = event.target.closest("[data-aos]");
    if (animatedParent) animatedParent.classList.add("aos-animate");
  });

  const progress = document.querySelector(".reading-progress span");
  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  let framePending = false;

  // 한 화면에서 스크롤 처리 코드를 한 번만 실행합니다.
  function updateScrollState() {
    const maxScroll = root.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;

    let activeId = "";
    const activationLine = Math.min(window.innerHeight * 0.35, 240);
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationLine) activeId = section.id;
    });
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${activeId}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    framePending = false;
  }

  function requestScrollUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateScrollState);
  }
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });
  window.addEventListener("load", requestScrollUpdate, { once: true });
  updateScrollState();

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector(".copy-status");
  let statusTimer;

  // file://로 여는 경우에는 이전 복사 방식으로 한 번 더 시도합니다.
  function legacyCopy(text) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;left:-9999px;top:0;";
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } finally { field.remove(); }
    return copied;
  }

  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      let copied = false;
      const email = copyButton.dataset.copyEmail;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
          copied = true;
        }
      } catch { /* 다음 복사 방식으로 다시 시도합니다. */ }
      if (!copied) {
        try { copied = legacyCopy(email); } catch { copied = false; }
      }
      copyButton.focus({ preventScroll: true });
      window.clearTimeout(statusTimer);
      copyStatus.textContent = copied ? "이메일 주소를 복사했습니다." : `이메일 주소: ${email}`;
      copyButton.textContent = copied ? "복사 완료" : "주소 복사";
      statusTimer = window.setTimeout(() => {
        copyButton.textContent = "주소 복사";
        copyStatus.textContent = "";
      }, 2500);
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
