function launchScreener(event) {
  event.preventDefault();
  if ($("#symptom-screener-overlay").hasClass("visible")) {
    closeScreener(event);
  } else {
    // Close menus, lightboxes
    if (window.activeLightbox) {
      window.activeLightbox.close();
    }

    // Display Screener
    $("#symptom-screener-overlay").removeClass("hidden");
    setTimeout(function () {
      $("#symptom-screener-overlay").addClass("visible");

      // Load symptom-screener.js on demand
      if (!JSON.parse(sessionStorage.getItem("symptomMatcherJSLoaded"))) {
        var jql = document.createElement("script");
        console.log("load js file dynamically");
        jql.src = "symptom-screener.js";
        jql.type = "text/javascript";
        document.head.appendChild(jql);
        sessionStorage.setItem("symptomMatcherJSLoaded", "true");
      }

      if (JSON.parse(sessionStorage.getItem("symptomMatcherSplashPage"))) {
        $("#symptom-screener-splash-container").removeClass("hidden");
        setTimeout(function () {
          $("#symptom-screener-splash-container").addClass("visible");
        }, 500);
      } else {
        setTimeout(function () {
          $("#symptom-matcher-content-container").removeClass("hidden");
          $("#symptom-matcher-content-container").addClass("visible");
        }, 500);
      }
    }, 0);
  }
}

function closeScreener(event) {
  event.preventDefault();
  $("#symptom-screener-overlay").removeClass("visible");
  setTimeout(function () {
    $("#symptom-screener-overlay").addClass("hidden");
  }, 500);
}

function startSymptomMatcher(event) {
  event.preventDefault();
  $("#symptom-screener-splash-container").removeClass("visible");
  $("#symptom-screener-container").append($("<div/>").addClass("loader"));
  $("#symptom-screener-splash-container").css("opacity", "40%");
  setTimeout(function () {
    $("#symptom-screener-splash-container").addClass("hidden");
    $("#symptom-matcher-content-container").removeClass("hidden");
    $(".loader").remove();
    $("#symptom-matcher-content-container").addClass("visible");
    sessionStorage.setItem("symptomMatcherSplashPage", "false");
  }, 500);
}
