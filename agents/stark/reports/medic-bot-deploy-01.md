# Relatório de Deploy — Medic Bot
**Stark 🤖 | 2026-04-12 | Deploy #01**

---

## ✅ ETAPA 1 — Merge do PR

| Campo | Valor |
|-------|-------|
| **PR** | #1 — `fix: BUG-01 agenda + BUG-04 altura` |
| **Repositório** | `wmribeiro00/medic-bot` |
| **Status** | ✅ MERGED (squash) |
| **Commit** | `90485eb79e7e8e8a0ac60c1f47447fe9993ad9b7` |
| **Branch** | `fix/bug-01-bug-04` → deletada após merge |
| **Merge em** | `2026-04-12T02:39:09Z` |
| **Mergeado por** | Stark 🤖 (co-authored) |

**Mensagem do commit squash:**
```
fix: corrige agenda em meses com <31 dias (BUG-01) e parser de altura por voz (BUG-04) (#1)

Co-authored-by: Stark 🤖 <stark@openclaw.ai>
```

---

## ⚠️ ETAPA 2 — Status do Deploy

### CI/CD: **NÃO CONFIGURADO**

```
gh run list --repo wmribeiro00/medic-bot → (vazio)
gh api repos/wmribeiro00/medic-bot/actions/workflows → total_count: 0
```

**O repositório não possui GitHub Actions.** Não há pipeline automático de deploy.

### Arquitetura de deploy identificada:

- **Stack:** Next.js + Docker + Traefik
- **Hospedagem:** Servidor Hostinger (VPS/gerenciado)
- **Método:** `docker-compose up --build` manual via SSH
- **Domínio:** `medic.automatizeconsulting.com.br`
- **Build atual em produção:** `wp2UQl8wc18NTAlqkWxzH` (build anterior ao merge)

### 🔴 DEPLOY PENDENTE — Ação manual necessária

O merge foi feito, mas **o código novo ainda não foi buildado e deployado** na Hostinger.

---

## 🌐 ETAPA 3 — Verificação em Produção

### Site acessível: ✅

A URL `https://medic.automatizeconsulting.com.br` responde normalmente — aplicação rodando com build anterior.

- **Página inicial:** Medic Bot — Prontuário Inteligente ✅
- **Login/Registro:** Disponíveis ✅
- **HTTPS:** Ativo via Let's Encrypt + Traefik ✅

### Verificação de bugs em produção (código fonte no GitHub — branch main):

#### BUG-01 — Agenda com meses < 31 dias ✅ CORRIGIDO no código
Arquivo: `app/dashboard/agenda/page.tsx`

A função `getCalendarDays()` usa:
```typescript
const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
```
Isso calcula corretamente os dias de qualquer mês (abril=30, fevereiro=28/29, etc.).
A grade gera 42 células (6 semanas) e preenche com dias do mês anterior/próximo conforme necessário.

**Status:** Código correto no `main` — aguarda build/deploy para produção.

#### BUG-04 — Altura em cm (parser por voz) ✅ CORRIGIDO no código
Arquivo: `lib/parseHeight.ts`

A função `parseHeight()` suporta todos os formatos:
- `"170"` → `1.70` (heurística: valor > 3 = cm)
- `"170cm"` / `"170 cm"` → `1.70`
- `"1,70"` / `"1.70"` → `1.70`
- `"um metro e setenta"` → `1.70`
- `"1m70"` → `1.70`

A função `formatHeightCm()` exibe: `1.65 → "165 cm"`

**Status:** Código correto no `main` — aguarda build/deploy para produção.

---

## 📋 ETAPA 4 — Instrução de Deploy Manual (Hostinger)

### O que Well precisa fazer:

> **Tempo estimado:** 5-10 minutos

1. **Acessar o servidor via SSH:**
   ```bash
   ssh <usuario>@<ip-hostinger>
   ```

2. **Navegar até o diretório do projeto:**
   ```bash
   cd /caminho/para/medic-bot
   # (provavelmente ~/medic-bot ou /var/www/medic-bot)
   ```

3. **Atualizar o código com o novo commit:**
   ```bash
   git pull origin main
   ```

4. **Rebuildar e reiniciar o container:**
   ```bash
   docker-compose up --build -d
   ```

5. **Verificar os logs após subir:**
   ```bash
   docker-compose logs -f medic-bot
   ```
   Aguardar a mensagem: `✓ Ready in Xs` ou `Started server on 0.0.0.0:3000`

6. **Confirmar o novo build:**
   ```bash
   curl -s https://medic.automatizeconsulting.com.br/ | grep -o '"buildId":"[^"]*"'
   ```
   O buildId deve ser diferente de `wp2UQl8wc18NTAlqkWxzH` após o build com o novo código.

---

## 📊 Resumo Executivo

| Item | Status |
|------|--------|
| PR #1 mergeado | ✅ Concluído |
| Branch deletada | ✅ Concluído |
| CI/CD automático | ❌ Não existe |
| Deploy em produção | ⏳ Pendente (manual) |
| Site respondendo | ✅ Online |
| BUG-01 corrigido (código) | ✅ No `main` |
| BUG-04 corrigido (código) | ✅ No `main` |
| Verificação pós-deploy | ⏳ Aguarda deploy |

---

## 🔮 Recomendação Futura

Para evitar deploys manuais, sugerir a Well a criação de um **GitHub Actions workflow** (`.github/workflows/deploy.yml`) que execute automaticamente o `git pull && docker-compose up --build -d` no servidor Hostinger via SSH após cada push na `main`.

---

*Gerado por Stark 🤖 — Agente de Desenvolvimento | wmribeiro00/medic-bot*
