# consolidated.md — Memória Global Consolidada

> Atualizado pelo Morpheus a cada 15 dias.
> Extrai o que ficou pra trás nas notas diárias e sessões compactadas.

## Última Consolidação
- Data: 2026-04-12
- Responsável: Morpheus

## Projetos Ativos
| Projeto | Status | Responsável | Próximo passo |
|---------|--------|-------------|---------------|
| Medic Bot | Prontuário consolidado + impressão clínica em produção | Stark | CI/CD + bugs P3 + estratégia de cliente |
| Equipe de Agentes | 5 agentes ativos (Morpheus, Arquiteto, Stark, Ghost, Wanda) | Arquiteto + Morpheus | Criar Agente de Inteligência e Métricas |

## Time Ativo
| Emoji | Nome | Papel | Status |
|-------|------|-------|--------|
| 🧭 | Morpheus | CEO / Parceiro Estratégico | ✅ Ativo |
| 🏗️ | Arquiteto | Criador de Agentes | ✅ Ativo |
| 🤖 | Stark | Desenvolvimento (todos os projetos) | ✅ Ativo |
| 👻 | Ghost | Cybersegurança / Auditoria Defensiva | ✅ Ativo |
| 🔮 | Wanda | UX/UI e Experiência do Usuário | ✅ Ativo |

## Ghost — Papel na Estrutura
- Auditoria defensiva de código, infra e integrações
- Revisão de auth, autorização, segredos, webhooks, RLS e dependências
- Atua como revisor de risco para Stark e suporte estrutural para Arquiteto
- Checklist operacional inicial: conexões/transport, Supabase, auth/sessions, webhooks, env vars, infra/deploy, dependências
- Política de modelos: `gpt-5.4-mini` padrão; `claude-sonnet-4-6` para análise complexa; Opus só com aviso ao Well

## Wanda — Papel na Estrutura
- Especialista em UX/UI e experiência do usuário de todos os projetos da operação
- Análise de jornada, auditoria UX, design de interfaces, heurísticas de usabilidade, specs para dev
- Atua como os olhos do usuário: avalia do ponto de vista de quem nunca viu o sistema antes
- Fronteira clara com Stark: Wanda desenha, Stark implementa
- Política de modelos: `gpt-5.4-mini` padrão; `claude-sonnet-4-6` para análise visual/screenshots; Opus só com aviso ao Well

## Decisões Importantes da Operação
| Data | Decisão |
|------|---------|
| 2026-04-11 | Estrutura de agentes definida: 4 níveis (Observador → Autônomo) |
| 2026-04-11 | Memória em 4 camadas adotada como padrão da equipe |
| 2026-04-11 | Provider MiniMax M2.7 configurado (endpoint: api.minimaxi.chat) — REMOVIDO em 2026-04-14 por instabilidade |
| 2026-04-11 | Todos os agentes instanciados apenas com aprovação do Well |
| 2026-04-12 | Stark criado como agente de dev de TODA a operação (não só Medic Bot) |
| 2026-04-12 | Ghost criado como especialista sênior de cybersegurança |
| 2026-04-12 | GitHub autenticado na VM (gh auth, PAT wmribeiro00, escopos repo + read:org) |
| 2026-04-12 | Infra dos projetos: Hostinger + Docker + deploy manual via SSH |
| 2026-04-12 | PR #2 mergeado — prontuário consolidado + impressão clínica em produção |
| 2026-04-12 | Política de custo definida: padrão `gpt-5.4-mini`; Opus exige aviso ao Well |
| 2026-04-12 | Markers de conflito de merge devem ser verificados antes de qualquer push |
| 2026-04-13 | PR #3 mergeado — security headers + HSTS ativos em produção no Medic Bot |
| 2026-04-13 | Traefik no VPS usa flags de linha de comando (não traefik.yml) — redirect HTTPS já estava ativo |
| 2026-04-13 | PAT GitHub expirou — renovado com escopos repo + read:org |
| 2026-04-13 | git remote no VPS precisou ser atualizado com o novo PAT para git pull funcionar |
| 2026-04-13 | Wanda criada como especialista em UX/UI da operação — analisa, propõe e valida com aprovação humana |

## Lições Aprendidas
| Data | Lição |
|------|-------|
| 2026-04-11 | MiniMax: endpoint correto é api.minimaxi.chat (não api.minimax.chat) |
| 2026-04-11 | Construir equipe antes de sistema de memória transversal — mais eficiente |
| 2026-04-12 | Deploy Hostinger é manual — usar `docker compose` (plugin moderno, sem hífen) |
| 2026-04-12 | git pull em servidor com alterações locais exige `git stash` antes |
| 2026-04-12 | Stark diagnostica bugs com precisão mesmo sem acesso ao código (via browser DevTools) |
| 2026-04-12 | Sub-agentes funcionam muito bem com briefing claro e documentação prévia |

## Infra e Acessos
| Item | Valor |
|------|-------|
| GitHub | `wmribeiro00` autenticado via `gh auth` na VM |
| Repositório Medic Bot | `https://github.com/wmribeiro00/medic-bot` (privado) |
| Hosting | Hostinger — Docker + Traefik + docker-compose |
| Deploy | Manual via SSH: git stash → git pull → docker compose up --build -d |
| Medic Bot URL | `https://medic.automatizeconsulting.com.br` |

## Pendências Globais
- Criar agentes: Inteligência (Semana 1), Métricas (Semana 2)
- Configurar CI/CD (GitHub Action → deploy automático na Hostinger)
- Criar conta de teste/demo para o Stark usar no Medic Bot
- Corrigir BUG-05 (cosmético): "Comece免费" na tela de cadastro
- Corrigir bugs P3 restantes do Medic Bot
- Definir roadmap e estratégia de aquisição do primeiro cliente
- Configurar cron de revisão semanal da equipe (Arquiteto)
- Definir canal dedicado para cada agente no Genspark IM
- Executar o primeiro ciclo de segurança do Ghost: checklist + ataque superficial controlado + reporte de risco
- Reiniciar a construção do Dashboard de Consumo com briefing mais apertado, depois do Stark travar na primeira tentativa
