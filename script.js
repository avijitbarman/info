document.addEventListener("DOMContentLoaded", function () {

  /* ---------------- YEAR ---------------- */
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ---------------- TOAST HELPER ---------------- */
  function showToast(message, ms = 2200) {

    const t = document.createElement("div");

    t.className = "pf-toast";
    t.innerText = message;

    document.body.appendChild(t);

    setTimeout(() => {

      t.style.transition = "opacity 300ms, transform 300ms";
      t.style.opacity = "0";
      t.style.transform =
        "translateX(-50%) translateY(8px)";

      setTimeout(() => {
        t.remove();
      }, 300);

    }, ms);
  }


  /* ---------------- MOBILE NAV TOGGLE ---------------- */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

      const open =
        navLinks.classList.toggle("open");

      navToggle.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

    });


    navLinks.querySelectorAll("a").forEach((a) => {

      a.addEventListener("click", () => {

        navLinks.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ---------------- SCROLL SPY ---------------- */

  const navAnchors =
    document.querySelectorAll("a[data-nav]");

  const sections = Array.from(navAnchors)
    .map((a) =>
      document.querySelector(
        a.getAttribute("href")
      )
    )
    .filter(Boolean);


  function updateActiveNav() {

    if (!sections.length) return;

    let current = sections[0];

    const scrollPos =
      window.scrollY + 140;


    sections.forEach((sec) => {

      if (sec.offsetTop <= scrollPos) {
        current = sec;
      }

    });


    navAnchors.forEach((a) => {

      a.classList.toggle(
        "active",
        a.getAttribute("href") ===
        "#" + (current && current.id)
      );

    });

  }


  /* ---------------- NAVBAR HIDE ON SCROLL ---------------- */

  const navbar =
    document.getElementById("navbar");

  let lastScroll =
    window.pageYOffset || 0;

  let ticking = false;


  function onScroll() {

    const currentScroll =
      window.pageYOffset || 0;


    if (navbar) {

      if (currentScroll <= 80) {

        navbar.classList.remove(
          "nav-hidden"
        );

      }

      else if (
        currentScroll >
        lastScroll + 5
      ) {

        navbar.classList.add(
          "nav-hidden"
        );

      }

      else if (
        currentScroll <
        lastScroll - 5
      ) {

        navbar.classList.remove(
          "nav-hidden"
        );

      }

    }


    lastScroll = currentScroll;

    updateActiveNav();

  }


  window.addEventListener(
    "scroll",
    function () {

      if (!ticking) {

        window.requestAnimationFrame(
          function () {

            onScroll();

            ticking = false;

          }
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  updateActiveNav();


  /* ---------------- ABOUT: EXPANDABLE FACT CARDS ---------------- */

  const facts = {

    "fact-1":
      "Women Safety Smart Watch, AgroMitra, and FishoTron — spanning embedded firmware, cloud dashboards, and a full-stack mobile app.",

    "fact-2":
      "Tech Career Skills, and Introduction to Prompt Engineering for Generative AI.",

    "fact-3":
      "Bengali, English, and Hindi."

  };


  document
    .querySelectorAll(".fact-card")
    .forEach((card) => {

      card.addEventListener(
        "click",
        () => {

          const key =
            card.getAttribute(
              "data-reveal"
            );

          const already =
            card.classList.contains(
              "open"
            );


          document
            .querySelectorAll(
              ".fact-card"
            )
            .forEach((c) => {

              c.classList.remove(
                "open"
              );

              const p =
                c.querySelector(
                  ".fact-detail"
                );

              if (p) {
                p.remove();
              }

            });


          if (!already) {

            card.classList.add(
              "open"
            );


            const p =
              document.createElement(
                "span"
              );

            p.className =
              "fact-detail";


            p.style.cssText =
              "display:block;width:100%;margin-top:10px;font-size:0.84rem;color:var(--muted);";


            p.textContent =
              facts[key] || "";


            card.appendChild(p);

          }

        }
      );

    });


  /* ---------------- LIGHTBOX GALLERY ---------------- */

  const galleryItems = [

    {
      src: "images/watch-2.png",
      caption:
        "Sensor stack wired to the ESP32 — status LED lit during a live read."
    },

    {
      src: "images/watch-1.png",
      caption:
        "Early prototype worn on the wrist during a bench test."
    },

    {
      src: "images/watch-3.png",
      caption:
        "Close-up of the wiring harness and sensor module."
    },

    {
      src: "images/watch-app.png",
      caption:
        "Blynk dashboard: live SOS gauges for heart rate and motion."
    },

    {
      src: "images/watch-5.png",
      caption:
        "Automated SOS email — fired with live GPS coordinates."
    }

  ];


  let lbIndex = 0;


  const lightbox =
    document.getElementById(
      "lightbox"
    );

  const lbImg =
    document.getElementById(
      "lbImg"
    );

  const lbCaption =
    document.getElementById(
      "lbCaption"
    );


  function openLightbox(i) {

    if (!lightbox) return;

    lbIndex = i;

    renderLightbox();

    lightbox.classList.add(
      "open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove(
      "open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  function renderLightbox() {

    if (!lbImg || !lbCaption)
      return;

    const item =
      galleryItems[lbIndex];

    if (!item) return;

    lbImg.src = item.src;

    lbImg.alt =
      item.caption;

    lbCaption.textContent =
      item.caption;

  }


  function nextLightbox() {

    lbIndex =
      (lbIndex + 1) %
      galleryItems.length;

    renderLightbox();

  }


  function prevLightbox() {

    lbIndex =
      (lbIndex - 1 +
        galleryItems.length) %
      galleryItems.length;

    renderLightbox();

  }


  document
    .querySelectorAll(
      "[data-gallery-open]"
    )
    .forEach((btn) => {

      btn.addEventListener(
        "click",
        () => {

          openLightbox(
            parseInt(
              btn.getAttribute(
                "data-gallery-open"
              ),
              10
            )
          );

        }
      );

    });


  const lbClose =
    document.getElementById(
      "lbClose"
    );

  const lbNext =
    document.getElementById(
      "lbNext"
    );

  const lbPrev =
    document.getElementById(
      "lbPrev"
    );


  if (lbClose) {

    lbClose.addEventListener(
      "click",
      closeLightbox
    );

  }


  if (lbNext) {

    lbNext.addEventListener(
      "click",
      nextLightbox
    );

  }


  if (lbPrev) {

    lbPrev.addEventListener(
      "click",
      prevLightbox
    );

  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      (e) => {

        if (
          e.target === lightbox
        ) {

          closeLightbox();

        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    (e) => {

      if (
        !lightbox ||
        !lightbox.classList.contains(
          "open"
        )
      ) {
        return;
      }


      if (e.key === "Escape") {

        closeLightbox();

      }


      if (e.key === "ArrowRight") {

        nextLightbox();

      }


      if (e.key === "ArrowLeft") {

        prevLightbox();

      }

    }
  );


  /* ============================================================
     CONTACT FORM — WEB3FORMS
     ============================================================ */

  const form =
    document.getElementById(
      "contactForm"
    );


  if (form) {

    form.addEventListener(
      "submit",
      async function (e) {

        /*
         * Prevent the browser from leaving
         * the portfolio page.
         *
         * We will send the form using fetch()
         * directly to Web3Forms.
         */

        e.preventDefault();


        const submitBtn =
          form.querySelector(
            'button[type="submit"]'
          );


        const originalText =
          submitBtn
            ? submitBtn.innerHTML
            : "";


        /*
         * Disable button while sending
         */

        if (submitBtn) {

          submitBtn.disabled = true;

          submitBtn.innerHTML =
            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        }


        try {

          /*
           * Collect all form fields
           */

          const formData =
            new FormData(form);


          /*
           * Send to Web3Forms
           */

          const response =
            await fetch(
              form.action,
              {
                method: "POST",
                body: formData,
                headers: {
                  Accept:
                    "application/json"
                }
              }
            );


          /*
           * Convert response to JSON
           */

          const result =
            await response.json();


          /*
           * Successful submission
           */

          if (
            response.ok &&
            result.success
          ) {

            form.reset();

            showToast(
              "Message sent successfully! ✓",
              3000
            );

          }


          /*
           * Web3Forms returned an error
           */

          else {

            console.error(
              "Web3Forms Error:",
              result
            );

            showToast(
              "Failed to send message. Please try again.",
              3000
            );

          }

        }


        /*
         * Network / connection error
         */

        catch (error) {

          console.error(
            "Contact Form Error:",
            error
          );

          showToast(
            "Something went wrong. Please try again.",
            3000
          );

        }


        /*
         * Restore button
         */

        finally {

          if (submitBtn) {

            submitBtn.disabled =
              false;

            submitBtn.innerHTML =
              originalText;

          }

        }

      }
    );

  }


  /* ---------------- CLEAR CONTACT FORM ---------------- */

  const clearBtn =
    document.querySelector(
      ".btn-clear"
    );


  if (clearBtn && form) {

    clearBtn.addEventListener(
      "click",
      () => {

        form.reset();

        showToast(
          "Form cleared"
        );

      }
    );

  }


  /* ---------------- BUTTON FEEDBACK ---------------- */

  document
    .querySelectorAll(
      ".btn[href^='#']"
    )
    .forEach((b) => {

      b.addEventListener(
        "click",
        () => {

          /*
           * Smooth scrolling is handled
           * by CSS scroll-behavior.
           */

        }
      );

    });

});


/* ================================================================
   SCROLL-REACTIVE BACKGROUND COLOUR
   ================================================================ */

(function initScrollColourFlow() {

  let ticking = false;

  let scrollTimer;


  function updateScrollColour() {

    const doc =
      document.documentElement;


    const maxScroll =
      Math.max(
        1,
        doc.scrollHeight -
        window.innerHeight
      );


    const progress =
      Math.min(
        1,
        Math.max(
          0,
          window.scrollY /
          maxScroll
        )
      );


    /*
     * Smooth colour movement:
     *
     * Top    → Purple
     * Middle → Violet / Magenta
     * Bottom → Magenta / Purple
     *
     * Scrolling upward automatically
     * reverses the colour movement.
     */

    const shift =
      Math.sin(
        progress * Math.PI
      ) * 22 +
      progress * 12;


    document.body.style.setProperty(
      "--scroll-p",
      progress.toFixed(4)
    );


    document.body.style.setProperty(
      "--scroll-shift",
      shift.toFixed(2) + "deg"
    );


    /*
     * Add scrolling class
     */

    document.body.classList.add(
      "is-scrolling"
    );


    clearTimeout(
      scrollTimer
    );


    scrollTimer =
      setTimeout(
        () => {

          document.body.classList.remove(
            "is-scrolling"
          );

        },
        180
      );


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateScrollColour
        );

        ticking = true;

      }

    },
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateScrollColour,
    {
      passive: true
    }
  );


  updateScrollColour();

})();
