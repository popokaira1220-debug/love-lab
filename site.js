/* 全ページ共通：計測・広告・アフィリエイトリンクの差し込み（設定は config.js） */
(function () {
  var C = window.LOVELAB || {links: {}};

  function loadScript(src) {
    var s = document.createElement("script");
    s.async = true; s.src = src; s.crossOrigin = "anonymous";
    document.head.appendChild(s);
  }

  // --- Googleアナリティクス4 ---
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  if (C.ga4) {
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + C.ga4);
    gtag("js", new Date());
    gtag("config", C.ga4);
  }
  // 計測イベント（GA未設定なら何もしない）
  window.track = function (name, params) {
    if (C.ga4) gtag("event", name, params || {});
  };

  // --- Googleアドセンス（自動広告） ---
  if (C.adsense) {
    loadScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + C.adsense);
  }

  // --- アフィリエイトリンク ---
  // <a data-aff="pairs">       … href と表示名を config.js から入れる。URL未設定なら非表示
  // <div data-aff-card="pairs"> … 名前・説明・ボタンのカードを生成
  // .aff-box                    … 中のリンクが全部非表示なら、枠ごと非表示
  window.affCard = function (id, where) {
    var p = C.links[id];
    if (!p || !p.url) return "";
    return '<div class="app"><b>' + p.name + '</b><p>' + p.note + '</p>' +
      '<a class="btn" data-aff="' + id + '" data-where="' + (where || "") + '">公式サイトを見る</a></div>';
  };

  window.applyAff = function (root) {
    root = root || document;
    root.querySelectorAll("[data-aff-card]").forEach(function (el) {
      el.outerHTML = affCard(el.getAttribute("data-aff-card"), el.getAttribute("data-where"));
    });
    root.querySelectorAll("a[data-aff]").forEach(function (a) {
      var p = C.links[a.getAttribute("data-aff")];
      if (!p || !p.url) { a.style.display = "none"; return; }
      a.href = p.url;
      a.target = "_blank";
      a.rel = "nofollow noopener sponsored";
      // ASPの表示計測用ピクセル（リンク1つにつき1回だけ）
      if (p.pixel && !a.getAttribute("data-px")) {
        var img = new Image(1, 1);
        img.src = p.pixel; img.alt = ""; img.style.cssText = "position:absolute;width:1px;height:1px;border:0";
        a.insertAdjacentElement("afterend", img);
        a.setAttribute("data-px", "1");
      }
      if (!a.textContent.trim()) a.textContent = p.name + " 公式サイト";
    });
    root.querySelectorAll(".aff-box").forEach(function (box) {
      var visible = Array.prototype.some.call(box.querySelectorAll("a[data-aff]"), function (a) {
        return a.style.display !== "none";
      });
      box.style.display = visible ? "" : "none";
    });
  };

  // クリック計測（どのサービスが・どのページの・どの枠で押されたか）
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-aff]");
    if (a) track("aff_click", {service: a.getAttribute("data-aff"), where: a.getAttribute("data-where") || "", page: location.pathname});
  });

  document.addEventListener("DOMContentLoaded", function () { applyAff(); });
})();
