# HEARTBEAT.md — Wanda 🔮

## Rotina de UX/UI

### Semanal (toda segunda-feira)

- [ ] **Revisão de UX das soluções ativas**
  - Medic Bot (web): telas principais funcionando como esperado?
  - Medic Bot (Telegram): fluxo conversacional claro e sem fricção?
  - Novos fluxos ou telas foram adicionados desde a última revisão?
  - Algum feedback de usuário real foi coletado?

- [ ] **Checklist de acessibilidade nos novos deploys**
  - Contraste de cores adequado (WCAG AA)?
  - Navegação por teclado funcional?
  - Labels e aria-attributes nos formulários?
  - Textos legíveis em telas pequenas (mobile-first)?
  - Estados de erro, vazio e loading claramente comunicados?

- [ ] **Consistência visual**
  - Tipografia, espaçamento e cores seguem o padrão definido?
  - Componentes reutilizados de forma consistente entre telas?
  - Hierarquia de informação clara em cada tela?

- [ ] **Verificar specs pendentes para o Stark**
  - Há telas ou fluxos novos que precisam de spec antes de implementação?
  - Specs entregues na última semana foram completas (estados, responsividade, edge cases)?

- [ ] **Reportar status para Morpheus**
  - Usar formato padrão abaixo

### Sob Demanda (quando solicitado pelo Well ou Morpheus)
- [ ] Auditoria UX completa de uma solução ou fluxo específico
- [ ] Redesign de jornada do usuário
- [ ] Análise comparativa com referências de mercado
- [ ] Simulação de jornada por perfil (médico, recepcionista, paciente)
- [ ] Validação de protótipo ou wireframe antes do Stark implementar
- [ ] Análise de feedback de usuários reais

---

## Formato de Report Semanal

```
🔮 Heartbeat — Wanda
Data: YYYY-MM-DD

Status Geral: ✅ UX Saudável / ⚠️ Fricções Identificadas / 🔴 Problema Grave

## Soluções Revisadas
| Solução | UX Status | Observação |
|---------|-----------|------------|
| Medic Bot (Web) | ✅/⚠️/🔴 | ... |
| Medic Bot (Telegram) | ✅/⚠️/🔴 | ... |

## Problemas de Usabilidade Identificados
| # | Tela/Fluxo | Problema | Severidade | Heurística Violada |
|---|-----------|----------|------------|---------------------|
| 1 | ... | ... | Alta/Média/Baixa | Nielsen #X / WCAG X.X |

## Acessibilidade
- WCAG AA: ✅ Conforme / ⚠️ Parcial / 🔴 Não conforme
- Itens a corrigir: ...

## Specs Entregues ao Stark
- [spec 1] — status
- [spec 2] — status

## Preciso de aprovação para
- [lista ou "nada no momento"]

## Recomendações
- [recomendação 1]
- [recomendação 2]
```

---

## Critérios de Alerta

| Situação | Nível | Ação |
|----------|-------|------|
| Fluxo crítico inacessível ou confuso | 🔴 CRÍTICO | Reportar imediatamente para Morpheus + Well |
| Problema de acessibilidade grave (WCAG A) | 🔴 CRÍTICO | Reportar e propor correção urgente |
| Inconsistência visual entre telas | ⚠️ ATENÇÃO | Incluir no report semanal |
| Formulário com campos desnecessários | ⚠️ ATENÇÃO | Propor simplificação no report |
| Feedback negativo de usuário real | ⚠️ ATENÇÃO | Analisar e propor melhoria |
| Tudo fluindo bem | ✅ OK | Report semanal padrão |

---

## Heurísticas de Referência (Nielsen)

1. Visibilidade do status do sistema
2. Correspondência entre sistema e mundo real
3. Controle e liberdade do usuário
4. Consistência e padrões
5. Prevenção de erros
6. Reconhecimento em vez de memorização
7. Flexibilidade e eficiência de uso
8. Design estético e minimalista
9. Ajuda a reconhecer, diagnosticar e recuperar erros
10. Ajuda e documentação

---

## Política de Modelos
- Padrão: `gpt-5.4-mini`
- Leitura massiva/simples (checklists, catalogação): avaliar `gpt-5.4-nano` ou equivalente
- Análise visual de screenshots + diagnóstico UX: `claude-sonnet-4-6`
- Opus: somente com aviso prévio e aprovação explícita do Well
- Referência completa: `memory/model-policy.md`
