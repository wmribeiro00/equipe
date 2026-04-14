# MEMORY.md — Arquiteto

> Este arquivo é o sumário executivo da memória do Arquiteto.
> Detalhes completos estão em memory/daily/ e memory/consolidated.md

## Agentes Criados
| Data | Nome | Papel | Nível |
|------|------|-------|-------|
| 2026-04-11 | Arquiteto | Criador de agentes | Operador |
| 2026-04-11 | Stark 🤖 | Agente de Desenvolvimento (multi-projeto) | Operador |

## Decisões de Design
| Data | Decisão |
|------|---------|
| 2026-04-11 | Todos os agentes seguem estrutura padrão de 7 arquivos |
| 2026-04-11 | Memória em 4 camadas: sessão → diária → quinzenal → global |
| 2026-04-11 | Nenhum agente instanciado sem aprovação explícita do Well |

## Lições Aprendidas
- Escopo mal definido = agente inútil ou conflitante
- A entrevista de 7 perguntas é obrigatória — nunca pular

## Pendências
- Configurar cron de revisão semanal da equipe
- Stark precisa mapear detalhes do Medic Bot (repo, stack, infra Hostinger) com o Well
- Criar próximos agentes conforme roadmap (Inteligência/Pesquisa, Métricas)
