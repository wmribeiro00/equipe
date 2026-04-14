# medic-bot — Relatório de Segurança 01
**Agente:** Stark 🤖  
**Sprint:** medic-bot-security-01  
**Data:** 2026-04-13  
**Status:** ✅ PR aberto — aguardando aprovação do Well  
**PR:** [#3 — security/traefik-headers](https://github.com/wmribeiro00/medic-bot/pull/3)

---

## 1. Estado Real Encontrado

| Componente | Estado Antes do PR |
|------------|-------------------|
| `traefik.yml` | ❌ **Não existia** no repositório |
| Redirect HTTP→HTTPS | ❌ **Não configurado** — tráfego HTTP não era redirecionado |
| `certificatesResolver` `letsencrypt` | ✅ Já presente nas labels do `docker-compose.yml` |
| Router name | ✅ `medic-bot` — identificado nas labels existentes |
| Host rule `medic.automatizeconsulting.com.br` | ✅ Já declarado corretamente |
| Security headers (HSTS, X-Frame, etc.) | ❌ **Nenhum** middleware de headers configurado |
| Dashboard Traefik | Desconhecido (não exposto no repo) |
| Iframes internos no app | ✅ Não identificados (middleware.ts e app/ analisados — sem iframes detectados) |

### Achados adicionais
- O app expõe porta `3000:3000` diretamente — tráfego local acessível sem Traefik se o firewall não estiver restrito
- `loadbalancer.server.url=http://localhost:3000` correto para container Traefik na mesma rede Docker
- `middleware.ts` implementa proteção de rota `/dashboard` via sessão — nenhum bypass identificado

---

## 2. O Que Foi Alterado

### `traefik.yml` — Arquivo NOVO criado
```yaml
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
          permanent: true   # 308 Permanent

  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      email: wmribeiro00@gmail.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web

api:
  dashboard: false

log:
  level: INFO
```

**Propósito:** Configuração estática do Traefik. Define redirect HTTP→HTTPS e formaliza o certificatesResolver que já estava referenciado nas labels mas sem configuração estática documentada no repo.

---

### `docker-compose.yml` — Labels adicionadas

**Diff resumido:**
```diff
+      # ── Security Headers Middleware ──────────────────────────────────────
+      - "traefik.http.middlewares.secheaders.headers.stsSeconds=31536000"
+      - "traefik.http.middlewares.secheaders.headers.stsIncludeSubdomains=true"
+      - "traefik.http.middlewares.secheaders.headers.stsPreload=false"
+      - "traefik.http.middlewares.secheaders.headers.forceSTSHeader=true"
+      - "traefik.http.middlewares.secheaders.headers.frameDeny=true"
+      - "traefik.http.middlewares.secheaders.headers.contentTypeNosniff=true"
+      - "traefik.http.middlewares.secheaders.headers.referrerPolicy=strict-origin-when-cross-origin"
+      - "traefik.http.middlewares.secheaders.headers.customResponseHeaders.X-Powered-By="
+      - "traefik.http.routers.medic-bot.middlewares=secheaders@docker"
```

**Headers resultantes nas respostas HTTP:**
| Header | Valor |
|--------|-------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Powered-By` | *(removido)* |

---

## 3. Riscos Identificados

| Risco | Severidade | Mitigação |
|-------|-----------|-----------|
| `traefik.yml` precisa ser copiado manualmente para o VPS | 🟡 Médio | Instruções de deploy abaixo |
| `frameDeny=true` pode quebrar iframes futuros | 🟡 Médio | Nenhum iframe detectado agora; monitorar ao adicionar embeds |
| Porta `3000` exposta diretamente no host | 🟡 Médio | Garantir que firewall do VPS bloqueie acesso externo à porta 3000 |
| Email no `acme.json` precisa ser confirmado | 🟢 Baixo | Ajustar para email correto antes do deploy |
| `stsPreload=false` — não está na lista HSTS preload | 🟢 Baixo | Intencional para evitar bloqueio permanente em fase inicial |

---

## 4. Instruções de Deploy

> ⚠️ **Não executar até aprovação do PR pelo Well.**

### Passo 1 — Merge do PR
```
https://github.com/wmribeiro00/medic-bot/pull/3
```

### Passo 2 — Pull no VPS
```bash
cd /caminho/do/projeto  # ajustar
git pull origin main
```

### Passo 3 — Copiar traefik.yml para o Traefik
Depende de como o Traefik está configurado no VPS:

**Opção A — Arquivo estático no host:**
```bash
cp traefik.yml /etc/traefik/traefik.yml
```

**Opção B — Volume Docker (mais comum):**
No `docker-compose.yml` do Traefik (arquivo separado no VPS), confirmar:
```yaml
volumes:
  - ./traefik.yml:/etc/traefik/traefik.yml
  - /letsencrypt:/letsencrypt
```

### Passo 4 — Reiniciar Traefik
```bash
docker compose restart traefik
```

### Passo 5 — Recriar container medic-bot
```bash
docker compose up -d --force-recreate medic-bot
```

### Passo 6 — Validação pós-deploy
```bash
# Verificar redirect HTTP→HTTPS
curl -I http://medic.automatizeconsulting.com.br
# Esperado: 301 ou 308 com Location: https://...

# Verificar security headers
curl -I https://medic.automatizeconsulting.com.br
# Esperado: Strict-Transport-Security, X-Frame-Options: DENY, X-Content-Type-Options: nosniff

# Verificar certificado TLS
curl -v https://medic.automatizeconsulting.com.br 2>&1 | grep -E "SSL|subject|issuer"
```

---

## 5. Próximas Recomendações (fora do escopo deste PR)

- **CSP (Content-Security-Policy):** Implementar após mapeamento completo dos recursos externos (Supabase, Telegram, etc.)
- **Rate limiting:** Adicionar middleware de rate limit no endpoint `/api/webhooks/telegram`
- **Firewall VPS:** Confirmar que porta 3000 não está acessível externamente (apenas via Traefik)
- **Monitoramento:** Configurar alertas de renovação de certificado Let's Encrypt

---

*Gerado automaticamente pelo Stark 🤖 — medic-bot-security-01*
