const FORM_ENDPOINT = "/kontakt.php";

(() => {
  const pageLoader = document.querySelector("[data-page-loader]");
  if (pageLoader) {
    let loaderHidden = false;
    const hideLoader = () => {
      if (loaderHidden) return;
      loaderHidden = true;
      document.documentElement.classList.remove("page-loading");
      window.setTimeout(() => pageLoader.setAttribute("hidden", ""), 450);
    };
    window.addEventListener("load", () => window.setTimeout(hideLoader, 250), { once: true });
    window.setTimeout(hideLoader, 2500);
  }

  const nav = document.querySelector(".nav");
  const menuButton = document.querySelector(".menu-toggle");
  const header = document.querySelector(".site-header");

  if (nav && menuButton) {
    const setMenuOpen = (open) => {
      nav.classList.toggle("open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      const english = document.documentElement.lang === "en";
      menuButton.setAttribute("aria-label", open ? (english ? "Close menu" : "Menü schließen") : (english ? "Open menu" : "Menü öffnen"));
    };
    menuButton.addEventListener("click", () => setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuButton.focus();
      }
    });
  }

  if (header) {
    const progress = document.createElement("span");
    const fill = document.createElement("span");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    fill.className = "scroll-progress__fill";
    progress.append(fill);
    header.append(progress);

    const updateScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      header.style.setProperty("--scroll-progress", String(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0));
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll("main section, main article, main aside, main .card, main .feature, main .service, main .step, main .reason, main .faq-item");
    targets.forEach((target, index) => {
      target.classList.add("motion-reveal");
      target.style.setProperty("--reveal-delay", `${(index % 5) * 65}ms`);
    });
    if (targets.length) {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      targets.forEach((target) => observer.observe(target));
      document.documentElement.classList.add("motion-enabled");
    }
  }

  document.querySelectorAll("[data-video-placeholder]").forEach((button) => {
    button.addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.videoPlaceholder)}?autoplay=1&rel=0`;
      frame.title = button.dataset.videoTitle || "Microsoft Dynamics 365 Business Central";
      frame.loading = "lazy";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      button.closest(".video-frame").replaceChild(frame, button);
    });
  });

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const topic = new URLSearchParams(window.location.search).get("thema");
    const topicSelect = form.querySelector('[name="topic"]');
    if (topic && topicSelect && [...topicSelect.options].some((option) => option.value === topic)) topicSelect.value = topic;
    const attachments = form.querySelector('[name="attachments[]"]');
    const attachmentList = form.querySelector("#attachment-list");
    const english = document.documentElement.lang === "en";

    if (attachments && attachmentList) {
      const renderAttachments = () => {
        attachmentList.replaceChildren();
        const files = [...attachments.files];
        attachmentList.hidden = files.length === 0;

        files.forEach((file, index) => {
          const item = document.createElement("li");
          const name = document.createElement("span");
          const remove = document.createElement("button");
          name.className = "attachment-name";
          name.textContent = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
          remove.className = "attachment-remove";
          remove.type = "button";
          remove.dataset.fileIndex = String(index);
          remove.textContent = english ? "Remove" : "Entfernen";
          remove.setAttribute("aria-label", `${english ? "Remove attachment" : "Anhang entfernen"}: ${file.name}`);
          item.append(name, remove);
          attachmentList.append(item);
        });
      };

      attachments.addEventListener("change", renderAttachments);
      attachmentList.addEventListener("click", (event) => {
        const remove = event.target.closest("[data-file-index]");
        if (!remove) return;
        const removeIndex = Number(remove.dataset.fileIndex);
        const transfer = new DataTransfer();
        [...attachments.files].forEach((file, index) => {
          if (index !== removeIndex) transfer.items.add(file);
        });
        attachments.files = transfer.files;
        renderAttachments();
        (attachmentList.querySelector(".attachment-remove") || attachments).focus();
      });
      form.addEventListener("reset", () => window.setTimeout(renderAttachments));
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const status = form.querySelector(".form-status");
      const submit = form.querySelector('[type="submit"]');
    const selectedFiles = [...(attachments?.files || [])];
    const allowedExtensions = new Set(["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "csv", "png", "jpg", "jpeg"]);
    const totalBytes = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    const invalidType = selectedFiles.some((file) => !allowedExtensions.has(file.name.split(".").pop().toLowerCase()));
    if (selectedFiles.length > 3 || totalBytes > 5 * 1024 * 1024 || invalidType) {
      status.textContent = english
        ? "Attachments must be up to 3 business-related files (PDF, Word, Excel, PowerPoint, CSV, PNG or JPG) with a combined size no greater than 5 MB."
        : "Bitte wählen Sie höchstens 3 geschäftsbezogene Dateien (PDF, Word, Excel, PowerPoint, CSV, PNG oder JPG) mit insgesamt maximal 5 MB aus.";
      status.dataset.state = "error";
      attachments?.focus();
      return;
    }
    const originalLabel = submit.textContent;
    submit.disabled = true;
    submit.textContent = english ? "Sending…" : "Wird gesendet …";
    status.textContent = "";
    status.dataset.state = "loading";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`Formularserver antwortete mit HTTP ${response.status}.`);
      status.textContent = english ? "Thank you. Your message has been sent." : "Vielen Dank. Ihre Nachricht wurde gesendet.";
      status.dataset.state = "success";
      form.reset();
      } catch (error) {
        console.error("Kontaktformular konnte nicht gesendet werden.", error);
        status.textContent = english
          ? "Sending failed. Please try again later or contact us by email."
          : "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut oder schreiben Sie uns per E-Mail.";
        status.dataset.state = "error";
      } finally {
        submit.disabled = false;
        submit.textContent = originalLabel;
      }
    });
  }
})();
