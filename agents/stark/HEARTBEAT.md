# HEARTBEAT.md — Stark 🤖

## Rotina de Saúde Técnica

### Semanal (toda segunda-feira)

- [ ] **Verificar saúde dos projetos ativos**
  - Serviços no Hostinger respondendo corretamente?
  - Logs com erros críticos?
  - Consumo de recursos (CPU, memória, disco) dentro do normal?

- [ ] **Verificar bugs abertos no GitHub**
  - Issues com label `bug` abertas há mais de 7 dias
  - PRs sem revisão há mais de 3 dias
  - Branches desatualizadas em relação à main

- [ ] **Verificar status de deploys recentes**
  - Último deploy foi bem-sucedido?
  - Rollback necessário em algum projeto?
  - Ambientes de staging vs produção sincronizados?

- [ ] **Registrar falhas de execução longa**
  - Houve agentes que precisaram ser interrompidos?
  - O briefing estava amplo demais?
  - O próximo ciclo precisa de escopo mais fechado?

- [ ] **Reportar status para Morpheus**
  - Usar formato padrão abaixo

### Sob Demanda (quando solicitado pelo Well ou Morpheus)
- [ ] Investigar bug reportado
- [ ] Propor nova feature ou melhoria
- [ ] Criar novo projeto do zero
- [ ] Revisar e refatorar código existente
- [ ] Analisar segurança e vulnerabilidades
- [ ] Estimar esforço e prazo de desenvolvimento

---

## Formato de Report Semanal

```
🤖 Heartbeat — Stark
Data: YYYY-MM-DD

Status Geral: ✅ OK / ⚠️ ATENÇÃO / 🔴 BLOQUEADO

## Projetos
| Projeto | Saúde | Observação |
|---------|-------|------------|
| Medic Bot | ✅/⚠️/🔴 | ... |

## Bugs em Aberto (GitHub)
- [repo/issue] Descrição — aberto há X dias

## Deploys Recentes
- [projeto] Último deploy: YYYY-MM-DD — Status

## Preciso de aprovação para
- [lista de ações pendentes ou "nada no momento"]

## Alertas / Riscos identificados
- [lista ou "nenhum"]
```

---

## Critérios de Alerta

| Situação | Nível | Ação |
|----------|-------|------|
| Serviço fora do ar | 🔴 CRÍTICO | Reportar imediatamente para Morpheus + Well |
| Bug crítico em produção | 🔴 CRÍTICO | Propor hotfix + solicitar aprovação urgente |
| Bug médio em aberto +7 dias | ⚠️ ATENÇÃO | Incluir no report semanal |
| PR sem review +3 dias | ⚠️ ATENÇÃO | Mencionar no report semanal |
| Disco ou memória >80% | ⚠️ ATENÇÃO | Investigar e propor ação |
| Tudo funcionando | ✅ OK | Report semanal padrão |

## Política de Modelos Operacionais
- Tarefas mecânicas, previsíveis ou curtas: usar o modelo mais barato que resolva
- Tarefas de leitura grande e pouca lógica: priorizar `gemini-3.1-flash-lite-preview`
- Tarefas de extração/transformação de texto: priorizar `minimax-m2p5`
- Tarefas com síntese de múltiplas fontes: usar `gemini-3-flash-preview`
- Tarefas de dev/bug/análise com raciocínio: usar `gpt-5.4-mini` como padrão
- Casos complexos ou de alto risco: `claude-sonnet-4-6`
- `claude-opus-4-6` só com aviso prévio ao Well e justificativa explícita
- Se o modelo ideal não estiver disponível, usar o próximo mais barato compatível com a tarefa
