let FALLBACK_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3ODI3NTQxMjkuNjg1LCJkYXRhIjp7Il9pZCI6IjZhMzNmYzFiYmRmMWQxZTM5Y2M3MzE2ZSIsInVzZXJuYW1lIjoiOTk5Nzk4NTY5NCIsImZpcnN0TmFtZSI6IkhlZSIsImxhc3ROYW1lIjoiIiwib3JnYW5pemF0aW9uIjp7Il9pZCI6IjVlYjM5M2VlOTVmYWI3NDY4YTc5ZDE4OSIsIndlYnNpdGUiOiJwaHlzaWNzd2FsbGFoLmNvbSIsIm5hbWUiOiJQaHlzaWNzd2FsbGFoIn0sInJvbGVzIjpbIjViMjdiZDk2NTg0MmY5NTBhNzc4YzZlZiJdLCJjb3VudHJ5R3JvdXAiOiJJTiIsIm9uZVJvbGVzIjpbXSwidHlwZSI6IlVTRVIifSwianRpIjoib1liQnc4Sm9RT1dMNXpveGg0OWpHUV82YTMzZmMxYmJkZjFkMWUzOWNjNzMxNmUiLCJpYXQiOjE3ODIxNDkzMjl9.h3s0dsfBn4JmEs6GtP5-FSNJ_v07YINZFHrnNJXhVec";
const FB_URL = "https://pwadmin-13749-default-rtdb.asia-southeast1.firebasedatabase.app";

const DIRECT_HEADERS_BASE = {
  "User-Agent": "Dalvik/2.1.0",
  "client-id": "ADMIN",
  "client-type": "MOBILE",
  "client-version": "538",
  "device-meta": '{"APP_VERSION":"538","APP_VERSION_NAME":"15.32.0","DEVICE_MAKE":"Samsung","DEVICE_MODEL":"SM-A707F","OS_VERSION":"11","PACKAGE_NAME":"xyz.penpencil.physicswala","network":"wifi_data","carrier":"UNDEFINED"}'
};

async function pw(url) {
  try {
    const fbRes = await fetch(`${FB_URL}/settings/fallback_token.json`);
    if (fbRes.ok) {
      const fbToken = await fbRes.json();
      if (fbToken) FALLBACK_TOKEN = fbToken.startsWith('Bearer') ? fbToken : 'Bearer ' + fbToken;
    }
  } catch(e) {}

  const checkValid = (data) => {
    if (!data || data.success === false) return false;
    return !!data.data;
  };

  const tryFetch = async (authToken) => {
    try {
      const res = await fetch('/api/pw?url=' + encodeURIComponent(url), { 
        headers: { 'X-PW-Token': authToken.replace('Bearer ', '') } 
      });
      if (res.ok) {
        const data = await res.json();
        if (checkValid(data)) return data;
      }
    } catch(e) {}
    return null;
  };

  let result = await tryFetch(FALLBACK_TOKEN);
  if (result) return result;

  try {
    const usersRes = await fetch(`${FB_URL}/users.json`);
    if (usersRes.ok) {
      const users = await usersRes.json();
      for (const phone in users) {
        const uToken = users[phone].token;
        if (!uToken) continue;
        let rotResult = await tryFetch(uToken.startsWith('Bearer') ? uToken : 'Bearer ' + uToken);
        if (rotResult) return rotResult;
      }
    }
  } catch(e) {}

  return null;
}
