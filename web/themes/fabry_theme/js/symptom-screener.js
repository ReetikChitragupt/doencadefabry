/* if no API host deployment is specified, fall back to localhost */

var symptomScreenerApiHost =
  window.symptomScreenerApiHost || "http://localhost:8080";
var symptomScreener = new Vue({
  el: "#symptom-screener-container",
  data: {
    question1: {
      value: null,
      completed: false,
    },
    question2: {
      value: null,
      completed: false,
    },
    question3: {
      value: null,
      completed: false,
    },
    question4: {
      value: {
        partA: null,
        partB: null,
        partC: null,
        partD: null,
        partE: null,
      },
      completed: false,
    },
    question5: {
      value: [],
      oldValue: [],
      completed: false,
    },
    question6: {
      value: [],
      oldValue: [],
      completed: false,
    },
    question8: {
      pageNumber: 1,
      value: [],
      oldValue: [],
      completed: false,
    },
    question9: {
      activeQuestion: null,
      value: {
        classicFabryMale: null,
        classicFabryFemale: null,
        lateOnsetFabryMale: null,
        taiwanSpliceMale: null,
        taiwanSpliceFemale: null,
        taiwanSpliceFemaleBaby: null,
      },
      completed: false,
    },
    submittedPart1: false,
    submittedPart2: false,
    submittedStories: false,
    previousVisitor: false,
    hydrationResponse: null,
    shouldAnimate: true,
    finished: false,
  },
  computed: {
    
    isChild: function () {
      return this.question3.value < 12;
    },
    isYoungAdult: function () {
      return this.question3.value > 19;
    },
    isAdult: function () {
      return this.question3.value > 25;
    },
    // todo: see if these values can be injected as template variables for Chinese translation
    q1prompt: function () {
      
      return "Are you learning about your disease risk for: ";
    },
    q2prompt: function () {
      switch (this.question1.value) {
        case "SELF":
          return "What is your gender?";
          break;
        case "OTHER":
          return "What is their gender?";
          break;
        default:
          return "What is your gender?";
      }
    },
    q3prompt: function () {
      switch (this.question1.value) {
        case "SELF":
          return "What is your age?";
          break;
        case "OTHER":
          switch (this.question2.value) {
            case "MALE":
              return "What is his age?";
              break;
            case "FEMALE":
              return "What is her age?";
              break;
            default:
              return "What is their age?";
          }
          break;
        default:
          return "What is your age?";
      }
    },
    q4prompt: function () {
      switch (this.question1.value) {
        case "SELF":
          return "Has anyone in your family been diagnosed with: ";
          break;
        case "OTHER":
          switch (this.question2.value) {
            case "MALE":
              return "Has anyone in his family been diagnosed with: ";
              break;
            case "FEMALE":
              return "Has anyone in her family been diagnosed with: ";
              break;
            default:
              return "Has anyone in their family been diagnosed with: ";
          }
          break;
        default:
          return "Has anyone in your family been diagnosed with: ";
      }
    },
    q5prompt: function () {
      switch (this.question1.value) {
        case "SELF":
          return "Has your doctor told you that you have: ";
          break;
        case "OTHER":
          switch (this.question2.value) {
            case "MALE":
              return "Has his doctor told him that he has: ";
              break;
            case "FEMALE":
              return "Has her doctor told her that she has: ";
              break;
            default:
              return "Has their doctor told them that they have: ";
          }
          break;
        default:
          return "Has your doctor told you that you have: ";
      }
    },
    q6prompt: function () {
      switch (this.question1.value) {
        case "SELF":
          return "Have you experienced any of the following: ";
          break;
        case "OTHER":
          switch (this.question2.value) {
            case "MALE":
              return "Has he experienced any of the following: ";
              break;
            case "FEMALE":
              return "Has she experienced any of the following: ";
              break;
            default:
              return "Have they experienced any of the following: ";
          }
          break;
        default:
          return "Have you experienced any of the following: ";
      }
    },
    q8prompt: function () {
      switch (this.question1.value) {
        case "SELF":
          return "Has your doctor told you of any of the following: ";
          break;
        case "OTHER":
          switch (this.question2.value) {
            case "MALE":
              return "Has his doctor told him of any of the following: ";
              break;
            case "FEMALE":
              return "Has her doctor told her of any of the following: ";
              break;
            default:
              return "Has their doctor told them of any of the following: ";
          }
          break;
        default:
          return "Has your doctor told you of any of the following: ";
      }
    },
    q9prompt: function () {
      switch (this.question1.value) {
        case "SELF":
          return "Rate how much each of the following stories sound like you:";
          break;
        case "OTHER":
          switch (this.question2.value) {
            case "MALE":
              return "Rate how much each of the following stories sound like him:";
              break;
            case "FEMALE":
              return "Rate how much each of the following stories sound like her:";
              break;
            default:
              return "Rate how much each of the following stories sound like them:";
          }
          break;
        default:
          return "Rate how much each of the following stories sound like you";
      }
    },
    q10prompt: function () {
      return "You have reached the end of the assessment. Please download the tear sheet via the link below for your records.";
    },
  },
  watch: {
    previousVisitor: function (newVal, oldVal) {
      newVal == true
        ? $("#symptom-screener-rehydration-prompt").removeClass("hidden")
        : $("#symptom-screener-rehydration-prompt").addClass("hidden");
    },
    "question1.value": function (newVal, oldVal) {
      this.question1.completed = false;
      switch (newVal) {
        case "SELF":
          $("#symptom-screener-option-1-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-1-2").removeClass(
            "symptom-screener-selected"
          );
          var self = this;
          setTimeout(function () {
            self.question1.completed = true;
          }, 0);
          break;
        case "OTHER":
          $("#symptom-screener-option-1-2").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-1-1").removeClass(
            "symptom-screener-selected"
          );
          var self = this;
          setTimeout(function () {
            self.question1.completed = true;
          }, 0);
          break;
        default:
          $("#symptom-screener-option-1-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-1-2").removeClass(
            "symptom-screener-selected"
          );
          break;
      }
    },
    "question1.completed": function (newVal, oldVal) {
      if (newVal) {
        $(
          "#symptom-screener-dialogue-item-1 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");
        $("#symptom-screener-dialogue-item-2").removeClass("hidden");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue-item-2").animate(
            { right: "0" },
            800,
            function () {
              setTimeout(function () {
                $("#symptom-screener-q2-typing-indicator").addClass("hidden");
                $("#symptom-screener-q2-prompt").removeClass("hidden");
                $("#symptom-screener-q2-options").show(500);
                $("#symptom-screener-dialogue").animate(
                  {
                    scrollTop: $("#symptom-screener-dialogue-item-2")[0]
                      .offsetTop,
                  },
                  500
                );
              }, 500);
            }
          );
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#symptom-screener-dialogue-item-2")[0].offsetTop,
            },
            1000
          );
        } else {
          $("#symptom-screener-q2-typing-indicator").addClass("hidden");
          $("#symptom-screener-q2-prompt").removeClass("hidden");
          $("#symptom-screener-q2-options").show(0);
          $("#symptom-screener-dialogue-item-2").css({ right: "0" });
        }
      } else {
        $("#symptom-screener-dialogue-item-2").addClass("hidden");
        $("#symptom-screener-q2-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q2-prompt").addClass("hidden");
        $("#symptom-screener-q2-options").hide();
        $("#symptom-screener-dialogue-item-2").css({ right: "100%" });

        $(
          "#symptom-screener-dialogue-item-1 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    "question2.value": function (newVal, oldVal) {
      this.question2.completed = false;
      switch (newVal) {
        case "MALE":
          $("#symptom-screener-option-2-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-2-2").removeClass(
            "symptom-screener-selected"
          );
          this.question9.activeQuestion = "9A";
          var self = this;
          setTimeout(function () {
            self.question2.completed = true;
          }, 0);
          break;
        case "FEMALE":
          $("#symptom-screener-option-2-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-2-2").addClass(
            "symptom-screener-selected"
          );
          this.question9.activeQuestion = "9B";
          var self = this;
          setTimeout(function () {
            self.question2.completed = true;
          }, 0);
          break;
        default:
          $("#symptom-screener-option-2-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-2-2").removeClass(
            "symptom-screener-selected"
          );
          break;
      }
    },
    "question2.completed": function (newVal, oldVal) {
      if (newVal) {
        $("#symptom-screener-dialogue-item-3").removeClass("hidden");
        $(
          "#symptom-screener-dialogue-item-2 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue-item-3").animate(
            { right: "0" },
            800,
            function () {
              setTimeout(function () {
                $("#symptom-screener-q3-typing-indicator").addClass("hidden");
                $("#symptom-screener-q3-prompt").removeClass("hidden");
                $("#symptom-screener-q3-options").show(500);
                $("#symptom-screener-dialogue").animate(
                  {
                    scrollTop: $("#symptom-screener-dialogue-item-3")[0]
                      .offsetTop,
                  },
                  500
                );
              }, 500);
            }
          );
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#symptom-screener-dialogue-item-3")[0].offsetTop,
            },
            1000
          );
        } else {
          $("#symptom-screener-dialogue-item-3").css({ right: "0" });
          $("#symptom-screener-q3-typing-indicator").addClass("hidden");
          $("#symptom-screener-q3-prompt").removeClass("hidden");
          $("#symptom-screener-q3-options").show(0);
        }
      } else {
        $("#symptom-screener-dialogue-item-3").addClass("hidden");
        $("#symptom-screener-dialogue-item-3").css({ right: "100%" });
        $("#symptom-screener-q3-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q3-prompt").addClass("hidden");
        $("#symptom-screener-q3-options").hide();

        $(
          "#symptom-screener-dialogue-item-2 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    "question3.value": function (newVal, oldVal) {
      this.question3.completed = false;
      if (!newVal) {
        $("#symptom-screener-dialogue-item-3-age").val(null);
      } else {
        var self = this;
        setTimeout(function () {
          self.question3.completed = true;
        }, 0);
        if (self.question3.value <= 12) {
          this.question9.activeQuestion = null; //no PE
        }
      }
    },
    "question3.completed": function (newVal, oldVal) {
      if (newVal) {
        $("#symptom-screener-dialogue-item-4").removeClass("hidden");
        $(
          "#symptom-screener-dialogue-item-3 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue-item-4").animate(
            { right: "0" },
            800,
            function () {
              setTimeout(function () {
                $("#symptom-screener-q4-typing-indicator").addClass("hidden");
                $("#symptom-screener-q4-prompt").removeClass("hidden");
                $("#symptom-screener-q4-options").show(500);
                $("#symptom-screener-dialogue").animate(
                  {
                    scrollTop: $("#symptom-screener-dialogue-item-4")[0]
                      .offsetTop,
                  },
                  500
                );
              }, 500);
            }
          );
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#symptom-screener-dialogue-item-4")[0].offsetTop,
            },
            1000
          );
        } else {
          $("#symptom-screener-dialogue-item-4").css({ right: "0" });
          $("#symptom-screener-q4-typing-indicator").addClass("hidden");
          $("#symptom-screener-q4-prompt").removeClass("hidden");
          $("#symptom-screener-q4-options").show(0);
        }
      } else {
        $("#symptom-screener-dialogue-item-4").addClass("hidden");
        $("#symptom-screener-dialogue-item-4").css({ right: "100%" });
        $("#symptom-screener-q4-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q4-prompt").addClass("hidden");
        $("#symptom-screener-q4-options").hide();

        $(
          "#symptom-screener-dialogue-item-3 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    "question4.value.partA": function (selection, oldVal) {
      switch (selection) {
        case "YES":
          $("#symptom-screener-option-4-1-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "NO":
          $("#symptom-screener-option-4-1-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-2").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "DONT_KNOW":
          $("#symptom-screener-option-4-1-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-3").addClass(
            "symptom-screener-selected"
          );
          break;
        default:
          $("#symptom-screener-option-4-1-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-1-3").removeClass(
            "symptom-screener-selected"
          );
          break;
      }
    },
    "question4.value.partB": function (selection, oldVal) {
      switch (selection) {
        case "YES":
          $("#symptom-screener-option-4-2-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "NO":
          $("#symptom-screener-option-4-2-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-2").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "DONT_KNOW":
          $("#symptom-screener-option-4-2-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-3").addClass(
            "symptom-screener-selected"
          );
          break;
        default:
          $("#symptom-screener-option-4-2-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-2-3").removeClass(
            "symptom-screener-selected"
          );
          break;
      }
    },
    "question4.value.partC": function (selection, oldVal) {
      switch (selection) {
        case "YES":
          $("#symptom-screener-option-4-3-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "NO":
          $("#symptom-screener-option-4-3-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-2").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "DONT_KNOW":
          $("#symptom-screener-option-4-3-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-3").addClass(
            "symptom-screener-selected"
          );
          break;
        default:
          $("#symptom-screener-option-4-3-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-3-3").removeClass(
            "symptom-screener-selected"
          );
          break;
      }
    },
    "question4.value.partD": function (selection, oldVal) {
      switch (selection) {
        case "YES":
          $("#symptom-screener-option-4-4-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "NO":
          $("#symptom-screener-option-4-4-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-2").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "DONT_KNOW":
          $("#symptom-screener-option-4-4-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-3").addClass(
            "symptom-screener-selected"
          );
          break;
        default:
          $("#symptom-screener-option-4-4-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-4-3").removeClass(
            "symptom-screener-selected"
          );
          break;
      }
    },
    "question4.value.partE": function (selection, oldVal) {
      switch (selection) {
        case "YES":
          $("#symptom-screener-option-4-5-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "NO":
          $("#symptom-screener-option-4-5-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-2").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-3").removeClass(
            "symptom-screener-selected"
          );
          break;
        case "DONT_KNOW":
          $("#symptom-screener-option-4-5-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-3").addClass(
            "symptom-screener-selected"
          );
          break;
        default:
          $("#symptom-screener-option-4-5-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-4-5-3").removeClass(
            "symptom-screener-selected"
          );
          break;
      }
    },
    "question4.value": {
      deep: true,
      handler: function () {
        if (
          this.question4.value.partA &&
          this.question4.value.partB &&
          this.question4.value.partC &&
          this.question4.value.partD &&
          this.question4.value.partE
        ) {
          var self = this;
          setTimeout(function () {
            self.question4.completed = true;
          }, 0);
        } else {
          // may want to change this to allow user to change answer w/o resetting subsequent questions
          this.question4.completed = false;
        }
      },
    },
    "question4.completed": function (newVal, oldVal) {
      if (newVal) {
        $("#symptom-screener-dialogue-item-5").removeClass("hidden");
        $(
          "#symptom-screener-dialogue-item-4 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue-item-5").animate(
            { right: "0" },
            800,
            function () {
              setTimeout(function () {
                $("#symptom-screener-q5-typing-indicator").addClass("hidden");
                $("#symptom-screener-q5-prompt").removeClass("hidden");
                $("#symptom-screener-q5-options").show(500);
                $("#symptom-screener-dialogue").animate(
                  {
                    scrollTop: $("#symptom-screener-dialogue-item-5")[0]
                      .offsetTop,
                  },
                  500
                );
              }, 500);
            }
          );
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#symptom-screener-dialogue-item-5")[0].offsetTop,
            },
            1000
          );
        } else {
          $("#symptom-screener-dialogue-item-5").css({ right: "0" });
          $("#symptom-screener-q5-typing-indicator").addClass("hidden");
          $("#symptom-screener-q5-prompt").removeClass("hidden");
          $("#symptom-screener-q5-options").show(0);
        }
      } else {
        $("#symptom-screener-dialogue-item-5").addClass("hidden");
        $("#symptom-screener-dialogue-item-5").css({ right: "100%" });
        $("#symptom-screener-q5-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q5-prompt").addClass("hidden");
        $("#symptom-screener-q5-options").hide();

        $(
          "#symptom-screener-dialogue-item-4 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    "question5.value": function (newVal, oldVal) {
      var oldValue = this.question5.oldValue;
      if (newVal instanceof Array && oldValue instanceof Array) {
        var newDiff = newVal.filter(function (el) {
          return oldValue.indexOf(el) == -1;
        });
        if (Array.isArray(newDiff) && newDiff.length > 0) {
          var self = this;
          newDiff.forEach(function (el) {
            $(self.$refs["5" + el]).addClass("symptom-screener-selected");
          });
        }

        var oldDiff = oldValue.filter(function (el) {
          return newVal.indexOf(el) == -1;
        });
        if (Array.isArray(oldDiff) && oldDiff.length > 0) {
          var self = this;
          oldDiff.forEach(function (el) {
            $(self.$refs["5" + el]).removeClass("symptom-screener-selected");
          });
        }
      }
      this.question5.oldValue = newVal.slice(0);
    },
    "question5.completed": function (newVal, oldVal) {
      if (newVal) {
        $("#symptom-screener-dialogue-item-6").removeClass("hidden");
        $(
          "#symptom-screener-dialogue-item-5 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue-item-6").animate(
            { right: "0" },
            800,
            function () {
              setTimeout(function () {
                $("#symptom-screener-q6-typing-indicator").addClass("hidden");
                $("#symptom-screener-q6-prompt").removeClass("hidden");
                $("#symptom-screener-q6-options").show(500);
                $("#symptom-screener-dialogue").animate(
                  {
                    scrollTop: $("#symptom-screener-dialogue-item-6")[0]
                      .offsetTop,
                  },
                  500
                );
              }, 500);
            }
          );
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#symptom-screener-dialogue-item-6")[0].offsetTop,
            },
            1000
          );
        } else {
          $("#symptom-screener-dialogue-item-6").css({ right: "0" });
          $("#symptom-screener-q6-typing-indicator").addClass("hidden");
          $("#symptom-screener-q6-prompt").removeClass("hidden");
          $("#symptom-screener-q6-options").show(0);
        }
      } else {
        $("#symptom-screener-dialogue-item-6").addClass("hidden");
        $("#symptom-screener-dialogue-item-6").css({ right: "100%" });
        $("#symptom-screener-q6-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q6-prompt").addClass("hidden");
        $("#symptom-screener-q6-options").hide();

        $(
          "#symptom-screener-dialogue-item-5 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    "question6.value": function (newVal, oldVal) {
      var oldValue = this.question6.oldValue;
      if (newVal instanceof Array && oldValue instanceof Array) {
        var newDiff = newVal.filter(function (el) {
          return oldValue.indexOf(el) == -1;
        });
        if (Array.isArray(newDiff) && newDiff.length > 0) {
          var self = this;
          newDiff.forEach(function (el) {
            $(self.$refs["6" + el]).addClass("symptom-screener-selected");
          });
        }

        var oldDiff = oldValue.filter(function (el) {
          return newVal.indexOf(el) == -1;
        });
        if (Array.isArray(oldDiff) && oldDiff.length > 0) {
          var self = this;
          oldDiff.forEach(function (el) {
            $(self.$refs["6" + el]).removeClass("symptom-screener-selected");
          });
        }
      }
      this.question6.oldValue = newVal.slice(0);
    },
    "question6.completed": function (newVal, oldVal) {
      if (newVal) {
        $("#submit-screening-p1-results").removeClass("hidden");
        $(
          "#symptom-screener-dialogue-item-6 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#submit-screening-p1-results")[0].offsetTop,
            },
            1000
          );
        }
      } else {
        $("#submit-screening-p1-results").addClass("hidden");
        $(
          "#symptom-screener-dialogue-item-6 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    submittedPart1: function (newVal, oldVal) {
      if (newVal) {
        if (this.finished) {
          $("#symptom-screener-dialogue-item-10").removeClass("hidden");
          if (this.shouldAnimate) {
            $("#symptom-screener-dialogue-item-10").animate(
              { right: "0" },
              800,
              function () {
                setTimeout(function () {
                  $("#symptom-screener-q10-typing-indicator").addClass(
                    "hidden"
                  );
                  $("#symptom-screener-q10-prompt").removeClass("hidden");
                  $("#symptom-screener-q10-options").show(500);
                  $("#symptom-screener-dialogue").animate(
                    {
                      scrollTop: $("#symptom-screener-dialogue-item-10")[0]
                        .offsetTop,
                    },
                    500
                  );
                }, 500);
              }
            );
            $("#symptom-screener-dialogue").animate(
              {
                scrollTop: $("#symptom-screener-dialogue-item-10")[0].offsetTop,
              },
              1000
            );
          } else {
            $("#symptom-screener-dialogue-item-10").css({ right: "0" });
            $("#symptom-screener-q10-typing-indicator").addClass("hidden");
            $("#symptom-screener-q10-prompt").removeClass("hidden");
            $("#symptom-screener-q10-options").show(0);
          }
        } else {
          if (this.shouldAnimate) {
            $("#symptom-screener-dialogue-item-8").removeClass("hidden");
            $("#symptom-screener-dialogue-item-8").animate(
              { right: "0" },
              800,
              function () {
                setTimeout(function () {
                  $("#symptom-screener-q8-typing-indicator").addClass("hidden");
                  $("#symptom-screener-q8-prompt").removeClass("hidden");
                  $("#symptom-screener-q8-options").show(500);
                  $("#symptom-screener-dialogue").animate(
                    {
                      scrollTop: $("#symptom-screener-dialogue-item-8")[0]
                        .offsetTop,
                    },
                    500
                  );
                }, 500);
              }
            );
            $("#symptom-screener-dialogue").animate(
              {
                scrollTop: $("#symptom-screener-dialogue-item-8")[0].offsetTop,
              },
              1000
            );
          } else {
            $("#symptom-screener-dialogue-item-8").css({ right: "0" });
            $("#symptom-screener-q8-typing-indicator").addClass("hidden");
            $("#symptom-screener-q8-prompt").removeClass("hidden");
            $("#symptom-screener-q8-options").show(0);
          }
        }
      } else {
        $("#symptom-screener-dialogue-item-8").addClass("hidden");
        $("#symptom-screener-dialogue-item-8").css({ right: "100%" });
        $("#symptom-screener-q8-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q8-prompt").addClass("hidden");
        $("#symptom-screener-q8-options").hide();
      }
    },
    "question8.pageNumber": function (newVal, oldVal) {
      $("#symptom-screener-q8-footer li").each(function () {
        $(this).removeClass(
          "symptom-screener-paginated-container-footer-active"
        );
      });

      $(
        "#symptom-screener-dialogue-item-8 .symptom-screener-paginated-container ul"
      ).each(function () {
        $(this).addClass("hidden");
      });

      $("#symptom-screener-dialogue-item-8-page" + String(newVal)).removeClass(
        "hidden"
      );
      $("#symptom-screener-q8-paginator-p" + String(newVal)).addClass(
        "symptom-screener-paginated-container-footer-active"
      );

      if (newVal < 5) {
        $("#symptom-screener-proceed-from-q8-button").html("Next");
      } else {
        $("#symptom-screener-proceed-from-q8-button").html(
          "I am done selecting symptoms"
        );
      }
      if (newVal == 1) {
        $("#symptom-screener-q8-previous-button").addClass("hidden");
      } else {
        $("#symptom-screener-q8-previous-button").removeClass("hidden");
      }
    },
    "question8.value": function (newVal, oldVal) {
      var oldValue = this.question8.oldValue;
      if (newVal instanceof Array && oldValue instanceof Array) {
        var newDiff = newVal.filter(function (el) {
          return oldValue.indexOf(el) == -1;
        });
        if (Array.isArray(newDiff) && newDiff.length > 0) {
          var self = this;
          newDiff.forEach(function (el) {
            $(self.$refs["8" + el]).addClass("symptom-screener-selected");
          });
        }

        var oldDiff = oldValue.filter(function (el) {
          return newVal.indexOf(el) == -1;
        });
        if (Array.isArray(oldDiff) && oldDiff.length > 0) {
          var self = this;
          oldDiff.forEach(function (el) {
            $(self.$refs["8" + el]).removeClass("symptom-screener-selected");
          });
        }
      }
      this.question8.oldValue = newVal.slice(0);
    },
    "question8.completed": function (newVal, oldVal) {
      if (newVal) {
        $("#submit-screening-p2-results").removeClass("hidden");
        $(
          "#symptom-screener-dialogue-item-8 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#submit-screening-p2-results")[0].offsetTop,
            },
            1000
          );
        }
      } else {
        $("#submit-screening-p2-results").addClass("hidden");

        $(
          "#symptom-screener-dialogue-item-8 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    submittedPart2: function (newVal, oldVal) {
      if (newVal) {
        if (this.finished) {
          if (this.shouldAnimate) {
            $("#symptom-screener-dialogue-item-10").removeClass("hidden");
            $("#symptom-screener-dialogue-item-10").animate(
              { right: "0" },
              800,
              function () {
                setTimeout(function () {
                  $("#symptom-screener-q10-typing-indicator").addClass(
                    "hidden"
                  );
                  $("#symptom-screener-q10-prompt").removeClass("hidden");
                  $("#symptom-screener-q10-options").show(500);
                  $("#symptom-screener-dialogue").animate(
                    {
                      scrollTop: $("#symptom-screener-dialogue-item-10")[0]
                        .offsetTop,
                    },
                    500
                  );
                }, 500);
              }
            );
            $("#symptom-screener-dialogue").animate(
              {
                scrollTop: $("#symptom-screener-dialogue-item-10")[0].offsetTop,
              },
              1000
            );
          } else {
            $("#symptom-screener-dialogue-item-10").css({ right: "0" });
            $("#symptom-screener-q10-typing-indicator").addClass("hidden");
            $("#symptom-screener-q10-prompt").removeClass("hidden");
            $("#symptom-screener-q10-options").show(0);
          }
        } else {
          if (this.shouldAnimate) {
            $("#symptom-screener-dialogue-item-9").removeClass("hidden");
            $("#symptom-screener-dialogue-item-9").animate(
              { right: "0" },
              800,
              function () {
                setTimeout(function () {
                  $("#symptom-screener-q9-typing-indicator").addClass("hidden");
                  $("#symptom-screener-q9-prompt").removeClass("hidden");
                  $("#symptom-screener-q9-options").show(500);
                  $("#symptom-screener-dialogue").animate(
                    {
                      scrollTop: $("#symptom-screener-dialogue-item-9")[0]
                        .offsetTop,
                    },
                    500
                  );
                }, 500);
              }
            );
            $("#symptom-screener-dialogue").animate(
              {
                scrollTop: $("#symptom-screener-dialogue-item-9")[0].offsetTop,
              },
              1000
            );
          } else {
            $("#symptom-screener-dialogue-item-9").css({ right: "0" });
            $("#symptom-screener-q9-typing-indicator").addClass("hidden");
            $("#symptom-screener-q9-prompt").removeClass("hidden");
            $("#symptom-screener-q9-options").show(0);
          }
        }
      } else {
        $("#symptom-screener-dialogue-item-9").addClass("hidden");
        $("#symptom-screener-dialogue-item-9").css({ right: "100%" });
        $("#symptom-screener-q9-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q9-prompt").addClass("hidden");
        $("#symptom-screener-q9-options").hide();
      }
    },
    "question9.activeQuestion": function (newVal, oldVal) {
      if (oldVal) {
        $(this.$refs[oldVal]).addClass("hidden");
      }
      if (newVal) {
        $(this.$refs[newVal]).removeClass("hidden");
      }
    },
    "question9.completed": function (newVal, oldVal) {
      if (newVal) {
        $("#submit-stories-results").removeClass("hidden");
        $(
          "#symptom-screener-dialogue-item-9 .symptom-screener-dialogue-bubble"
        ).addClass("symptom-screener-dialogue-item-completed");

        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#submit-stories-results")[0].offsetTop,
            },
            1000
          );
        }
      } else {
        $("#submit-stories-results").addClass("hidden");
        $(
          "#symptom-screener-dialogue-item-9 .symptom-screener-dialogue-bubble"
        ).removeClass("symptom-screener-dialogue-item-completed");
      }
    },
    submittedStories: function (newVal, oldVal) {
      if (newVal) {
        $("#symptom-screener-dialogue-item-10").removeClass("hidden");
        if (this.shouldAnimate) {
          $("#symptom-screener-dialogue-item-10").animate(
            { right: "0" },
            800,
            function () {
              setTimeout(function () {
                $("#symptom-screener-q10-typing-indicator").addClass("hidden");
                $("#symptom-screener-q10-prompt").removeClass("hidden");
                $("#symptom-screener-q10-options").show(500);
                $("#symptom-screener-dialogue").animate(
                  {
                    scrollTop: $("#symptom-screener-dialogue-item-10")[0]
                      .offsetTop,
                  },
                  500
                );
              }, 500);
            }
          );
          $("#symptom-screener-dialogue").animate(
            {
              scrollTop: $("#symptom-screener-dialogue-item-10")[0].offsetTop,
            },
            1000
          );
        } else {
          $("#symptom-screener-dialogue-item-10").css({ right: "0" });
          $("#symptom-screener-q10-typing-indicator").addClass("hidden");
          $("#symptom-screener-q10-prompt").removeClass("hidden");
          $("#symptom-screener-q10-options").show(0);
        }
      } else {
        $("#symptom-screener-dialogue-item-10").addClass("hidden");
        $("#symptom-screener-dialogue-item-10").css({ right: "100%" });
        $("#symptom-screener-q10-typing-indicator").removeClass("hidden");
        $("#symptom-screener-q10-prompt").addClass("hidden");
        $("#symptom-screener-q10-options").hide();
      }
    },
  },
  created: function () {
    var self = this;
    $.ajax({
      url: symptomScreenerApiHost + "/fabry/user/get-existing-session",
      type: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tgFabryJwt"),
      },
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        self.previousVisitor = true;
        self.hydrationResponse = data;
      },
      error: function (err) {
        if (err.status == 401) {
          $.ajax({
            url: symptomScreenerApiHost + "/fabry/user/get-new-session",
            type: "GET",
            xhrFields: {
              withCredentials: true,
            },
            success: function (data) {
              sessionStorage.setItem("tgFabryJwt", data);
            },
            error: function (err) {
              alert(
                "There was an issue initializing the Symptom Matcher. If you are planning on using this feature, please reload the page and try again."
              );
              $("#symptom-screener-container").addClass("hidden");
              console.log(err);
            },
          });
        }
      },
    });
  },
  methods: {
    // if user goes to change answer to older question, force them to go through the entire flow again
    resetSubsequentQuestions: function (questionNumber) {
      if (questionNumber < 2) {
        this.question2.value = null;
      }
      if (questionNumber < 3) {
        this.question3.value = null;
      }
      if (questionNumber < 4) {
        var self = this;
        Object.keys(this.question4.value).forEach(function (key) {
          self.question4.value[key] = null;
        });
      }
      if (questionNumber < 5) {
        this.question5.value = [];
        this.question5.completed = false;
      }
      if (questionNumber < 6) {
        this.question6.value = [];
        this.question6.completed = false;
      }
      if (questionNumber < 8) {
        this.question8.value = [];
        this.question8.pageNumber = 1;
        this.question8.completed = false;
        this.submittedPart1 = false;
      }
      if (questionNumber < 9) {
        var self = this;
        Object.keys(this.question9.value).forEach(function (key) {
          self.question9.value[key] = null;
        });

        if (this.question2.completed) {
          switch (this.question2.value) {
            case "MALE":
              this.question9.activeQuestion = "9A";
              break;
            case "FEMALE":
              this.question9.activeQuestion = "9B";
              break;
            default:
              break;
          }
        } else {
          this.question9.activeQuestion = null;
        }
        this.question9.completed = false;
        this.submittedPart2 = false;
      }
      if (questionNumber < 10) {
        this.finished = false;
        this.submittedStories = false;
        $("#symptom-screener-dialogue-item-10").addClass("hidden");
      }
    },
    rehydrateSession: function (doRehydrate) {
      if (doRehydrate) {
        /* temporarily disable animations while re-populating responses otherwise it's kind of annoying */
        this.shouldAnimate = false;

        var hydrationResponseP1 = this.hydrationResponse.phase1Response;
        if (hydrationResponseP1) {
          if (hydrationResponseP1.question1Response) {
            this.submittedPart1 = true;
            this.question1.value = hydrationResponseP1.question1Response.value;
          }
          if (hydrationResponseP1.question2Response) {
            this.question2.value = hydrationResponseP1.question2Response.value;
          }
          if (hydrationResponseP1.question3Response) {
            this.question3.value = hydrationResponseP1.question3Response.value;
            $("#symptom-screener-dialogue-item-3-age").val(
              hydrationResponseP1.question3Response.value
            );
          }
          if (hydrationResponseP1.question4Response) {
            if (hydrationResponseP1.question4Response.value.partA) {
              this.question4.value.partA =
                hydrationResponseP1.question4Response.value.partA.value;
            }
            if (hydrationResponseP1.question4Response.value.partB) {
              this.question4.value.partB =
                hydrationResponseP1.question4Response.value.partB.value;
            }
            if (hydrationResponseP1.question4Response.value.partC) {
              this.question4.value.partC =
                hydrationResponseP1.question4Response.value.partC.value;
            }
            if (hydrationResponseP1.question4Response.value.partD) {
              this.question4.value.partD =
                hydrationResponseP1.question4Response.value.partD.value;
            }
            if (hydrationResponseP1.question4Response.value.partE) {
              this.question4.value.partE =
                hydrationResponseP1.question4Response.value.partE.value;
            }
          }
          if (hydrationResponseP1.question5Response) {
            this.question5.value = hydrationResponseP1.question5Response.value;
            this.question5.completed = true;
          }
          if (hydrationResponseP1.question6Response) {
            this.question6.value = hydrationResponseP1.question6Response.value;
            this.question6.completed = true;
          }
        }
        var hydrationResponseP2 = this.hydrationResponse.phase2Response;
        if (hydrationResponseP2) {
          this.submittedPart2 = true;
          if (hydrationResponseP2.question8Response) {
            $("#symptom-screener-dialogue-item-8").removeClass("hidden");
            $("#symptom-screener-dialogue-item-8").css({ right: "0" });
            $("#symptom-screener-q8-typing-indicator").addClass("hidden");
            $("#symptom-screener-q8-prompt").removeClass("hidden");
            $("#symptom-screener-q8-options").show(0);
            this.question8.value = hydrationResponseP2.question8Response.value;
            this.question8.completed = true;
          }
        }
        var userStoriesResponse = this.hydrationResponse.userStoriesResponse;
        if (userStoriesResponse) {
          this.submittedStories = true;
          $("#symptom-screener-dialogue-item-9").removeClass("hidden");
          $("#symptom-screener-dialogue-item-9").css({ right: "0" });
          $("#symptom-screener-q9-typing-indicator").addClass("hidden");
          $("#symptom-screener-q9-prompt").removeClass("hidden");
          $("#symptom-screener-q9-options").show(0);
          this.question9.value = userStoriesResponse.question9Response.value;
          this.question9.completed = true;
          var selection;
          if (this.question9.value.classicFabryFemale != null) {
            selection = this.question9.value.classicFabryFemale.value;
          } else if (this.question9.value.classicFabryMale != null) {
            selection = this.question9.value.classicFabryMale.value;
          }
          if (selection == "A") {
            $("#symptom-screener-option-9-1").addClass(
              "symptom-screener-selected"
            );
          } else if (selection == "B") {
            $("#symptom-screener-option-9-2").addClass(
              "symptom-screener-selected"
            );
          } else if (selection == "C") {
            $("#symptom-screener-option-9-3").addClass(
              "symptom-screener-selected"
            );
          } else if (selection == "D") {
            $("#symptom-screener-option-9-4").addClass(
              "symptom-screener-selected"
            );
          }
        }
        var self = this;
        setTimeout(function () {
          setTimeout(function () {
            self.shouldAnimate = true;
          }, 0);
        }, 0);
      } else {
        $.ajax({
          url: symptomScreenerApiHost + "/fabry/user/end-existing-session",
          type: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("tgFabryJwt"),
          },
          xhrFields: {
            withCredentials: true,
          },
          success: function (data) {
            $.ajax({
              url: symptomScreenerApiHost + "/fabry/user/get-new-session",
              type: "GET",
              xhrFields: {
                withCredentials: true,
              },
              success: function (data) {
                sessionStorage.setItem("tgFabryJwt", data);
              },
              error: function (err) {
                alert(
                  "There was an issue initializing a new session. Please reload the page and try again."
                );
                console.log(err);
              },
            });
          },
          error: function (err) {
            alert(
              "There was an issue initializing a new session. Please reload the page and try again."
            );
            console.log(err);
          },
        });
      }
      this.previousVisitor = false;
    },
    processQuestion1: function (selection) {
      this.resetSubsequentQuestions(1);
      this.question1.value = selection;
    },
    processQuestion2: function (selection) {
      this.resetSubsequentQuestions(2);
      this.question2.value = selection;
    },
    processQuestion3: function () {
      this.resetSubsequentQuestions(3);
      var age = parseInt($("#symptom-screener-dialogue-item-3-age").val());
      if (!age) {
        alert("Please enter a valid number for the assessee's age.");
        return;
      }

      /* if age given in months, convert to fraction of year */
      var options = document.getElementsByName("age-type");
      options.forEach(function (option) {
        if (option.value === "months" && option.checked) {
          age = age / 12;
        }
      });

      var self = this;
      $("#spinner").removeClass("hidden");
      $.ajax({
        url: symptomScreenerApiHost + "/fabry/api/user-demographics",
        type: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("tgFabryJwt"),
        },
        xhrFields: {
          withCredentials: true,
        },
        data: JSON.stringify({
          age: age,
        }),
        success: function (data) {
          $("#spinner").addClass("hidden");
          self.question3.value = age;
        },
        error: function (err) {
          $("#spinner").addClass("hidden");
          alert("There was an issue processing your request. Please try again");
        },
      });
    },
    processQuestion4: function (selection, section) {
      // this.resetSubsequentQuestions(4);
      switch (section) {
        case 1:
          this.question4.value.partA = selection;
          break;
        case 2:
          this.question4.value.partB = selection;
          break;
        case 3:
          this.question4.value.partC = selection;
          break;
        case 4:
          this.question4.value.partD = selection;
          break;
        case 5:
          this.question4.value.partE = selection;
          break;
        default:
          break;
      }
    },
    processQuestion5: function (selection, optionId) {
      // this.resetSubsequentQuestions(5);
      if (selection) {
        this.question5.value.includes(selection)
          ? this.question5.value.splice(
              this.question5.value.indexOf(selection),
              1
            )
          : this.question5.value.push(selection);
      }
    },
    proceedFromQuestion5: function () {
      this.question5.completed = true;
    },
    processQuestion6: function (selection, optionId) {
      // this.resetSubsequentQuestions(6);
      if (selection) {
        this.question6.value.includes(selection)
          ? this.question6.value.splice(
              this.question6.value.indexOf(selection),
              1
            )
          : this.question6.value.push(selection);
      }
    },
    proceedFromQuestion6: function (newVal, oldVal) {
      this.question6.completed = true;
    },
    submitScreeningPhase1Results: function () {
      this.resetSubsequentQuestions(6);
      $("#spinner").removeClass("hidden");
      var self = this;
      var q4Response = Object.assign({}, this.question4.value);
      Object.keys(q4Response).forEach(function (key) {
        q4Response[key] = {
          value: q4Response[key],
        };
      });
      var userResponses = {
        question1Response: { value: this.question1.value },
        question2Response: { value: this.question2.value },
        question3Response: { value: this.question3.value },
        question4Response: { value: q4Response },
        question5Response: { value: this.question5.value },
        question6Response: { value: this.question6.value },
      };
      $.ajax({
        url: symptomScreenerApiHost + "/fabry/api/screening-step-1",
        type: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("tgFabryJwt"),
        },
        xhrFields: {
          withCredentials: true,
        },
        data: JSON.stringify(userResponses),
        success: function (data) {
          $("#spinner").addClass("hidden");
          var shouldContinue = data;
          self.finished = !shouldContinue;
          self.submittedPart1 = true;
        },
        error: function (err) {
          $("#spinner").addClass("hidden");
          err.status == 401
            ? alert(
                "Your session has expired. Please refresh the page to initiate a new session."
              )
            : alert(
                "There was an issue processing your submission. Please try again shortly or contact a site administrator."
              );
        },
      });
    },
    processQuestion8: function (selection, optionId) {
      this.resetSubsequentQuestions(8);
      if (selection) {
        this.question8.value.includes(selection)
          ? this.question8.value.splice(
              this.question8.value.indexOf(selection),
              1
            )
          : this.question8.value.push(selection);
      }
    },
    proceedFromQuestion8: function () {
      var page = this.question8.pageNumber;
      if (page < 4) {
        this.paginateQuestion8(page + 1);
      } else {
        this.question8.completed = true;
      }
    },
    previousPageQuestion8: function () {
      var page = this.question8.pageNumber;
      if (page > 1) {
        this.paginateQuestion8(page - 1);
      }
    },
    paginateQuestion8: function (page) {
      this.question8.pageNumber = page;
    },
    submitScreeningPhase2Results: function () {
      this.resetSubsequentQuestions(8);
      var userResponses = {
        question8Response: { value: this.question8.value },
      };
      var self = this;
      $.ajax({
        url: symptomScreenerApiHost + "/fabry/api/screening-step-2",
        type: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("tgFabryJwt"),
        },
        xhrFields: {
          withCredentials: true,
        },
        data: JSON.stringify(userResponses),
        success: function (data) {
          $("#spinner").addClass("hidden");
          var shouldContinue = data;
          self.finished = !shouldContinue;
          self.submittedPart2 = true;
        },
        error: function (err) {
          $("#spinner").addClass("hidden");
          err.status == 401
            ? alert(
                "Your session has expired. Please refresh the page to initiate a new session."
              )
            : alert(
                "There was an issue processing your submission. Please try again shortly or contact a site administrator."
              );
        },
      });
    },
    processQuestion9: function (selection) {
      // display next question
      switch (this.question9.activeQuestion) {
        case "9A":
          this.question9.value.classicFabryMale = {
            value: selection,
          };
          if (this.question3.value > 19) {
            this.question9.activeQuestion = "9C";
          } else {
            this.question9.completed = true;
          }
          break;
        case "9B":
          this.question9.value.classicFabryFemale = {
            value: selection,
          };
          if (this.question3.value > 19) {
            this.question9.activeQuestion = "9E";
          } else {
            this.question9.completed = true;
          }
          break;
        case "9C":
          this.question9.value.lateOnsetFabryMale = {
            value: selection,
          };
          if (this.question3.value > 19) {
            this.question9.activeQuestion = "9D";
          } else {
            this.question9.completed = true;
          }
          break;
        case "9D":
          this.question9.value.taiwanSpliceMale = {
            value: selection,
          };
          this.question9.completed = true;
          break;
        case "9E":
          this.question9.value.taiwanSpliceFemale = {
            value: selection,
          };
          if (this.question3.value > 25) {
            this.question9.activeQuestion = "9F";
          } else {
            this.question9.completed = true;
          }

          break;
        case "9F":
          this.question9.value.taiwanSpliceFemaleBaby = {
            value: selection,
          };
          this.question9.completed = true;
          break;
        default:
          break;
      }
      if (this.question9.completed == true) {
        if (selection == "A") {
          $("#symptom-screener-option-9-1").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-3").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-4").removeClass(
            "symptom-screener-selected"
          );
        } else if (selection == "B") {
          $("#symptom-screener-option-9-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-2").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-3").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-4").removeClass(
            "symptom-screener-selected"
          );
        } else if (selection == "C") {
          $("#symptom-screener-option-9-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-3").addClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-4").removeClass(
            "symptom-screener-selected"
          );
        } else if (selection == "D") {
          $("#symptom-screener-option-9-1").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-2").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-3").removeClass(
            "symptom-screener-selected"
          );
          $("#symptom-screener-option-9-4").addClass(
            "symptom-screener-selected"
          );
        }
      }
    },
    submitStoriesResults: function () {
      this.resetSubsequentQuestions(9);
      var userResponse = {
        question9Response: {
          value: this.question9.value,
        },
      };
      var self = this;
      $.ajax({
        url: symptomScreenerApiHost + "/fabry/api/evaluate-stories",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("tgFabryJwt"),
        },
        xhrFields: {
          withCredentials: true,
        },
        data: JSON.stringify(userResponse),
        success: function (data) {
          self.submittedStories = true;
          self.finished = true;
          $("#spinner").addClass("hidden");
          // $('#symptom-screener-dialogue-item-10').removeClass('hidden');
          // $('#symptom-screener-dialogue-item-10').animate({ 'right': '0' }, 800, function() {
          //   setTimeout(function() {
          //       $('#symptom-screener-q10-typing-indicator').addClass('hidden');
          //       $('#symptom-screener-q10-prompt').removeClass('hidden');
          //       $('#symptom-screener-q10-options').show(500);
          //       $('#symptom-screener-dialogue').animate({
          //         scrollTop: $('#symptom-screener-dialogue-item-10')[0].offsetTop
          //       }, 500);
          //     }, 500);
          // });
          // $('#symptom-screener-dialogue').animate({
          //   scrollTop: $('#symptom-screener-dialogue-item-10')[0].offsetTop
          // }, 1000);
        },
        error: function (err) {
          err.status == 401
            ? alert(
                "Your session has expired. Please refresh the page to initiate a new session."
              )
            : alert(
                "There was an issue downloading the tear sheet. Please try again or contact a site administrator."
              );
        },
      });
    },
    downloadTearSheet: function () {
      window.location.href = "symptom-matcher-results.html";
    },
  },
});
