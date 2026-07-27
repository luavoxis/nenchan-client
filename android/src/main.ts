import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";

const NENCHAN_URL = "https://nenchan.vercel.app/api";

async function init() {
  await StatusBar.setStyle({ style: Style.Light });
  await StatusBar.setBackgroundColor({ color: "#0d1117" });
}

App.addListener("backButton", async ({ canGoBack }: { canGoBack: boolean }) => {
  if (!canGoBack) {
    App.exitApp();
  }
});

init();
