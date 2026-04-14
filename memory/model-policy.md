# Política de Uso de Modelos — Operação Well
> Versão 1.3 · Criado em 2026-04-12 · Atualizado em 2026-04-14 · Mantido por Morpheus 🧭
> Aplicável a todos os agentes da operação. Cole na seção `## Política de Modelos` do SOUL.md de cada agente ao instanciar em novo servidor.

---

## 1. Princípio Central

**Usar sempre o modelo mais barato que resolva a tarefa com qualidade suficiente.**

Custo não é detalhe — é critério de decisão. Subir de tier sem motivo é desperdício. Deixar de subir quando necessário é retrabalho.

---

## 2. Hierarquia de Modelos

| Tier | Modelos | Quando usar |
|------|---------|-------------|
| **Nano** (mais barato) | `gpt-5.4-nano` · `gemini-3.1-flash-lite-preview` · `minimax-m2p5` | Leitura massiva, extração simples, classificação, sumarização rápida, tarefas de pipeline sem raciocínio profundo |
| **Mini** (padrão) | `gpt-5.4-mini` | Padrão de toda a operação. Conversas, geração de código simples, análises rotineiras, cron jobs, memória diária |
| **Sonnet** (avançado) | `claude-sonnet-4-6` | Alta complexidade, bugs difíceis, raciocínio estruturado, documentação técnica detalhada, imagem+código combinados |
| **Opus** (máximo) | qualquer modelo Opus | Somente com **aviso prévio e aprovação do Well**. Casos excepcionais de raciocínio profundo sem substituto |

---

## 3. Política por Agente

| Agente | Modelo padrão | Quando subir para Sonnet | Opus permitido? |
|--------|---------------|-------------------------|-----------------|
| 🧭 **Morpheus** | `gpt-5.4-mini` | Análise estratégica complexa, decisão com múltiplas variáveis, orquestração de agentes | Só com aviso ao Well |
| 🏗️ **Arquiteto** | `gpt-5.4-mini` | Design de sistema multi-agente, documentação complexa | Só com aviso ao Well |
| 🤖 **Stark** | `gpt-5.4-mini` | Bugs difíceis, lógica complexa, código agentic | Só com aviso ao Well |
| 👻 **Ghost** | `gpt-5.4-mini` | Auditoria de risco com correlação técnica complexa, análise de vulnerabilidades | Só com aviso ao Well |
| 🔮 **Wanda** | `gpt-5.4-mini` | Redesign de jornada complexa, diagnóstico UX crítico | Só com aviso ao Well |
| _(futuros agentes)_ | `gpt-5.4-mini` | Definir no SOUL.md no momento da criação | Só com aviso ao Well |

---

## 4. Regras Operacionais

### 4.1 Regra do Nano
Antes de usar `gpt-5.4-mini` em tarefas de leitura, extração ou sumarização em massa:
- Avaliar se `gpt-5.4-nano`, `gemini-3.1-flash-lite-preview` ou `minimax-m2p5` resolve.
- Se a qualidade for aceitável, usar o mais barato.

### 4.2 Regra do Mini
`gpt-5.4-mini` é o padrão universal. Toda tarefa começa aqui, a menos que:
- A tarefa exija raciocínio encadeado longo
- Envolva análise de imagem junto com código
- O resultado anterior tenha sido insatisfatório com mini

### 4.3 Regra do Sonnet
Subir para `claude-sonnet-4-6` quando:
- Mini falhou ou produziu resultado insatisfatório
- A tarefa exige raciocínio codificado específico (bug hunting, segurança)
- Análise de imagem + código combinados
- Auditoria técnica com correlação profunda
- Documentação técnica complexa que demande precisão

### 4.4 Regra do Opus
**Opus nunca é usado por decisão autônoma do agente.**
- O agente deve pausar, informar o Well e aguardar aprovação explícita.
- Formato da notificação: `Preciso de Opus para [tarefa]. Motivo: [justificativa]. Estimativa de custo: [se conhecida]. Aguardo aprovação.`

### 4.5 Regra dos Cron Jobs
- Todos os cron jobs usam `gpt-5.4-mini` por padrão.
- Não subir tier em job automático sem revisão manual.
- Jobs de memória (diário, quinzenal) sempre em `gpt-5.4-mini`.

---

## 5. Comparativo Rápido de Custos

| Modelo | Input ($/1M) | Output ($/1M) | Context | Ranking |
|--------|-------------|--------------|---------|---------|
| `minimax-m2p5` | $0.05 | $0.20 | 32K | — |
| `gemini-3.1-flash-lite-preview` | $0.075 | $0.30 | 32K | — |
| `gemini-2.0-flash` | $0.10 | $0.40 | 1.05M | média |
| `gpt-5.4-mini` | $0.15 | $0.60 | 128K | média-alta |
| `claude-sonnet-4-6` | $3.00 | $15.00 | 1M | altíssimo |

---

## 6. Como aplicar em novo servidor

### Passo 1 — Cole no SOUL.md do agente
```markdown
## Política de Modelos
- Padrão: `gpt-5.4-mini`
- Leitura massiva/simples: avaliar `gpt-5.4-nano` ou equivalente
- Alta complexidade: `claude-sonnet-4-6`
- Opus: somente com aviso prévio e aprovação explícita do Well
- Referência completa: `memory/model-policy.md`
```

### Passo 2 — Adicione ao HEARTBEAT.md
```markdown
- Sempre que algum agente precisar usar modelo Opus, notificar o Well antes de executar a tarefa.
- Se a tarefa puder ser resolvida com `gpt-5.4-mini` ou um modelo mais barato compatível, preferir o de menor custo que mantenha a qualidade necessária.
- Para leitura massiva e tarefas simples, considerar `gpt-5.4-nano`, `gemini-3.1-flash-lite-preview` ou `minimax-m2p5`.
```

### Passo 3 — Configure os cron jobs
Ao criar qualquer cron job, usar explicitamente:
```json
model: gpt-5.4-mini
```

### Passo 4 — Treine o agente no onboarding
No primeiro turno de cada novo agente, inclua no briefing:
```
Sua política de modelos está em memory/model-policy.md.
Resumo: padrão é gpt-5.4-mini. Alta complexidade → Sonnet. Opus exige aprovação explícita do Well.
```

---

## 7. Critério de qualidade aceitável

Um modelo é &quot;suficiente&quot; para uma tarefa quando:
- O resultado é correto e utilizável sem revisão profunda
- Não houve omissão relevante de contexto
- O raciocínio encadeado é coerente até o fim

Se qualquer um desses critérios falhar, subir um tier e refazer.

---

## 8. Histórico de decisões

| Data | Decisão |
|------|---------|
| 2026-04-12 | Política definida e registrada. Padrão `gpt-5.4-mini` adotado para toda a operação |
| 2026-04-12 | Cron jobs de memória migrados para `gpt-5.4-mini` |
| 2026-04-12 | Regra do Opus documentada: aviso prévio ao Well obrigatório |
| 2026-04-12 | Nano tier adicionado para leitura massiva e tarefas simples |
| 2026-04-14 | M2.7 adicionado como tier Intermediário (revertido em 2026-04-14 — causando instabilidade) |
| 2026-04-14 | **M2.7 removido da política — hierarquia volta a ser: Nano → Mini → Sonnet → Opus** |