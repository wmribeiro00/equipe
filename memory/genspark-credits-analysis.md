# Análise de Créditos Genspark — 2026-04-14

**Contexto:** Well usa Genspark como plataforma do OpenClaw. Plano Plus com **10.000 créditos/mês**. Preocupação: otimizar consumo para não estourar o limite.

---

## Como os Créditos Funcionam

**Regra central:** Todo modelo que passa pelo proxy `genspark-llm-proxy` consume créditos — independentemente do tier (nano, mini, M2.7, Sonnet, Opus). Cada token processado conta.

Exemplos de operações que gastam créditos:
- Todas as minhas respostas (M2.7)
- Heartbeat (gpt-5.4-mini via isolated session)
- Cron jobs de memória (gpt-5.4-mini)
- Subagentes (Stark, Wanda, Ghost, Arquiteto)
- ACP agents (slides, docs, deep research, etc.)

---

## Planos Genspark

| Plano | Preço | Créditos | Armazenamento |
|-------|-------|----------|---------------|
| Free | $0 | 100/dia | 1 GB |
| **Plus** | **$24.99/mês** | **10.000/mês** | **50 GB** |
| Pro | $249.99/mês | 125.000/mês | 1 TB |

> O Well provavelmente está no **Plus** (~$24.99/mês ou $19.99 anual via annual billing)

---

## Consumo Estimado da Operação

| Atividade | Créditos/execução | Frequência | Créditos/mês |
|-----------|------------------|-----------|-------------|
| **Heartbeat (60min)** | ~12 | 720× | ~8.640 ⚠️ CRÍTICO |
| **Heartbeat (240min)** | ~12 | 180× | ~2.160 ✅OK |
| Cada mensagem (com Morpheus/M2.7) | ~20-60 | variável | variável |
| Cron memória diária | ~8 | 30× | ~240 |
| Cron memória quinzenal | ~20 | 2× | ~40 |
| Subagentes (Stark, Wanda...) | ~40-120 | sob demanda | variável |
| ACP agents (gsk-docs, slides...) | ~100-500 | sob demanda | variável |

### Comparativo de impacto do heartbeat

| Intervalo | Execuções/mês | Créditos (heartbeat) | % do limite mensal |
|-----------|--------------|---------------------|-------------------|
| 30 min | 1.440 | ~17.280 | **172%** do limite |
| 60 min | 720 | ~8.640 | **86%** do limite |
| **180 min** | **240** | **~2.880** | **29%** do limite |
| **240 min** | **180** | **~2.160** | **22%** do limite** |

---

## Decisões Tomadas

| Data | Decisão |
|------|---------|
| 2026-04-14 | Heartbeat alterado de 60min para **240min** (3 execuções dia vs 24) |
| 2026-04-14 | Heartbeat usa `gpt-5.4-mini` (conforme model-policy) via isolated session |
| 2026-04-14 | Ollama (gemma2:2b) disponível na VM como ferramenta local de texto — não consume créditos Genspark |
| 2026-04-14 | Heartbeat também chama Ollama via curl para gerar resumo em português |

---

## Recomendações para Economizar Créditos

1. **Manter heartbeat em 240min** — reduz de 86% para ~22% do consumo mensal só com isso
2. **Usar Ollama para tarefas locais** — gemma2:2b não consome créditos Genspark
3. **Limitar ACP agents** — só usar quando necessário (slides, docs, deep research)
4. **Consolidar memórias** — cron diário e quinzenal já otimizam (poucas execuções, muito conteúdo)
5. **Evitar uso desnecessário de subagentes** — cada spawn é uma session que consume créditos

---

## Monitoramento

Para saber seu saldo atual de créditos:
- Acessar dashboard Genspark: https://www.genspark.ai/dashboard
- Verificar histórico de consumo no painel da conta

Se o saldo estiver acabando antes do fim do mês:
1. Reduzir frequência do heartbeat (mínimo razoável: 240min)
2. Limpar sessões antigas do OpenClaw
3. Desabilitar ACP agents não essenciais