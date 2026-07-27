import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { StatusBar, Style } from "@capacitor/status-bar";

const NENCHAN_URL = "https://nenchan.vercel.app/api";

async function init() {
  await StatusBar.setStyle({ style: Style.Dark });
  await StatusBar.setBackgroundColor({ color: "#0d1117" });

  await Browser.open({
    url: NENCHAN_URL,
    presentationStyle: "fullscreen",
    toolbarColor: "#0d1117",
  });
}

App.addListener("appUrlOpen", async ({ url }) => {
  if (url.startsWith("nenchan://")) {
    const path = url.replace("nenchan://", "");
    await Browser.open({
      url: `${NENCHAN_URL}/${path}`,
      presentationStyle: "fullscreen",
    });
  }
});

App.addListener("backButton", async ({ canGoBack }) => {
  if (!canGoBack) {
    App.exitApp();
  }
});

init();
