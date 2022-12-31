

(function($) {
    "use strict";
    $(document).ready(function() {
        const URL = window.location.href
        if (URL.includes("dev") || URL.includes("localhost")) {
            $("#environment").val("dev");
            $("#organizationId").val("27ad1cb5-5dde-4328-9fdc-bfec00aa474a");
            $("#baseSubmissionUrl").val("https://t7hp8bp6p7.execute-api.us-east-1.amazonaws.com/dev");
            console.log("dev test environment")
        } else if (URL.includes("staging")) {
            $("#environment").val("staging");
            $("#organizationId").val("d210fb9f-2dd1-40cb-a4d5-1c8edc5075ae");
            $("#baseSubmissionUrl").val("https://0hq4nnkv01.execute-api.us-east-1.amazonaws.com/staging");
            console.log("staging test environment")
        } else {
            $("#environment").val("prod");
            $("#organizationId").val("93bd1850-2396-46c9-b492-340440462814");
            $("#baseSubmissionUrl").val("https://a3kz0sgghi.execute-api.us-east-1.amazonaws.com/prod");
        }
    });

})(jQuery);
