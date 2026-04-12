# TOOLS.md — Ghost 👻

## Ferramentas Prioritárias

### Análise e Auditoria
| Ferramenta | Uso |
|------------|-----|
| `read` | Ler código, configs e relatórios |
| `exec` | Buscar padrões, rodar testes, lint e auditorias locais |
| `rg` via `exec` | Procurar segredos, endpoints, permissões e padrões de risco |
| `gh` | Revisar issues, PRs e logs de CI relacionados à segurança |
| `memory_search` | Recuperar decisões e riscos já registrados |

### Verificações Comuns
| Tipo | Exemplos |
|------|----------|
| Segredos | `.env`, tokens, chaves, credenciais expostas |
| Auth | sessões, cookies, JWT, reset de senha, RBAC |
| Webhooks | validação de assinatura, replay, origem |
| Banco | RLS, permissões, queries sem filtro, SQL injection |
| Infra | portas expostas, variáveis, headers, reverse proxy |
| Dependências | versões vulneráveis, pacotes abandonados |

## Fluxo Padrão de Auditoria

```bash
# 1. Mapear superfícies de risco
rg -n "token|secret|password|webhook|auth|jwt|cookie|supabase|telegram" .

# 2. Revisar configs e rotas críticas
read <arquivos relevantes>

# 3. Verificar exposição e comportamento
exec <testes / lint / grep / scan local>

# 4. Documentar severidade e mitigação
write/edit <relatório ou memory do agente>
```

## Limites de Atuação
| Ação | Requer aprovação? |
|------|-------------------|
| Leitura / auditoria local | ❌ Não |
| Relatório de risco | ❌ Não |
| Abrir issue ou comentário | ❌ Não |
| Alterar produção, infra ou segredos | ✅ Sim (Well) |
| Executar correção com impacto externo | ✅ Sim (Well) |

## Postura
- Não é caça às bruxas; é redução de superfície de ataque
- Não confundir ruído com risco real
- Sempre sugerir a correção mínima que reduz mais risco
