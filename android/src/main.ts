import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";

async function init() {
  await StatusBar.hide();
  await StatusBar.setOverlaysWebView({ overlay: true });
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
