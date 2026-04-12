# Ghost — Checklist Operacional de Segurança

## Objetivo
Auditar a operação com foco em:
- conexões e transporte
- Supabase e banco
- autenticação e autorização
- webhooks e integrações externas
- exposição pública e hardening
- segredos e variáveis de ambiente
- dependências e supply chain

---

## 1. Conexões e Transporte

### Revisar
- [ ] Todo acesso público usa HTTPS
- [ ] Não há endpoints administrativos expostos sem proteção
- [ ] Traefik / reverse proxy não está liberando rotas indevidas
- [ ] Headers de segurança mínimos estão presentes
- [ ] Webhooks validam origem e não aceitam chamadas genéricas
- [ ] Não há tokens ou IDs sensíveis trafegando em query string

### Riscos comuns
- HTTP aberto por descuido
- webhook sem assinatura/secret
- callback aceitando qualquer origem
- portas adicionais expostas sem necessidade

---

## 2. Supabase / PostgreSQL

### Revisar
- [ ] RLS habilitado nas tabelas sensíveis
- [ ] Policies limitam leitura/escrita ao dono correto
- [ ] `service_role` não vaza para frontend
- [ ] `anon key` não é usada para escrita privilegiada
- [ ] Queries filtram por `doctor_id` / tenant correto
- [ ] Não há tabela pública demais por engano
- [ ] Funções RPC e edge paths não ampliam privilégios sem necessidade

### Riscos comuns
- política permissiva demais
- leitura cruzada entre usuários
- `service_role` exposta em bundle do frontend
- ausência de RLS em tabela crítica

---

## 3. Autenticação e Sessões

### Revisar
- [ ] Login tem proteção básica contra abuso
- [ ] Cookies de sessão são httpOnly e seguros quando aplicável
- [ ] Reset/troca de senha exige verificação adequada
- [ ] Autorização checa dono do recurso, não só estar logado
- [ ] Não há IDOR em rotas por `id`
- [ ] Usuário não consegue alterar dados de outro tenant

### Riscos comuns
- confiar só no cookie sem validar ownership
- `doctor_id` vindo do cliente sem conferência
- rotas que retornam dados de outro usuário por ID previsível

---

## 4. Telegram / Webhooks / Integrações

### Revisar
- [ ] Webhook usa segredo próprio
- [ ] Payloads externos são tratados como não confiáveis
- [ ] Não há execução indireta de comandos via texto/voz
- [ ] Mensagens não assumem contexto sem validar médico/paciente ativo
- [ ] `chat_id` vincula corretamente o médico certo
- [ ] Allowlist / pairing estão consistentes com o uso real

### Riscos comuns
- comando interpretado como texto livre
- payload malicioso em transcrição ou legenda
- chat vinculado ao usuário errado

---

## 5. Segredos e Variáveis de Ambiente

### Revisar
- [ ] `.env` nunca vai para frontend
- [ ] Tokens não aparecem em logs, prints ou erros
- [ ] Chaves rotacionáveis estão documentadas
- [ ] Variáveis por ambiente estão separadas (`dev/staging/prod`)
- [ ] CI/CD não expõe segredos em output

### Riscos comuns
- token copiado para arquivo versionado
- segredo em console.log
- env de produção usada no ambiente errado

---

## 6. Infra / Deploy / Exposição

### Revisar
- [ ] Hostinger expõe só o necessário
- [ ] Docker / Traefik estão com regras mínimas
- [ ] Build de produção não carrega artefatos de debug
- [ ] Sem painel admin aberto ao público
- [ ] Rollback possível em caso de falha
- [ ] Dependências críticas são atualizadas com controle

### Riscos comuns
- porta aberta sem proxy
- container com mais privilégio que o necessário
- build com variáveis erradas
- rota de debug esquecida em produção

---

## 7. Supply Chain / Dependências

### Revisar
- [ ] Dependências sensíveis revisadas periodicamente
- [ ] Pacotes pouco mantidos avaliados
- [ ] Lockfile versionado
- [ ] Nenhum pacote novo entra sem motivo
- [ ] Atualizações críticas são tratadas com prioridade

---

## 8. Saída padrão do Ghost

### Formato do relatório
- **Severidade:** Baixa / Média / Alta / Crítica
- **Evidência:** arquivo, linha, comportamento ou config
- **Impacto:** o que pode vazar/quebrar/expor
- **Correção mínima viável:** o menor ajuste que reduz o risco
- **Aprovação necessária:** quando tocar produção ou segredo

## 9. Política de Modelos
- **Padrão:** `gpt-5.4-mini`
- **Subida de tier:** só quando a auditoria exigir mais profundidade
- **Modelo intermediário:** `claude-sonnet-4-6` para análises complexas de risco e correlação técnica
- **Opus:** somente com aviso prévio ao Well
- **Economia:** sempre escolher o modelo mais barato que mantenha a qualidade necessária

---

## 9. Primeira auditoria recomendada para o Medic Bot

1. Auth e sessão
2. RLS e policies do Supabase
3. Webhook do Telegram
4. Segredos / env vars
5. Rotas por `id` e autorização de ownership
6. Exposição pública do deploy Hostinger
7. Dependências e sinais de risco no código
