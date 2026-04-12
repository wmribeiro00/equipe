# MEMORY.md — Stark 🤖

> Sumário executivo. Detalhes em memory/daily/ e memory/consolidated.md

## Projetos Conhecidos

| # | Nome | Stack | Repositório | Infra | Status |
|---|------|-------|-------------|-------|--------|
| 1 | Medic Bot | Next.js + React + Tailwind + PostgreSQL | A confirmar (pedir ao Well) | Hostinger | 🔴 Bugs críticos identificados |

> **Medic Bot:** MVP de transcrição de voz para prontuários médicos via Telegram.  
> URL produção: https://medic.automatizeconsulting.com.br  
> Stack: Next.js (App Router) + Tailwind CSS + API Routes + PostgreSQL  
> Build ID: wp2UQl8wc18NTAlqkWxzH  
> 8 bugs identificados — 2 críticos (P1), 3 médios (P2), 3 menores (P3)  
> Diagnóstico completo em: agents/stark/reports/medic-bot-diagnostico-01.md

## Decisões Importantes
| Data | Decisão |
|------|---------|
| 2026-04-11 | Stark instanciado pelo Arquiteto com aprovação do Well |
| 2026-04-11 | Escopo definido: todos os projetos da operação (multi-projeto) |
| 2026-04-11 | Stack: multi-stack — avaliar projeto a projeto |
| 2026-04-11 | Infra: Hostinger — Well tem acesso completo (painel + SSH) |
| 2026-04-11 | Regra de ouro: nenhum deploy em produção sem aprovação do Well |
| 2026-04-11 | Medic Bot mapeado: 8 bugs encontrados, BUG-01 (dia 31 fixo no PostgreSQL) é o mais crítico |
| 2026-04-12 | Política de custo operacional definida: usar `gpt-5.4-mini` por padrão; subir para `claude-sonnet-4-6` só quando necessário; Opus exige aviso prévio ao Well |
| 2026-04-12 | Modelos ultra baratos (`gpt-5.4-nano`, `gemini-3.1-flash-lite-preview`, `minimax-m2p5`) são prioridade para triagem, extração e tarefas mecânicas |
| 2026-04-12 | `gemini-3-flash-preview` entra como opção de síntese com bom custo-benefício para leitura grande e relatórios leves
| 2026-04-12 | Primeira tentativa do Dashboard de Consumo foi interrompida; recomeçar com escopo mais fechado |

## Lições Aprendidas
- Iniciar sem mapear o projeto existente (Medic Bot) seria erro — fazer isso primeiro
- Well não é dev: comunicação técnica deve ser clara e estruturada, nunca hermética
- Em tarefas longas/novas, um briefing muito aberto tende a desviar a execução; melhor um escopo mais fechado, repo explícito e entregáveis claros

## Tarefas em Andamento
| Tarefa | Status | Próximo passo |
|--------|--------|---------------|
| Mapear Medic Bot (repo, stack, infra) | ✅ Concluído | Relatório em reports/medic-bot-diagnostico-01.md |
| Corrigir BUG-01 (API appointments dia 31) | ⏳ Aguardando | Receber acesso ao repositório GitHub |
| Inventário de projetos da operação | ⏳ Pendente | Confirmar com Well se há outros projetos além do Medic Bot |

## Pendências
- [ ] Receber acesso ao repositório GitHub do Medic Bot
- [ ] Confirmar se Medic Bot usa Next.js com deploy na Hostinger via SSH ou Vercel/outro
- [ ] Confirmar lista completa de projetos ativos na operação
- [ ] Esclarecer unidade da altura (metros vs cm) no bot Telegram — BUG-04
- [ ] Obter usuário demo separado para testes futuros

## Pessoas / Agentes com quem interajo
| Nome | Papel | Contexto |
|------|-------|---------|
| Morpheus | CEO / Estrategista | Superior direto — recebo direcionamento e reporto status |
| Well | Dono da operação | Aprovação final para toda ação em produção |
| Arquiteto | Criador de agentes | Me instanciou em 2026-04-11 |
