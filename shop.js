window.Webflow ||= [];
window.Webflow.push(() => {
  console.log("Custom JS loaded");
  // ===== MOBILE MENU =====
  let savedScrollY = 0;

  function lockBodyScroll() {
    savedScrollY = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.classList.add("menu-open");
  }

  function unlockBodyScroll() {
    document.body.classList.remove("menu-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, savedScrollY);
  }

  function toggleMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const links = document.getElementById("nav-links");
    const backdrop = document.getElementById("menu-backdrop");
    const isOpen = hamburger.classList.toggle("open");
    links.classList.toggle("open", isOpen);
    backdrop.classList.toggle("open", isOpen);
    if (isOpen) lockBodyScroll();
    else unlockBodyScroll();
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "Menü schließen" : "Menü öffnen"
    );
  }

  function closeMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const links = document.getElementById("nav-links");
    const wasOpen = links.classList.contains("open");
    links.classList.remove("open");
    document.getElementById("menu-backdrop").classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Menü öffnen");
    if (wasOpen) unlockBodyScroll();
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      document.getElementById("nav-links").classList.contains("open")
    ) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });

  // ===== DATA =====
  const STORAGE_KEY = "ra_articles_v3";
  let articles = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || [
    {
      id: 1,
      artNr: "100331",
      name: "Accu Safe Tasche",
      cat: "Akku-Sicherheit",
      desc: `Sicherheitstasche zur Lagerung und zum Transport von Lithium-Ionen-Akkus (z. B. E-Bikes, Werkzeuge, Gartengeräte) – flammhemmend, Edition RA-Brandschutz. Entspricht den Vorgaben der TRVB 124 F und gängigen Sicherheitsrichtlinien für den Akkubetrieb. Ideal für Unternehmen, Hotels, Feuerwehren, Werkstätten. Material: 3-lagig, geprüft nach EN 1869:2019, silikonbeschichtete Außenfläche, wasser- und spritzfest, feuerfester Reißverschluss, einrollbare Öffnung mit Steckverschluss. Abmessungen: ca. 600 × 330 × 195 mm, Gewicht ca. 450 g. Empfohlen vom Zivilschutz Österreich.`,
      price: 49.0,
      tax: 20,
      unit: "Stk",
      emoji: "🔋",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/69eb3a8e8fc82bb7e61990cc_edfb0a27-0d1a-4343-851d-034b1f977275.png",
    },
    {
      id: 4,
      artNr: "100427",
      name: "X-SENSE Heimrauchmelder",
      cat: "Rauchmelder",
      desc: `XS01-WX Intelligenter Rauchmelder. WLAN-Rauchwarnmelder – kontrollieren Sie die Sicherheit Ihres Zuhauses jederzeit und von überall! • Keine Basisstation erforderlich • Kostenlose Push-Benachrichtigung • Stummschaltung über App • Austauschbare Batterie • Intelligente App (nur 2,4 GHz Wi-Fi).`,
      price: 37.8,
      tax: 20,
      unit: "Stk",
      emoji: "🚨",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/6a01bd53e85c2332150434ac_image002.png",
    },
    {
      id: 5,
      artNr: "100128",
      name: "PX-1C (weiß) vernetzbar",
      cat: "Rauchmelder",
      desc: `PX-1C mit Funkmodul gemäß DIN EN 14604 lassen sich unkompliziert miteinander vernetzen. Das Funkmodul ist bereits im Melder integriert. Diese Melder verfügen über eine fest eingebaute Langzeit-Lithiumbatterie (Batterielebensdauer 10 Jahre). Es entfallen dadurch teure und lästige Batteriewechsel. Pyrexx-Produkte erreichen größte Täuschungsalarmsicherheit.`,
      price: 86.5,
      tax: 20,
      unit: "Stk",
      emoji: "🚨",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/6a01bd53e9c644e7ec96ca04_image011.png",
    },
    {
      id: 6,
      artNr: "100127",
      name: "PX-1 (weiß) nicht vernetzbar",
      cat: "Rauchmelder",
      desc: `PX-1 ohne Funkmodul gemäß DIN EN 14604. Diese Melder verfügen über eine fest eingebaute Langzeit-Lithiumbatterie (Batterielebensdauer 10 Jahre). Es entfallen dadurch teure und lästige Batteriewechsel. Pyrexx-Produkte erreichen größte Täuschungsalarmsicherheit.`,
      price: 45.0,
      tax: 20,
      unit: "Stk",
      emoji: "🚨",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/6a01bd53287e89147e6b8894_image012.png",
    },
    {
      id: 7,
      artNr: "100163",
      name: "Löschdecke GLORIA",
      cat: "Löschdecken",
      desc: `GLORIA Protex Löschdecke P110 zur Bekämpfung von Entstehungsbränden und Fettbränden im Haushalt, in Küchen oder kleineren Betrieben. Ideal zum Ersticken von Flammen bei Fettbränden oder brennenden Gegenständen. Robuste Ausführung mit praktischer Wandtasche zur schnellen Entnahme. Ideal für Küchen, Gastronomie, Haushalte oder Werkstätten. DIN EN 189-2001, in Softbox, 1,1 × 1,1 m. Ideal für Haushalt & Fritteusen bis 3 l.`,
      price: 24.0,
      tax: 20,
      unit: "Stk",
      emoji: "🧣",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/6a01bd5367da6c9fb8607489_image010.png",
    },
    {
      id: 2,
      artNr: "100054",
      name: "Feuerlöscher Schaum fluorfrei – SDB 6",
      cat: "Feuerlöscher",
      desc: `SCHAUM-Löscher 6 l "fluorfrei" (umweltfreundlich), mit Handhebelarmatur. Brandklasse ÖN EN3: 21A/183B, LE 6/12.`,
      price: 129.0,
      tax: 20,
      unit: "Stk",
      emoji: "🧯",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/69eb3a8d2e1f6ee8f491e8dd_e6fb6991-9e87-4286-a8c7-2475b8113dad.png",
    },
    {
      id: 3,
      artNr: "100115",
      name: "Feuerlöscher Pulver – PD 6 GA (6 kg)",
      cat: "Feuerlöscher",
      desc: `Pulver-Dauerdruckfeuerlöscher DIN EN 3, GS, MED, BSI. Dauerdruckfeuerlöscher mit praktischer Handhebel-Armatur. Preiswerte Standardgeräte für den vielfältigen Einsatz mit einfachen Bedienelementen. Anders als bei Komfortgeräten mit innenliegender Treibmittelflasche steht der Behälter bei Geräten dieser Bauart ständig unter Druck.`,
      price: 59.8,
      tax: 20,
      unit: "Stk",
      emoji: "🧯",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/69eb3a8d3849aa6d316a0912_0e5c7db0-5f2e-46e4-8399-98ca3d63edb5.png",
    },
    {
      id: 8,
      artNr: "100116",
      name: "Feuerlöscher CO² – KS 2 SBS",
      cat: "Feuerlöscher",
      desc: `Dauerdruckfeuerlöscher DIN EN 3, GS, MED, BSI. Kohlendioxid-Feuerlöscher in Aluminium- oder Stahlausführung. Ideal für Anlagen mit hoher elektrischer Spannung, EDV-Zentren sowie Lager mit brennbaren Flüssigkeiten. Sicherer und zuverlässiger Löscheinsatz mit dem rückstandsfreien Löschmittel Kohlendioxid.`,
      price: 109.6,
      tax: 20,
      unit: "Stk",
      emoji: "🧯",
      stock: true,
      img: "https://cdn.prod.website-files.com/610cf4f33798f1380104aac4/6a01bd53da921df2a3338bdc_image003.png",
    },
  ];

  let cart = [];
  let editingId = null;
  let nextId =
    articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;

  function saveArticles() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }

  // ===== TABS =====
  function showTab(t) {
    ["shop", "cart", "admin"].forEach((p) => {
      document.getElementById(p + "-panel").style.display = "none";
      document.getElementById("tab-" + p).classList.remove("active");
      document.getElementById("nav-" + p) &&
        document.getElementById("nav-" + p).classList.remove("active");
    });
    document.getElementById(t + "-panel").style.display = "block";
    document.getElementById("tab-" + t).classList.add("active");
    document.getElementById("nav-" + t) &&
      document.getElementById("nav-" + t).classList.add("active");

    if (t === "shop") renderShop();
    if (t === "cart") renderCart();
    if (t === "admin") renderAdmin();
  }

  // ===== SHOP =====
  function renderShop() {
    const searchInput = document.getElementById("search-input");
    const catSel = document.getElementById("filter-cat");
    const grid = document.getElementById("product-grid");
    if (!searchInput || !catSel || !grid) return;

    const search = searchInput.value.toLowerCase();
    const catFilter = catSel.value;

    const cats = [...new Set(articles.map((a) => a.cat).filter(Boolean))];
    const curVal = catSel.value;
    catSel.innerHTML = '<option value="">Alle Kategorien</option>';
    cats.forEach((c) => {
      const o = document.createElement("option");
      o.value = c;
      o.textContent = c;
      catSel.appendChild(o);
    });
    catSel.value = curVal;

    const filtered = articles.filter((a) => {
      const matchSearch =
        !search ||
        a.name.toLowerCase().includes(search) ||
        (a.artNr || "").toLowerCase().includes(search) ||
        (a.desc || "").toLowerCase().includes(search);
      const matchCat = !catFilter || a.cat === catFilter;
      return matchSearch && matchCat;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-shop"><div class="empty-icon">📦</div><p>Keine Artikel gefunden.</p></div>`;
      return;
    }

    grid.innerHTML = filtered
      .map((a) => {
        const gross = a.price * (1 + a.tax / 100);
        const imgHtml = a.img
          ? `<img src="${a.img}" alt="${a.name}">`
          : `<div class="product-image-placeholder">${a.emoji || "📦"}</div>`;
        return `
    <div class="product-card">
      <div class="product-image">
        ${imgHtml}
        ${
          a.stock
            ? `<div class="product-badge">Verfügbar</div>`
            : `<div class="product-badge out">Nicht verfügbar</div>`
        }
      </div>
      <div class="product-body">
        <div class="product-art-nr">Art.-Nr. ${a.artNr || "—"}</div>
        <div class="product-name">${a.name}</div>
        ${a.cat ? `<div class="product-cat">${a.cat}</div>` : ""}
        <div class="product-desc">${a.desc || ""}</div>
        <div class="product-pricing">
          <div class="price-row"><span>Netto</span><span>€ ${a.price.toFixed(
            2
          )}</span></div>
          <div class="price-row"><span>MwSt. ${a.tax}%</span><span>€ ${(
          gross - a.price
        ).toFixed(2)}</span></div>
          <div class="price-row total"><span>Brutto inkl. MwSt.</span><span class="price-val">€ ${gross.toFixed(
            2
          )}</span></div>
        </div>
        <div class="qty-add">
          <div class="qty-ctrl">
            <button onclick="changeQty(${a.id}, -1)">−</button>
            <input type="number" id="qty-${a.id}" value="1" min="1" max="999">
            <button onclick="changeQty(${a.id}, 1)">+</button>
          </div>
          <button class="btn-add-cart" ${
            !a.stock ? "disabled" : ""
          } onclick="addToCart(${a.id})">
            🛒 &nbsp;In den Warenkorb
          </button>
        </div>
      </div>
    </div>`;
      })
      .join("");
  }

  function changeQty(id, delta) {
    const inp = document.getElementById("qty-" + id);
    if (!inp) return;
    let v = parseInt(inp.value) + delta;
    if (v < 1) v = 1;
    inp.value = v;
  }

  function addToCart(id) {
    const art = articles.find((a) => a.id === id);
    if (!art || !art.stock) return;
    const qty = parseInt(document.getElementById("qty-" + id)?.value || 1);
    const existing = cart.find((c) => c.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty });
    updateCartBadge();
    showToast(`✅ ${art.name} hinzugefügt`, "success");
  }

  function updateCartBadge() {
    const total = cart.reduce((s, c) => s + c.qty, 0);
    document.getElementById("cart-count").textContent = total;
    document.getElementById("tab-cart-count").textContent = total;
  }

  // ===== CART =====
  function renderCart() {
    document.getElementById("order-success").style.display = "none";
    document.getElementById("cart-content").style.display = "block";

    const list = document.getElementById("cart-items-list");

    if (cart.length === 0) {
      list.innerHTML = `<div class="empty-cart"><div class="empty-icon">🛒</div><p style="font-size:16px">Ihr Warenkorb ist leer.</p><button class="btn-primary" style="margin:20px auto 0;display:flex" onclick="showTab('shop')">🛍️ &nbsp;Zum Shop</button></div>`;
      document.getElementById("summary-rows").innerHTML = "";
      document.getElementById("summary-total-val").textContent = "€ 0,00";
      return;
    }

    let netTotal = 0,
      taxTotal = 0;
    list.innerHTML = cart
      .map((c) => {
        const art = articles.find((a) => a.id === c.id);
        if (!art) return "";
        const gross = art.price * (1 + art.tax / 100);
        const lineNet = art.price * c.qty;
        const lineGross = gross * c.qty;
        netTotal += lineNet;
        taxTotal += lineGross - lineNet;
        return `
    <div class="cart-item">
      <div class="cart-item-icon">${
        art.img
          ? `<img src="${art.img}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`
          : art.emoji || "📦"
      }</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${art.name}</div>
        <div class="cart-item-nr">Art.-Nr. ${art.artNr || "—"} · ${
          art.tax
        }% MwSt.</div>
      </div>
      <div class="cart-item-qty">
        <div class="qty-ctrl" style="scale:0.9">
          <button onclick="cartQty(${art.id}, -1)">−</button>
          <input type="number" id="cqty-${art.id}" value="${
          c.qty
        }" min="1" onchange="cartSetQty(${art.id}, this.value)">
          <button onclick="cartQty(${art.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">
        <div class="net">netto € ${lineNet.toFixed(2)}</div>
        <div class="gross">€ ${lineGross.toFixed(2)}</div>
      </div>
      <button class="cart-remove" onclick="removeFromCart(${
        art.id
      })" title="Entfernen">✕</button>
    </div>`;
      })
      .join("");

    const grossTotal = netTotal + taxTotal;
    document.getElementById("summary-rows").innerHTML = `
    <div class="summary-row"><span>Nettobetrag</span><span>€ ${netTotal.toFixed(
      2
    )}</span></div>
    <div class="summary-row"><span>MwSt.</span><span>€ ${taxTotal.toFixed(
      2
    )}</span></div>
  `;
    document.getElementById(
      "summary-total-val"
    ).textContent = `€ ${grossTotal.toFixed(2)}`;
  }

  function cartQty(id, delta) {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    updateCartBadge();
    renderCart();
  }

  function cartSetQty(id, val) {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, parseInt(val) || 1);
    updateCartBadge();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((c) => c.id !== id);
    updateCartBadge();
    renderCart();
  }

  // ===== DELIVERY TOGGLE =====
  let deliveryMode = "pickup";

  function selectDelivery(mode) {
    deliveryMode = mode;
    document
      .getElementById("opt-pickup")
      .classList.toggle("selected", mode === "pickup");
    document
      .getElementById("opt-delivery")
      .classList.toggle("selected", mode === "delivery");
    document
      .getElementById("pickup-info")
      .classList.toggle("visible", mode === "pickup");
    document
      .getElementById("delivery-fields")
      .classList.toggle("visible", mode === "delivery");
  }

  // ===== ORDER =====
  async function placeOrder() {
    if (cart.length === 0) {
      showToast("⚠️ Warenkorb ist leer", "error");
      return;
    }
    const name = document.getElementById("cust-name").value.trim();
    const email = document.getElementById("cust-email").value.trim();
    if (!name || !email) {
      showToast("⚠️ Bitte Name und E-Mail angeben", "error");
      return;
    }
    if (deliveryMode === "delivery") {
      const street = document.getElementById("del-street").value.trim();
      const nr = document.getElementById("del-nr").value.trim();
      const plz = document.getElementById("del-plz").value.trim();
      const city = document.getElementById("del-city").value.trim();
      if (!street || !nr || !plz || !city) {
        showToast("⚠️ Bitte vollständige Lieferadresse angeben", "error");
        return;
      }
    }

    const btn = document.getElementById("order-btn");
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> &nbsp;Wird gesendet...';

    // Build order details
    const lines = cart
      .map((c) => {
        const art = articles.find((a) => a.id === c.id);
        const gross = art.price * (1 + art.tax / 100);
        return `- ${art.name} (Art.-Nr. ${art.artNr || "—"}) | Menge: ${
          c.qty
        } ${art.unit || ""} | Netto: €${(art.price * c.qty).toFixed(
          2
        )} | Brutto: €${(gross * c.qty).toFixed(2)}`;
      })
      .join("\n");
    const netT = cart.reduce((s, c) => {
      const art = articles.find((a) => a.id === c.id);
      return s + art.price * c.qty;
    }, 0);
    const grossT = cart.reduce((s, c) => {
      const art = articles.find((a) => a.id === c.id);
      return s + art.price * (1 + art.tax / 100) * c.qty;
    }, 0);
    const taxT = grossT - netT;
    const company = document.getElementById("cust-company").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();
    const note = document.getElementById("cust-note").value.trim();

    let deliveryAddress = "";
    if (deliveryMode === "pickup") {
      deliveryAddress = "ABHOLUNG (kostenlos bei RA-Brandschutz, Kitzbühel)";
    } else {
      const street = document.getElementById("del-street").value.trim();
      const nr = document.getElementById("del-nr").value.trim();
      const plz = document.getElementById("del-plz").value.trim();
      const city = document.getElementById("del-city").value.trim();
      const country = document.getElementById("del-country").value.trim();
      deliveryAddress = `${street} ${nr}, ${plz} ${city}, ${country}`;
    }

    // ----- Submit via the Designer-rendered Webflow Form Block -----
    const designerForm =
      document.querySelector('form[data-name="wf-order-form"]') ||
      document.querySelector("form#wf-form-wf-order-form") ||
      Array.from(document.querySelectorAll("form")).find((f) => {
        const names = Array.from(f.elements).map((e) => e.name);
        return names.includes("Artikel") && names.includes("Gesamtbetrag");
      });

    if (!designerForm) {
      btn.disabled = false;
      btn.innerHTML = "📧 &nbsp;Bestellung senden";
      showToast(
        "⚠️ Bestellformular nicht gefunden. Bitte Seite neu laden.",
        "error"
      );
      console.error(
        "[ShopOrder] form not found. Forms on page:",
        Array.from(document.querySelectorAll("form")).map((f) => ({
          dataName: f.getAttribute("data-name"),
          id: f.id,
        }))
      );
      return;
    }

    designerForm.noValidate = true;
    designerForm.setAttribute("novalidate", "novalidate");

    const setField = (fieldName, value) => {
      const el = designerForm.querySelector(`[name="${fieldName}"]`);
      if (el) el.value = value == null ? "" : String(value);
      else console.warn(`[ShopOrder] field "${fieldName}" not found on form`);
    };

    // Field names match what Webflow actually rendered (note lowercase name/email)
    setField("name", name);
    setField("email", email);
    setField("Firma", company);
    setField("Telefon", phone);
    setField(
      "Versandart",
      deliveryMode === "pickup" ? "Abholung" : "Lieferung"
    );
    setField("Lieferadresse", deliveryAddress);
    setField("Artikel", lines);
    setField("Nettobetrag", `€ ${netT.toFixed(2)}`);
    setField("MwSt", `€ ${taxT.toFixed(2)}`);
    setField("Gesamtbetrag", `€ ${grossT.toFixed(2)}`);
    setField("Anmerkungen", note);

    const wrapper = designerForm.closest(".w-form");
    const doneEl = wrapper ? wrapper.querySelector(".w-form-done") : null;
    const failEl = wrapper ? wrapper.querySelector(".w-form-fail") : null;
    if (doneEl) doneEl.style.display = "none";
    if (failEl) failEl.style.display = "none";
    designerForm.style.display = "";

    const DEBUG = new URLSearchParams(window.location.search).has("debug");
    if (DEBUG) {
      console.group("[ShopOrder] submitting Webflow form");
      console.log("form:", designerForm);
      console.log(
        "values:",
        Array.from(designerForm.elements).reduce((o, el) => {
          if (el.name) o[el.name] = el.value;
          return o;
        }, {})
      );
      console.groupEnd();
    }

    const startTime = Date.now();
    const pollInterval = setInterval(() => {
      const doneVisible =
        doneEl && window.getComputedStyle(doneEl).display !== "none";
      const failVisible =
        failEl && window.getComputedStyle(failEl).display !== "none";
      if (doneVisible || failVisible) {
        clearInterval(pollInterval);
        btn.disabled = false;
        btn.innerHTML = "📧 &nbsp;Bestellung senden";
        if (doneVisible) {
          document.getElementById("cart-content").style.display = "none";
          document.getElementById("order-success").style.display = "block";
          cart = [];
          updateCartBadge();
        } else {
          showToast(
            "⚠️ Fehler beim Senden. Bitte versuchen Sie es erneut.",
            "error"
          );
        }
      } else if (Date.now() - startTime > 15000) {
        clearInterval(pollInterval);
        btn.disabled = false;
        btn.innerHTML = "📧 &nbsp;Bestellung senden";
        showToast(
          "⚠️ Zeitüberschreitung. Bitte versuchen Sie es erneut.",
          "error"
        );
      }
    }, 200);

    if (typeof designerForm.requestSubmit === "function") {
      designerForm.requestSubmit();
    } else {
      designerForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  }

  function newOrder() {
    document.getElementById("order-success").style.display = "none";
    document.getElementById("cart-content").style.display = "block";
    showTab("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  // ===== ADMIN =====
  function renderAdmin() {
    const tbody = document.getElementById("admin-table-body");
    if (articles.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-light)">Noch keine Artikel. Klicken Sie auf "+ Neuer Artikel".</td></tr>`;
      return;
    }

    tbody.innerHTML = articles
      .map((a) => {
        const gross = a.price * (1 + a.tax / 100);
        const thumb = a.img
          ? `<img src="${a.img}" style="width:48px;height:40px;object-fit:cover;border-radius:4px;display:block;">`
          : `<div style="width:48px;height:40px;background:var(--light-gray);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:20px">${
              a.emoji || "📦"
            }</div>`;
        return `
    <tr>
      <td>${thumb}</td>
      <td><span class="art-num">${a.artNr || "—"}</span></td>
      <td><strong>${a.name}</strong></td>
      <td>${a.cat || "—"}</td>
      <td>€ ${a.price.toFixed(2)}</td>
      <td>${a.tax}%</td>
      <td><strong>€ ${gross.toFixed(2)}</strong></td>
      <td><span class="stock-badge ${a.stock ? "stock-yes" : "stock-no"}">${
          a.stock ? "Ja" : "Nein"
        }</span></td>
      <td><div class="action-btns">
        <button class="btn-edit" onclick="openEditModal(${
          a.id
        })">✏️ Bearbeiten</button>
        <button class="btn-danger" onclick="deleteArticle(${
          a.id
        })">🗑 Löschen</button>
      </div></td>
    </tr>`;
      })
      .join("");
  }

  // ===== MODAL =====
  function openAddModal() {
    editingId = null;
    document.getElementById("modal-title").textContent = "Neuer Artikel";
    ["f-artnr", "f-name", "f-desc", "f-cat", "f-unit", "f-emoji"].forEach(
      (id) => (document.getElementById(id).value = "")
    );
    document.getElementById("f-price").value = "";
    document.getElementById("f-tax").value = "20";
    document.getElementById("f-stock").value = "1";
    resetImagePreview();
    updateTaxPreview();
    const cats = [...new Set(articles.map((a) => a.cat).filter(Boolean))];
    document.getElementById("cat-list").innerHTML = cats
      .map((c) => `<option value="${c}">`)
      .join("");
    document.getElementById("article-modal").classList.add("open");
  }

  function openEditModal(id) {
    const art = articles.find((a) => a.id === id);
    if (!art) return;
    editingId = id;
    document.getElementById("modal-title").textContent = "Artikel bearbeiten";
    document.getElementById("f-artnr").value = art.artNr || "";
    document.getElementById("f-name").value = art.name;
    document.getElementById("f-desc").value = art.desc || "";
    document.getElementById("f-cat").value = art.cat || "";
    document.getElementById("f-price").value = art.price;
    document.getElementById("f-tax").value = art.tax;
    document.getElementById("f-unit").value = art.unit || "";
    document.getElementById("f-emoji").value = art.emoji || "";
    document.getElementById("f-stock").value = art.stock ? "1" : "0";
    if (art.img) setImagePreview(art.img);
    else resetImagePreview();
    updateTaxPreview();
    document.getElementById("article-modal").classList.add("open");
  }

  function closeModal() {
    document.getElementById("article-modal").classList.remove("open");
  }

  function updateTaxPreview() {
    const price = parseFloat(document.getElementById("f-price").value);
    const tax = parseInt(document.getElementById("f-tax").value);
    const preview = document.getElementById("tax-preview");
    if (!price || isNaN(price)) {
      preview.innerHTML = "— bitte Preis eingeben";
      return;
    }
    const gross = price * (1 + tax / 100);
    preview.innerHTML = `<strong>€ ${gross.toFixed(
      2
    )}</strong> <span style="color:var(--text-light);font-size:12px">(inkl. ${tax}% = +€${(
      gross - price
    ).toFixed(2)})</span>`;
  }

  // ===== IMAGE UPLOAD HELPERS =====
  let currentImageData = null;

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("⚠️ Bild zu groß (max. 5MB)", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      currentImageData = e.target.result;
      setImagePreview(currentImageData);
    };
    reader.readAsDataURL(file);
  }

  function setImagePreview(src) {
    currentImageData = src;
    document.getElementById("img-placeholder").style.display = "none";
    const preview = document.getElementById("img-preview");
    preview.src = src;
    preview.style.display = "block";
    document.getElementById("img-remove-btn").style.display = "inline-flex";
  }

  function resetImagePreview() {
    currentImageData = null;
    document.getElementById("img-placeholder").style.display = "flex";
    const preview = document.getElementById("img-preview");
    preview.src = "";
    preview.style.display = "none";
    document.getElementById("img-remove-btn").style.display = "none";
    document.getElementById("f-img-input").value = "";
  }

  function removeImage() {
    resetImagePreview();
  }

  function saveArticle() {
    const name = document.getElementById("f-name").value.trim();
    const priceVal = parseFloat(document.getElementById("f-price").value);
    if (!name) {
      showToast("⚠️ Bitte Artikelbezeichnung eingeben", "error");
      return;
    }
    if (isNaN(priceVal) || priceVal < 0) {
      showToast("⚠️ Bitte gültigen Preis eingeben", "error");
      return;
    }

    const data = {
      artNr: document.getElementById("f-artnr").value.trim(),
      name,
      desc: document.getElementById("f-desc").value.trim(),
      cat: document.getElementById("f-cat").value.trim(),
      price: priceVal,
      tax: parseInt(document.getElementById("f-tax").value),
      unit: document.getElementById("f-unit").value.trim(),
      emoji: document.getElementById("f-emoji").value.trim() || "📦",
      stock: document.getElementById("f-stock").value === "1",
      img:
        currentImageData ||
        (editingId
          ? articles.find((a) => a.id === editingId)?.img || null
          : null),
    };

    if (editingId) {
      const idx = articles.findIndex((a) => a.id === editingId);
      articles[idx] = { ...articles[idx], ...data };
      showToast("✅ Artikel aktualisiert", "success");
    } else {
      articles.push({ id: nextId++, ...data });
      showToast("✅ Artikel hinzugefügt", "success");
    }

    saveArticles();
    closeModal();
    renderAdmin();
  }

  function deleteArticle(id) {
    if (!confirm("Artikel wirklich löschen?")) return;
    articles = articles.filter((a) => a.id !== id);
    cart = cart.filter((c) => c.id !== id);
    saveArticles();
    updateCartBadge();
    renderAdmin();
    showToast("🗑 Artikel gelöscht");
  }

  // ===== TOAST =====
  let toastTimer;

  function showToast(msg, type = "") {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.className = "toast show" + (type ? " " + type : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.className = "toast"), 3000);
  }

  // ===== ADMIN AUTH =====
  const ADMIN_PASSWORD = "brandschutz2025";
  let adminUnlocked = false;
  let keyBuffer = [];

  function requestAdmin() {
    if (adminUnlocked) {
      showTab("admin");
      return;
    }
    document.getElementById("admin-pw-input").value = "";
    document.getElementById("admin-pw-error").textContent = "";
    document.getElementById("admin-login-modal").classList.add("open");
    setTimeout(() => document.getElementById("admin-pw-input").focus(), 100);
  }

  function closeAdminModal() {
    document.getElementById("admin-login-modal").classList.remove("open");
  }

  function checkAdminPw() {
    const pw = document.getElementById("admin-pw-input").value;
    if (pw === ADMIN_PASSWORD) {
      adminUnlocked = true;
      closeAdminModal();
      document.getElementById("nav-admin").style.display = "inline";
      document.getElementById("tab-admin").style.display = "inline-block";
      showTab("admin");
      showToast("✅ Admin-Bereich entsperrt", "success");
    } else {
      const err = document.getElementById("admin-pw-error");
      err.textContent = "❌ Falsches Passwort. Bitte erneut versuchen.";
      err.style.color = "#c62828";
      err.style.fontSize = "12px";
      err.style.display = "block";
      document.getElementById("admin-pw-input").value = "";
      document.getElementById("admin-pw-input").focus();
    }
  }

  document.addEventListener("keydown", (e) => {
    keyBuffer.push(e.key);
    if (keyBuffer.length > 3) keyBuffer.shift();
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
      e.preventDefault();
      requestAdmin();
    }
  });

  // ===== DRAG & DROP FOR IMAGE =====
  document.addEventListener("DOMContentLoaded", () => {
    const area = document.getElementById("img-upload-area");
    if (!area) return;
    area.addEventListener("dragover", (e) => {
      e.preventDefault();
      area.style.borderColor = "var(--red)";
      area.style.background = "#fdf5f5";
    });
    area.addEventListener("dragleave", () => {
      area.style.borderColor = "";
      area.style.background = "";
    });
    area.addEventListener("drop", (e) => {
      e.preventDefault();
      area.style.borderColor = "";
      area.style.background = "";
      const file = e.dataTransfer.files[0];
      if (!file || !file.type.startsWith("image/")) {
        showToast("⚠️ Bitte ein Bild hochladen", "error");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast("⚠️ Bild zu groß (max. 5MB)", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    });
  });

  // ===== INIT =====
  function initShop() {
    renderShop();
    updateCartBadge();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShop);
  } else {
    initShop();
  }
});
