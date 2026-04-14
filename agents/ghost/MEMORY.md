# MEMORY.md — Ghost 👻

## Projetos Conhecidos

| # | Nome | Foco de Segurança | Status |
|---|------|-------------------|--------|
| 1 | Medic Bot | Webhook Telegram, auth, RLS, Supabase, deploy Hostinger | 🔄 Em avaliação |
| 2 | Equipe de Agentes | Governança, permissões, memória, integrações | 🔄 Em avaliação |

## Decisões Importantes
| Data | Decisão |
|------|---------|
| 2026-04-12 | Ghost criado como especialista sênior de cybersegurança da operação Well |
| 2026-04-12 | Ghost atua de forma defensiva e focada em hardening, auditoria e redução de risco |
| 2026-04-12 | Ghost responde a Morpheus e exige aprovação do Well para ações externas |

## Tarefas em Andamento
| Tarefa | Status | Próximo passo |
|--------|--------|---------------|
| Mapear superfície de ataque do Medic Bot | ✅ Em execução | Seguir checklist operacional criado em CHECKLIST.md |
| Definir padrão de auditoria de segurança | ✅ Definido | Checklist repetível criado para conexões, Supabase, auth, webhooks e infra |
| Revisar canal Telegram e integrações externas | ✅ Prioritário | Verificar allowlist, sessão, webhook e tratamento de comandos |
| Auditar conexões e Supabase | ✅ Primeira frente | Confirmar HTTPS, headers, RLS, policies e vazamento de segredos |

## Pendências
- [ ] Receber inventário completo dos projetos da operação
- [ ] Validar políticas de acesso por ambiente (dev/staging/prod)
- [ ] Mapear segredos e variáveis de ambiente expostas
- [ ] Revisar dependências críticas e processos de atualização
- [ ] Primeira auditoria do Medic Bot com checklist operacional

## Integração com outros agentes
- Stark constrói; Ghost audita
- Arquiteto desenha a fronteira entre funções quando houver sobreposição
- Morpheus recebe o resumo executivo do risco e encaminha ao Well quando necessário

## Critérios de Trabalho
- Priorizar prevenção: autenticação, autorização, validação, segredos, logs e exposição pública
- Reportar riscos com severidade: Baixa / Média / Alta / Crítica
- Sempre indicar a correção mínima viável

## Política de Modelos do Ghost
- **Modelo padrão:** `gpt-5.4-mini`
- **Subida de tier:** só quando a tarefa justificar claramente
- **Modelo intermediário:** `claude-sonnet-4-6` para análises de segurança mais complexas, correlação de risco e revisão técnica pesada
- **Modelos ultra baratos:** `gpt-5.4-nano`, `gemini-3.1-flash-lite-preview` e `minimax-m2p5` para triagem, leitura leve e extração simples quando a qualidade for suficiente
- **Modelo de síntese com melhor custo-benefício:** `gemini-3-flash-preview` para textos longos e relatórios leves
- **Opus:** sempre exige aviso prévio ao Well antes de executar
- **Regra de custo:** preferir o modelo mais barato que mantenha qualidade aceitável
- **Evitar modelo caro** em tarefas mecânicas, cron, resumo, onboarding e checklist
- **Fallback:** se o modelo ideal não estiver disponível, usar o próximo mais barato compatível com a tarefa
