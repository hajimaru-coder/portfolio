// swiper
const swiper = new Swiper("#js-works-swiper", {
  slidesPerView: 1, // コンテナ内に表示させるスライド数（CSSでサイズ指定する場合は 'auto'）
  spaceBetween: 20, // スライド間の余白（px）
  centeredSlides: true, // アクティブなスライドを中央に配置する

  breakpoints: {
    // ブレークポイント
    768: {
      slidesPerView: 2,
    },
  },

  loop: true,

  navigation: {
    nextEl: "#js-works-next",
    prevEl: "#js-works-prev",
  },

  pagination: {
    el: "#js-works-pagination",
  },
});

// drawer
const drawerIcon = document.querySelector("#js-drawer-icon");
const drawerContent = document.querySelector("#js-drawer-content");

if (drawerIcon) {
  drawerIcon.addEventListener("click", function (e) {
    e.preventDefault();

    drawerIcon.classList.toggle("is-checked");
    drawerContent.classList.toggle("is-checked");
  });
}

// モーダル
document.addEventListener("DOMContentLoaded", function () {
  const modalOpenItems = document.querySelectorAll(".js-modal-open");
  const modalCloseItems = document.querySelectorAll(".js-modal-close");

  // 開く時
  modalOpenItems.forEach(function (modalOpenItem) {
    modalOpenItem.addEventListener("click", function (e) {
      e.preventDefault();
      const targetModalId = this.getAttribute("data-target");
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.showModal();
        targetModal.scrollTop = 0; // モーダルのスクロール位置をトップに設定
        document.body.classList.add("p-works-modal__no-scroll"); // スクロールを無効にする
      }

      console.log(targetModal.scrollTop);
    });
  });

  // 閉じる時
  modalCloseItems.forEach(function (modalCloseItem) {
    modalCloseItem.addEventListener("click", function (e) {
      e.preventDefault();
      const dialog = this.closest("dialog");
      if (dialog) {
        dialog.close();
        document.body.classList.remove("p-works-modal__no-scroll"); // スクロールを再び有効にする
      }
    });
  });
});

// スムーススクロール
jQuery('a[href^="#"]').on("click", function (e) {
  const header = jQuery("#header").outerHeight();
  const speed = 500;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top - header;
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing"
  );
});

// スムーススクロール drawer閉じる
jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  jQuery("#js-drawer-icon").removeClass("is-checked");
  jQuery("#js-drawer-content").removeClass("is-checked");
});

// ふわっと表示
// else以降(繰り返さない場合)は必要に応じて消す
const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in-view");
    }
    // else {
    //   entry.target.classList.remove("is-in-view");
    // }
  });
});

const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItem) {
  intersectionObserver.observe(inViewItem);
});

//  google form
const $form = jQuery("#js-form");
$form.submit(function (e) {
  e.preventDefault(); // フォームのデフォルトの送信を防ぐ
  $.ajax({
    url: $form.attr("action"),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        //送信に成功したときの処理
        $form.slideUp();
        jQuery("#js-success").slideDown();
      },
      200: function () {
        //送信に失敗したときの処理
        $form.slideUp();
        jQuery("#js-error").slideDown();
      },
    },
  });
  return false;
});

// formの入力確認
const $submit = jQuery("#js-submit");
jQuery("#js-form input, #js-form textarea").on("change", function () {
  if (
    jQuery('#js-form input[type="text"]').val() !== "" &&
    jQuery('#js-form input[type="email"]').val() !== "" &&
    $('#js-form input[name="entry.1836520771"]').prop("checked") === true
  ) {
    // すべて入力された時
    $submit.prop("disabled", false);
    $submit.addClass("-active");
  } else {
    // 入力されていない時
    $submit.prop("disabled", true);
    $submit.removeClass("-active");
  }
});

// to top 非表示
jQuery(window).on("scroll", function () {
  // 100pxスクロールされたらis-showクラスを付与
  if (300 < jQuery(window).scrollTop()) {
    jQuery("#js-to-top").addClass("is-show");
    // 100px以下の場合はis-showクラスを削除
  } else {
    jQuery("#js-to-top").removeClass("is-show");
  }
});
