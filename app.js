(function () {
  var CART_KEY = "store_cart_v1";
  var cartBound = false;

  function money(n) {
    return window.STORE.currency + n.toFixed(2);
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateCount();
  }

  function findProduct(id) {
    return window.PRODUCTS.filter(function (p) {
      return p.id === id;
    })[0];
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  function updateCount() {
    var count = loadCart().reduce(function (sum, l) {
      return sum + l.qty;
    }, 0);
    var el = document.getElementById("cart-count");
    if (el) el.textContent = count;
  }

  function bumpCount() {
    var el = document.getElementById("cart-count");
    if (!el) return;
    el.classList.remove("bump");
    void el.offsetWidth; // restart the animation
    el.classList.add("bump");
  }

  // Fade images in when loaded. Also shows them if loading fails, so nothing stays invisible.
  function fadeImages() {
    var imgs = document.querySelectorAll("img.fade");
    for (var i = 0; i < imgs.length; i++) {
      (function (img) {
        function show() {
          img.classList.add("loaded");
        }
        if (img.complete) show();
        else {
          img.addEventListener("load", show);
          img.addEventListener("error", show);
        }
      })(imgs[i]);
    }
  }

  function addToCart(id, variant, qty) {
    var cart = loadCart();
    var line = cart.filter(function (l) {
      return l.id === id && l.variant === variant;
    })[0];
    if (line) line.qty += qty;
    else cart.push({ id: id, variant: variant, qty: qty });
    saveCart(cart);
  }

  function renderCatalog() {
    var root = document.getElementById("catalog");
    if (!root) return;
    root.innerHTML = window.PRODUCTS.map(function (p, i) {
      return (
        '<a class="card" style="--i:' +
        i +
        '" href="product.html?id=' +
        encodeURIComponent(p.id) +
        '">' +
        '<img class="img fade" src="' +
        esc(p.image) +
        '" alt="' +
        esc(p.name) +
        '" loading="lazy">' +
        '<div class="body"><p class="name">' +
        esc(p.name) +
        "</p>" +
        '<p class="price">' +
        money(p.price) +
        "</p></div></a>"
      );
    }).join("");
  }

  function renderProduct() {
    var root = document.getElementById("product");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("id");
    var p = findProduct(id);
    if (!p) {
      root.innerHTML =
        '<p>Product not found. <a href="index.html">Back to the shop</a></p>';
      return;
    }
    document.title = p.name + " | " + window.STORE.name;
    var variantHtml =
      p.variants && p.variants.length
        ? '<label for="variant">Option</label><select id="variant">' +
          p.variants
            .map(function (v) {
              return "<option>" + esc(v) + "</option>";
            })
            .join("") +
          "</select>"
        : "";
    root.innerHTML =
      '<img class="fade" src="' +
      esc(p.image) +
      '" alt="' +
      esc(p.name) +
      '">' +
      "<div><h1>" +
      esc(p.name) +
      "</h1>" +
      '<p class="price">' +
      money(p.price) +
      "</p>" +
      "<p>" +
      esc(p.description) +
      "</p>" +
      variantHtml +
      '<label for="qty">Quantity</label>' +
      '<input id="qty" type="number" min="1" value="1">' +
      '<p><button class="btn" id="add">Add to cart</button></p>' +
      '<p class="note" id="added" role="status"></p>' +
      '<p class="note">' +
      esc(window.STORE.shippingNote) +
      "</p></div>";
    var btn = document.getElementById("add");
    var resetTimer;
    btn.addEventListener("click", function () {
      var vEl = document.getElementById("variant");
      var qty = Math.max(
        1,
        parseInt(document.getElementById("qty").value, 10) || 1,
      );
      addToCart(p.id, vEl ? vEl.value : "", qty);
      bumpCount();
      btn.textContent = "Added";
      btn.classList.add("done");
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        btn.textContent = "Add to cart";
        btn.classList.remove("done");
      }, 1600);
      document.getElementById("added").innerHTML =
        'Added to your cart. <a href="cart.html">View cart</a>';
    });
  }

  function bindCart(root) {
    if (cartBound) return;
    cartBound = true;

    root.addEventListener("change", function (e) {
      if (!e.target.classList.contains("qty-input")) return;
      var c = loadCart();
      var i = parseInt(e.target.getAttribute("data-i"), 10);
      if (!c[i]) return;
      c[i].qty = Math.max(1, parseInt(e.target.value, 10) || 1);
      saveCart(c);
      renderCart();
    });

    root.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest("[data-remove]");
      if (!btn) return;
      var index = parseInt(btn.getAttribute("data-remove"), 10);
      var row = btn.closest("tr");
      function doRemove() {
        var c = loadCart();
        c.splice(index, 1);
        saveCart(c);
        renderCart();
      }
      if (row) {
        row.classList.add("removing");
        setTimeout(doRemove, 220);
      } else {
        doRemove();
      }
    });
  }

  function renderCart() {
    var root = document.getElementById("cart");
    if (!root) return;
    bindCart(root);
    var cart = loadCart().filter(function (l) {
      return findProduct(l.id);
    });
    if (!cart.length) {
      root.innerHTML =
        '<p>Your cart is empty. <a href="index.html">Browse the shop</a></p>';
      return;
    }
    var total = 0;
    var rows = cart
      .map(function (l, i) {
        var p = findProduct(l.id);
        var line = p.price * l.qty;
        total += line;
        return (
          '<tr><td><img src="' +
          esc(p.image) +
          '" alt=""></td>' +
          "<td>" +
          esc(p.name) +
          (l.variant
            ? '<br><span class="note">' + esc(l.variant) + "</span>"
            : "") +
          "</td>" +
          '<td><input type="number" min="1" value="' +
          l.qty +
          '" data-i="' +
          i +
          '" class="qty-input" aria-label="Quantity for ' +
          esc(p.name) +
          '"></td>' +
          "<td>" +
          money(line) +
          "</td>" +
          '<td><button class="linkbtn" data-remove="' +
          i +
          '">Remove</button></td></tr>'
        );
      })
      .join("");
    root.innerHTML =
      '<table class="cart"><thead><tr><th></th><th>Product</th><th>Qty</th><th>Total</th><th></th></tr></thead><tbody>' +
      rows +
      "</tbody></table>" +
      '<div class="summary"><div class="total">Subtotal: ' +
      money(total) +
      "</div>" +
      '<p class="note">' +
      esc(window.STORE.shippingNote) +
      "</p>" +
      '<button class="btn" id="checkout">Checkout</button></div>';
    document
      .getElementById("checkout")
      .addEventListener("click", startCheckout);
  }

  function startCheckout() {
    alert("This is a demo store. Checkout is not implemented.");
  }

  function watchScroll() {
    var header = document.querySelector("header.site");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var brand = document.querySelectorAll("[data-store-name]");
    for (var i = 0; i < brand.length; i++)
      brand[i].textContent = window.STORE.name;
    updateCount();
    renderCatalog();
    renderProduct();
    renderCart();
    fadeImages();
    watchScroll();
  });
})();
