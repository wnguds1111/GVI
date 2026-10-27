/* 접속 IP 제한 — 허용 목록(회사 공인 IP)에서 온 요청만 기획서 정적 파일을 보여 준다.
   IP 를 추가 · 변경하려면 ALLOW / ALLOW_V6_64 에 넣고 커밋하면 Cloudflare 빌드가 다시 배포한다. */
const ALLOW = new Set([
  // GVI office
  "128.241.92.2",
  "2001:418:4005:1:cd1a:10dd:18fc:5228",
  // LATAM office
  "187.102.184.91",
  // GV office
  "119.192.146.201",
  "119.192.146.202",
  "119.192.146.203",
  // added 2026-10-27
  "118.235.12.151",
  "2001:e60:857a:47f7:f122:8d7c:3226:109b",
]);

/* IPv6 /64 대역 — 앞 4묶음(64비트)만 비교 */
const ALLOW_V6_64 = [
  "2001:418:4005:1::/64",   // GVI office
].map((cidr) => prefix64(cidr.split("/")[0]));

/* IPv6 주소를 8묶음으로 풀어 앞 4묶음을 "2001:0418:4005:0001" 꼴로 돌려준다 (IPv4 면 null) */
function prefix64(ip) {
  if (!ip.includes(":")) return null;
  const [head, tail = ""] = ip.toLowerCase().split("::");
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  const groups = ip.includes("::") ? [...h, ...Array(8 - h.length - t.length).fill("0"), ...t] : h;
  if (groups.length !== 8) return null;
  return groups.slice(0, 4).map((g) => g.padStart(4, "0")).join(":");
}

function allowed(ip) {
  if (ALLOW.has(ip)) return true;
  const p = prefix64(ip);
  return p !== null && ALLOW_V6_64.includes(p);
}

/* 허용 목록 밖에서 접속했을 때 보이는 안내 화면 */
function denied(ip) {
  const esc = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>접근 불가</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box;
         background: #F8FAFC; color: #111827; font-family: -apple-system, "Segoe UI", "Malgun Gothic", sans-serif; }
  .box { max-width: 420px; width: 100%; padding: 36px 28px; text-align: center; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; }
  h1 { margin: 0 0 10px; font-size: 20px; }
  p { margin: 0; font-size: 15px; line-height: 1.6; color: #374151; }
  .ip { margin-top: 18px; font-size: 12px; color: #9CA3AF; }
</style></head>
<body><div class="box">
  <h1>접근 불가한 IP입니다</h1>
  <p>웹기획 Unit 이주형에게 문의해 주세요.</p>
  <div class="ip">접속 IP: ${esc(ip || "알 수 없음")}</div>
</div></body></html>`;
}

export default {
  async fetch(request, env) {
    const ip = request.headers.get("CF-Connecting-IP") || "";
    if (!allowed(ip)) {
      return new Response(denied(ip), {
        status: 403,
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
