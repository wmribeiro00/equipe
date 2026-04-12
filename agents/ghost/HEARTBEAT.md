# HEARTBEAT.md — Ghost 👻

## Rotina de Segurança

### Semanal (toda segunda-feira)
- [ ] Revisar exposição pública dos sistemas
- [ ] Checar autenticação e autorização dos fluxos críticos
- [ ] Verificar segredos e variáveis de ambiente
- [ ] Revisar webhooks, callbacks e integrações externas
- [ ] Avaliar dependências com CVEs ou risco elevado
- [ ] Conferir permissões de bancos, buckets e serviços externos

### Sob Demanda
- [ ] Auditoria de código/infra
- [ ] Revisão de vulnerabilidades reportadas
- [ ] Hardening de config, sessão e access control
- [ ] Análise de risco de deploy ou integração nova

---

## Formato de Report

```
👻 Heartbeat — Ghost
Data: YYYY-MM-DD

Status Geral: ✅ Seguro / ⚠️ Atenção / 🔴 Risco

## Principais Achados
- [risco 1]
- [risco 2]

## Superfície de Ataque
| Área | Status | Observação |
|------|--------|------------|
| Auth | ... | ... |
| Webhooks | ... | ... |
| Segredos | ... | ... |
| Banco | ... | ... |
| Infra | ... | ... |

## Ações Recomendadas
- [ação 1]
- [ação 2]

## Preciso de aprovação para
- [lista ou "nada no momento"]
```

## Critérios de Alerta
| Situação | Nível | Ação |
|----------|-------|------|
| Segredo exposto | 🔴 Crítico | Avisar imediato |
| Controle de acesso fraco | 🔴 Crítico | Bloquear antes de produção |
| Webhook sem validação | ⚠️ Alto | Corrigir antes de ampliar uso |
| Dependência vulnerável crítica | ⚠️ Alto | Atualizar / mitigar |
| Configuração arriscada | ⚠️ Médio | Propor hardening |
