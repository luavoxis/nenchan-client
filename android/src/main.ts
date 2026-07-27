import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";

async function init() {
  await StatusBar.setStyle({ style: Style.Light });
  await StatusBar.setOverlaysWebView({ overlay: true });
  await StatusBar.setBackgroundColor({ color: "#0d1117" });
}

App.addListener("appUrlOpen", async ({ url }: { url: string }) => {
  window.location.href = url;
});

App.addListener("backButton", async ({ canGoBack }: { canGoBack: boolean }) => {
  if (!canGoBack) {
    App.exitApp();
  }
});

init();
