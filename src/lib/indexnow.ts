/**
 * IndexNow ping — notify Bing/Yandex/Seznam of new or updated URLs.
 * https://www.indexnow.org/documentation
 */

const KEY = process.env.INDEXNOW_KEY ?? "e6dc8fff34731f1065c1f316ee970956";
const HOST = process.env.INDEXNOW_HOST ?? "bestgpacalculator.online";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export interface IndexNowResult {
  ok: boolean;
  status: number;
  message: string;
}

export async function indexNowPing(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { ok: false, status: 0, message: "no urls" };
  }
  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });
    return {
      ok: res.ok,
      status: res.status,
      message: res.ok ? "ok" : await res.text(),
    };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      message: (e as Error).message,
    };
  }
}
