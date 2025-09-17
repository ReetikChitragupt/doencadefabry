function printTearsheet() {
  var tmpWindow = window.open("", "Print", "height=600,width=800");
  var content = $("#tearsheet").html();

  tmpWindow.document.write("<html><head><title>Fabry Tearsheet</title>");
  tmpWindow.document.write(
    '<style>body{font-family:"Karla","Helvetica",sans-serif;} th { padding: 10px; border: 1px solid #efefef; } td { padding: 10px; border: 1px solid #efefef; vertical-align: middle; }</style>'
  );
  tmpWindow.document.write("</head><body>");
  tmpWindow.document.write(content);
  tmpWindow.document.write("</body></html>");

  tmpWindow.document.close();
  tmpWindow.focus();
  tmpWindow.print();
  tmpWindow.close();
  return true;
}
var symptomScreenerApiHost =
  window.symptomScreenerApiHost || "http://localhost:8080";
$.ajax({
  url: symptomScreenerApiHost + "/fabry/api/download-tearsheet",
  method: "GET",
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("tgFabryJwt"),
  },
  xhrFields: {
    withCredentials: true,
  },
  success: function (data) {
    if (!data.completed) {
      // $('.main-content').html('<div class="container" style="text-align: center;"><div class="row"><h2>Please complete the SymptomMatcher assessment to get your results.</h2></div></div>');
      var mainContentHtml =
        '<div class="container" style="text-align: center;"><div class="row"><h2>' +
        $("#fabry-symptom-screener-102").attr("value") +
        "</h2></div></div>";
      $(".main-content").html(mainContentHtml);
      return;
    }
    if (
      data.evaluation &&
      (typeof data.evaluation === "number" || parseInt(data.evaluation))
    ) {
      switch (parseInt(data.evaluation)) {
        case 1:
          // $('#symptom-screener-assessment-evaluation').html('you are at no increased risk to have Fabry disease.');
          $("#symptom-screener-assessment-evaluation").html(
            $("#fabry-symptom-screener-148").attr("value")
          );
          $("#symptom-screener-results-no-risk").show();
          $("#symptom-screener-results-possible-risk").remove();
          $("#symptom-screener-results-increased-risk").remove();
          break;
        case 2:
          // $('#symptom-screener-assessment-evaluation').html('you are at possible risk to have Fabry disease.');
          $("#symptom-screener-assessment-evaluation").html(
            $("#fabry-symptom-screener-149").attr("value")
          );
          $("#symptom-screener-results-no-risk").remove();
          $("#symptom-screener-results-possible-risk").show();
          $("#symptom-screener-results-increased-risk").remove();
          break;
        case 3:
          // $('#symptom-screener-assessment-evaluation').html('you are at an increased risk to have Fabry disease.');
          $("#symptom-screener-assessment-evaluation").html(
            $("#fabry-symptom-screener-150").attr("value")
          );
          $("#symptom-screener-results-no-risk").remove();
          $("#symptom-screener-results-possible-risk").remove();
          $("#symptom-screener-results-increased-risk").show();
          break;
        default:
          // alert('invalid assessment case');
          alert($("#fabry-symptom-screener-74").attr("value"));
          return;
      }
    } else {
      // alert('invalid assessment case');
      alert($("#fabry-symptom-screener-74").attr("value"));
      return;
    }
    if (data.userResponses) {
      var userResponse = data.userResponses;
      var formattedContent = "";
      if (userResponse.question1Response) {
        formattedContent += "<tr>";
        formattedContent +=
          "<td><b>" + userResponse.question1Response.prompt + "</b></td>";
        formattedContent +=
          "<td><p>" + userResponse.question1Response.value + "</p></td>";
        formattedContent += "</tr>";
      }
      if (userResponse.question2Response) {
        formattedContent += "<tr>";
        formattedContent +=
          "<td><b>" + userResponse.question2Response.prompt + "</b></td>";
        formattedContent +=
          "<td><p>" + userResponse.question2Response.value + "</p></td>";
        formattedContent += "</tr>";
      }
      if (userResponse.question3Response) {
        formattedContent += "<tr>";
        formattedContent +=
          "<td><b>" + userResponse.question3Response.prompt + "</b></td>";
        formattedContent +=
          "<td><p>" + userResponse.question3Response.value + "</p></td>";
        formattedContent += "</tr>";
      }
      if (userResponse.question4Response) {
        formattedContent += "<tr>";
        formattedContent +=
          '<td colspan="2"><b>' +
          userResponse.question4Response.prompt +
          "</b></td>";
        formattedContent += "</tr>";
        Object.keys(userResponse.question4Response.value).forEach(function (
          part
        ) {
          formattedContent += "<tr>";
          formattedContent +=
            "<td><p>" +
            userResponse.question4Response.value[part].prompt +
            "</p></td>";
          formattedContent +=
            "<td><p>" +
            userResponse.question4Response.value[part].value +
            "</p></td>";
          formattedContent += "</tr>";
        });
      }
      if (userResponse.question5Response) {
        formattedContent += "<tr>";
        formattedContent +=
          "<td><b>" + userResponse.question5Response.prompt + "</b></td>";
        formattedContent += "<td><ul>";
        userResponse.question5Response.value.forEach(function (value) {
          formattedContent += "<li>" + value + "</li>";
        });
        formattedContent += "</ul></td>";
        formattedContent += "</tr>";
      }
      if (userResponse.question6Response) {
        formattedContent += "<tr>";
        formattedContent +=
          "<td><b>" + userResponse.question6Response.prompt + "</b></td>";
        formattedContent += "<td><ul>";
        userResponse.question6Response.value.forEach(function (value) {
          formattedContent += "<li>" + value + "</li>";
        });
        formattedContent += "</ul></td>";
        formattedContent += "</tr>";
      }
      if (userResponse.question8Response) {
        formattedContent += "<tr>";
        formattedContent +=
          "<td><b>" + userResponse.question8Response.prompt + "</b></td>";
        formattedContent += "<td><ul>";
        userResponse.question8Response.value.forEach(function (value) {
          formattedContent += "<li>" + value + "</li>";
        });
        formattedContent += "</ul></td>";
        formattedContent += "</tr>";
      }
      if (userResponse.question9Response) {
        formattedContent += "<tr>";
        formattedContent +=
          '<td colspan="2"><b>' +
          userResponse.question9Response.prompt +
          "</b></td>";
        formattedContent += "</tr>";
        Object.keys(userResponse.question9Response.value).forEach(function (
          key
        ) {
          if (!userResponse.question9Response.value[key]) return;
          formattedContent += "<tr>";
          var name = key.charAt(0).toUpperCase() + key.slice(1);
          formattedContent +=
            "<td><p>" + name.match(/([A-Z]?[^A-Z]*)/g).join(" ") + "</p></td>";
          formattedContent +=
            "<td><p>" +
            userResponse.question9Response.value[key].value +
            "</p></td>";
          formattedContent += "</tr>";
        });
      }
      $("#symptom-screener-assessment-user-responses").html(formattedContent);
    }
  },
  error: function (err) {
    $(".main-content").detach();
    if (err.status == 401) {
      // $('.main-content').html('<div class="container" style="text-align: center;"><div class="row"><h2>Please complete the SymptomMatcher assessment to get your results.</h2></div></div>');
      var mainContentHtml =
        '<div class="container" style="text-align: center;"><div class="row"><h2>' +
        $("#fabry-symptom-screener-102").attr("value") +
        "</h2></div></div>";
      $(".main-content").html(mainContentHtml);
    } else {
      // alert('There was an issue downloading the tear sheet. Please try again or contact a site administrator.');
      alert($("#fabry-symptom-screener-126").attr("value"));
    }
  },
});
