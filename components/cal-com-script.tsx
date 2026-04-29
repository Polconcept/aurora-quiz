'use client'

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalComScript() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"halotherapy"});
      cal("ui", {
        "theme": "light",
        "styles": {
          "branding": {
            "brandColor": "#000000"
          }
        },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return null;
}
