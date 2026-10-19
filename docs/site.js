const gallery = {
  desktop: { src: "assets/desktop.png", alt: "DSH 主会话与独立侧边聊天并排显示，使用固定演示数据", label: "并排会话" },
  entry: { src: "assets/entry.png", alt: "DSH 开始页右侧栏展示侧边聊天入口，使用固定演示数据", label: "侧栏入口" },
  mobile: { src: "assets/mobile.png", alt: "DSH 侧边聊天在窄屏视口中的演示，使用固定演示数据", label: "窄屏" },
};
const heroImage = document.querySelector("#hero-screenshot");
const screenshotButton = document.querySelector(".screenshot-button");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const toast = document.querySelector(".toast");
let toastTimer;

function announce(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

for (const tab of document.querySelectorAll(".gallery-tab")) {
  tab.addEventListener("click", () => {
    const selected = gallery[tab.dataset.image];
    heroImage.src = selected.src;
    heroImage.alt = selected.alt;
    screenshotButton.dataset.lightbox = selected.src;
    screenshotButton.setAttribute("aria-label", `放大查看${selected.label}演示截图`);
    for (const item of document.querySelectorAll(".gallery-tab")) {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    }
  });
}

for (const tab of document.querySelectorAll(".install-tab")) {
  tab.addEventListener("click", () => {
    for (const item of document.querySelectorAll(".install-tab")) {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    }
    for (const panel of document.querySelectorAll(".install-panel")) {
      panel.hidden = panel.id !== tab.dataset.panel;
    }
  });
}

for (const button of document.querySelectorAll(".copy-button")) {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      announce("安装地址已复制");
    } catch {
      announce("复制失败，请选择并复制安装地址");
    }
  });
}

screenshotButton.addEventListener("click", () => {
  lightboxImage.src = screenshotButton.dataset.lightbox;
  lightboxImage.alt = heroImage.alt;
  lightbox.showModal();
});
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => screenshotButton.focus());
