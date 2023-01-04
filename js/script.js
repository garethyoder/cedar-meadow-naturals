$(function(){
	
	// Initialize the gallery
//	$('.thumbs a').touchTouch()

	let date = new Date()
    $("#currentDate").text(date.getFullYear())

    let ORGANIZATION_ID=$("#organizationId").val()
    let ENVIRONMENT=$("#environment").val()
    let BASE_SUBMISSION_URL=$("#baseSubmissionUrl").val()

    // Handlebars - Products
    var products_json = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': "/json/products.json",
        'dataType': "json",
        'success': function(data) {
          json = data;
        }
      });
      return json;
    })();

    var products_source = document.getElementById("products-template").innerHTML;
    var products_template = Handlebars.compile(products_source);
    var products_html = products_template(products_json);
    $("#products-template-results").html(products_html);

    // Handlebars - Clients
    var clients_json = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': "/json/clients.json",
        'dataType': "json",
        'success': function(data) {
          json = data;
        }
      });
      return json;
    })();

    var clients_source = document.getElementById("clients-template").innerHTML;
    var clients_template = Handlebars.compile(clients_source);
    var clients_html = clients_template(clients_json);
    $("#clients-template-results").html(clients_html);

    var contactFormValidationSettings = {
        messages: {
            name: "Please specify your name.",
            phone: "Please add your phone.",
            email: {
              required: "Please enter your email.",
              email: "Your email address must be in the format of name@domain.com"
            }
      }
    }
    /* Contact Form */
    $("#contactForm").validator(contactFormValidationSettings).on("submit", function(event) {
        $("#contactFormMessage").text("");
        disableButton($(this).find("button[type='submit']"))
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            contactFormError();
            contactFormMessage(false, "Please fill all fields!");
            enableButton($(this).find("button[type='submit']"))
        } else {
            // everything looks good!
            event.preventDefault();
            contactFormSubmit($(this).find("button[type='submit']"));
        }
    });

    function contactFormSubmit($element) {
        // initiate variables with form content
        const name = $("#contact-form-name").val();
        const email = $("#contact-form-email").val();
        const phone = formatPhoneNumberContactForm($("#contact-form-phone").val());
        const message = $("#contact-form-message").val();
        const hidden = $("#contact-form-hidden").val();
        const data = {
            name : name,
            phone : phone,
            email : email,
            desc : message
        };

        if (hidden === "" && phone != null) {
            $.ajax({
                type: "POST",
                url : BASE_SUBMISSION_URL + "/contact-us",
                dataType: "json",
                crossDomain: "true",
                contentType: "application/json; charset=utf-8",
                crossOrigin: false,
                data: JSON.stringify(data),

                success: function () {
                    // show a success message
                    contactFormSuccess();
                    enableButton($element)
                },
                error: function (request, status, error) {
                    // show an error message
                    console.error(error);
                    contactFormError();
                    contactFormMessage(false, "An error occurred on submission.  Please contact gyoder@cedarmeadowmeats.com");
                    enableButton($element)
                }
            });
        } else {
            console.log("hidden field has data.")
        }

    }

    function contactFormSuccess() {
        $("#contactForm")[0].reset();
        contactFormMessage(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function contactFormError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function contactFormMessage(valid, msg) {
        let msgClasses
        if (valid) {
            msgClasses = "h3 text-center tada animated";
        } else {
            msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    function formatPhoneNumberContactForm(phoneNumberString) {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        } else {
            // show an error message
            console.error("An error occurred on phone number formatting.");
            contactFormError();
            contactFormMessage(false, "An error occurred on phone number formatting.");
            return null;
        }
    }

    function disableButton($elementButton) {
        $elementButton.prop("disabled", true)
        $elementButton.find(".submit-text").hide()
        $elementButton.find(".spinner").show()
    }

    function enableButton($elementButton) {
        $elementButton.prop("disabled", false)
        $elementButton.find(".submit-text").show()
        $elementButton.find(".spinner").hide()
    }

});
