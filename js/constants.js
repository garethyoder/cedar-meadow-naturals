

(function($) {
    "use strict";
    $(document).ready(function() {
        const URL = window.location.href
        if (URL.includes("dev") || URL.includes("localhost")) {
            $("#environment").val("dev");
            $("#organizationId").val("27ad1cb5-5dde-4328-9fdc-bfec00aa474a");
            $("#baseSubmissionUrl").val("https://1ywgkjq5x4.execute-api.us-east-1.amazonaws.com/dev");
            console.log("dev test environment")
        } else {
            $("#environment").val("prod");
            $("#organizationId").val("93bd1850-2396-46c9-b492-340440462814");
            $("#baseSubmissionUrl").val("https://5zmad1qxli.execute-api.us-east-1.amazonaws.com/prod");
        }
    });

})(jQuery);
