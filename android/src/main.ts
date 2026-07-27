import { App } from "@capacitor/app";
import { WebView } from "@capacitor/webview";
import { StatusBar, Style } from "@capacitor/status-bar";

const NENCHAN_URL = "https://nenchan.vercel.app/api";

const INJECT_CSS = `
(function() {
  if (document.getElementById('nenchan-safe-area')) return;
  var s = document.createElement('style');
  s.id = 'nenchan-safe-area';
  s.textContent = 'body{padding-top:env(safe-area-inset-top,24px)!important;padding-bottom:env(safe-area-inset-bottom,0px)!important;}';
  document.head.appendChild(s);
})();
`;

async function init() {
  await StatusBar.setStyle({ style: Style.Light });
  await StatusBar.setOverlaysWebView({ overlay: true });
  await StatusBar.setBackgroundColor({ color: "#0d1117" });

  await WebView.loadUrl({ url: NENCHAN_URL });

  setTimeout(async () => {
    try { await WebView.executeJavaScript({ code: INJECT_CSS }); } catch {}
  }, 2000);

  setInterval(async () => {
    try { await WebView.executeJavaScript({ code: INJECT_CSS }); } catch {}
  }, 5000);
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
