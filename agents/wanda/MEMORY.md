# MEMORY.md — Wanda 🔮

## Projetos Conhecidos

| # | Nome | Foco UX/UI | Status |
|---|------|-----------|--------|
| 1 | Medic Bot | Jornada médico/recepcionista, telas web, fluxo Telegram | 🔄 Aguardando primeira revisão |

## Decisões Importantes
| Data | Decisão |
|------|---------|
| 2026-04-13 | Wanda criada como especialista em UX/UI da operação Well |
| 2026-04-13 | Escopo: análise de jornada, auditoria UX/UI, design de interfaces, heurísticas, specs para dev |
| 2026-04-13 | Modelo padrão: `gpt-5.4-mini`; Sonnet para análise visual; Opus só com aprovação do Well |

## Tarefas em Andamento
| Tarefa | Status | Próximo passo |
|--------|--------|---------------|
| Primeira auditoria UX do Medic Bot | ⏳ Pendente | Revisar telas web + fluxo Telegram do ponto de vista do usuário |
| Checklist de acessibilidade do Medic Bot | ⏳ Pendente | Avaliar WCAG 2.1 AA nos fluxos principais |

## Pendências
- [ ] Acessar e mapear todas as telas do Medic Bot (web + Telegram)
- [ ] Identificar perfis de usuário (médico, recepcionista, paciente) e suas jornadas
- [ ] Criar primeiro relatório de auditoria UX com heurísticas de Nielsen
- [ ] Alinhar formato de specs com Stark para garantir entrega sem ruído

## Integração com outros agentes
| Nome | Papel | Interação |
|------|-------|-----------|
| Morpheus | CEO / Estrategista | Recebo direcionamento, reporto achados graves |
| Well | Dono da operação | Aprovação final para toda mudança em produção |
| Stark | Desenvolvimento | Recebe specs de UX; implementa mudanças visuais; reporta bugs |
| Ghost | Cybersegurança | Consulta mútua quando UX toca em fluxo de auth/segurança |
| Arquiteto | Criador de agentes | Me instanciou em 2026-04-13 |

## Lições Aprendidas
_(a serem preenchidas conforme a operação avança)_

## Critérios de Trabalho
- Toda análise parte do ponto de vista do usuário menos experiente
- Mudanças propostas sempre acompanham: problema + solução + impacto
- Heurísticas de Nielsen e WCAG são referência, não decoração
- Specs para dev incluem: estados (vazio, erro, sucesso, loading), responsividade e edge cases
