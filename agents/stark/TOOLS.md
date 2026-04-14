# TOOLS.md — Stark 🤖

## Ferramentas Disponíveis

### 🔧 Desenvolvimento e Código

| Ferramenta | Uso |
|------------|-----|
| `read` | Ler arquivos de código, configs, logs |
| `write` | Criar novos arquivos |
| `edit` | Fazer edições precisas em arquivos existentes |
| `exec` | Executar comandos shell (linting, testes, build local) |

### 🐙 GitHub CLI (`gh`)

| Comando | Uso |
|---------|-----|
| `gh repo list` | Listar repositórios |
| `gh issue list` | Listar issues abertas |
| `gh issue create` | Criar nova issue |
| `gh pr list` | Listar Pull Requests |
| `gh pr create` | Criar Pull Request |
| `gh pr review` | Revisar PR |
| `gh run list` | Ver status de CI/CD |
| `gh run view` | Ver logs de uma run |
| `gh api` | Chamadas diretas à API do GitHub |

> **Pré-requisito:** `gh auth status` deve retornar autenticado. Se não, solicitar ao Well para autenticar via `gh auth login`.

### 🌐 Browser

| Uso | Quando |
|-----|--------|
| Navegar em dashboards do Hostinger | Verificar status de servidores |
| Verificar documentação técnica | Pesquisar soluções |
| Acessar logs e métricas online | Monitoramento visual |
| Testar URLs e endpoints | QA de deploys |

### 🔍 Pesquisa

| Ferramenta | Uso |
|------------|-----|
| `gsk search` | Pesquisa web técnica (docs, soluções, comparativos) |
| `gsk crawl` | Extrair conteúdo de página específica (docs, issues, etc.) |
| `gsk summarize` | Resumir documentação longa |

### 🖥️ SSH / Hostinger

| Ação | Como |
|------|------|
| Acesso SSH ao servidor | `exec` com ssh + credenciais do Well |
| Verificar logs do servidor | SSH → `tail -f /var/log/...` |
| Reiniciar serviços | SSH → `systemctl restart <serviço>` (com aprovação) |
| Verificar recursos | SSH → `htop`, `df -h`, `free -h` |
| Deploy manual | SSH → pull + restart (apenas com aprovação do Well) |

> **Acesso SSH:** Well detém as credenciais e tem acesso completo ao painel Hostinger e terminal SSH. Stark solicita ação via Well ou recebe credenciais temporárias para ação específica aprovada.

### 📊 Análise de Arquivos

| Ferramenta | Uso |
|------------|-----|
| `read` com offset/limit | Ler arquivos grandes em partes |
| `exec rg` (ripgrep) | Buscar padrões em código |
| `exec fd` | Encontrar arquivos rapidamente |
| `exec jq` | Processar JSON (configs, APIs) |

## Fluxo Padrão de Investigação de Bug

```bash
# 1. Ler o código relevante
read <arquivo>

# 2. Buscar padrão no projeto
exec: rg "pattern" ./src

# 3. Verificar issues abertas
exec: gh issue list --label bug --repo <owner/repo>

# 4. Verificar último deploy (CI)
exec: gh run list --repo <owner/repo> --limit 5

# 5. (Se necessário + aprovação) Verificar logs do servidor
exec: ssh user@hostinger-server "tail -100 /var/log/app.log"
```

## Limites de Autonomia nas Ferramentas

| Ação | Requer aprovação? |
|------|-------------------|
| `read` / `gsk search` / `gh issue list` | ❌ Não |
| `exec` (comandos locais, linting, testes) | ❌ Não |
| `gh pr create` / `gh issue create` | ❌ Não |
| `exec` SSH no servidor | ✅ Sim (Well) |
| Deploy via SSH | ✅ Sim (Well — obrigatório) |
| Deletar branch / arquivo / recurso | ✅ Sim (Morpheus ou Well) |
