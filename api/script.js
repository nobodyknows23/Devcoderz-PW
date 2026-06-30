let FALLBACK_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3ODI3NTQxMjkuNjg1LCJkYXRhIjp7Il9pZCI6IjZhMzNmYzFiYmRmMWQxZTM5Y2M3MzE2ZSIsInVzZXJuYW1lIjoiOTk5Nzk4NTY5NCIsImZpcnN0TmFtZSI6IkhlZSIsImxhc3ROYW1lIjoiIiwib3JnYW5pemF0aW9uIjp7Il9pZCI6IjVlYjM5M2VlOTVmYWI3NDY4YTc5ZDE4OSIsIndlYnNpdGUiOiJwaHlzaWNzd2FsbGFoLmNvbSIsIm5hbWUiOiJQaHlzaWNzd2FsbGFoIn0sInJvbGVzIjpbIjViMjdiZDk2NTg0MmY5NTBhNzc4YzZlZiJdLCJjb3VudHJ5R3JvdXAiOiJJTiIsIm9uZVJvbGVzIjpbXSwidHlwZSI6IlVTRVIifSwianRpIjoib1liQnc4Sm9RT1dMNXpveGg0OWpHUV82YTMzZmMxYmJkZjFkMWUzOWNjNzMxNmUiLCJpYXQiOjE3ODIxNDkzMjl9.h3s0dsfBn4JmEs6GtP5-FSNJ_v07YINZFHrnNJXhVec";
const FB_URL = "https://pwadmin-13749-default-rtdb.asia-southeast1.firebasedatabase.app";

function getToken() {
  return (typeof window !== 'undefined' && window.localStorage) ? localStorage.getItem('pw_token') || '' : '';
}

if (typeof window !== 'undefined') {
  window.openExternal = function(e, url) {
    if (/Android/i.test(navigator.userAgent)) {
      e.preventDefault();
      window.location.href = url.replace(/^https?:\/\//, 'intent://') + '#Intent;scheme=https;end;';
    }
  };
}

async function pw(url) {
  const checkValid = (data) => data && data.data;

  const tryFetch = async (authToken) => {
    try {
      const res = await fetch('/api/pw?url=' + encodeURIComponent(url), { 
        headers: { 'x-pw-token': authToken.replace('Bearer ', '') } 
      });
      const data = await res.json();
      if (checkValid(data)) return data;
    } catch(e) {}
    return null;
  };

  let result = await tryFetch(FALLBACK_TOKEN);
  if (result) return result;

  try {
    const fbRes = await fetch(`${FB_URL}/users.json`);
    const users = await fbRes.json();
    for (const phone in users) {
      let rot = await tryFetch(users[phone].token);
      if (rot) return rot;
    }
  } catch(e) {}

  return null;
}
