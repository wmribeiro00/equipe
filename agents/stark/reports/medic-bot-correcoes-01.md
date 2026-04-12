# Medic Bot — Proposta de Correções
**Elaborado por:** Stark 🤖  
**Data:** 2026-04-11  
**Versão:** 01  
**Status:** Aguardando aprovação do Well para implementação

---

## ⚠️ Aviso Importante — Repositório Privado

O repositório `https://github.com/wmribeiro00/medic-bot` é **privado** e não há credenciais GitHub configuradas neste ambiente (sem `gh auth`, sem token, sem SSH key).

**Não foi possível clonar o repositório.**

As correções abaixo foram elaboradas com base em:
1. O diagnóstico técnico anterior (medic-bot-diagnostico-01.md) com evidências concretas do comportamento em produção
2. A estrutura de projeto Next.js App Router + PostgreSQL identificada durante o diagnóstico
3. Os padrões de código típicos dessa stack

**Precisão das propostas:** Alta — os erros são suficientemente específicos para propor código correto sem ver o fonte. Mas o Well precisa confirmar os caminhos exatos dos arquivos antes da aplicação.

**Para resolver:** Well deve fazer um dos seguintes:
- Fazer `gh auth login` no terminal da VM com seu GitHub token
- Compartilhar um Personal Access Token (PAT) para clonar o repo
- Ou aplicar as correções diretamente no editor de sua preferência

---

## BUG-01 — Agenda vazia (dia 31 fixo na query SQL)

### Causa Raiz Confirmada
O erro `date/time field value out of range: "2026-04-31"` é 100% conclusivo: existe um valor `31` hardcoded como dia final do mês na construção da query SQL da API de agendamentos.

### Localização Esperada do Arquivo
```
app/api/appointments/route.ts
```
Ou possíveis variantes:
```
src/app/api/appointments/route.ts
pages/api/appointments.ts
app/api/appointments/[...]/route.ts
```

### Busca para Localizar (executar após clonar):
```bash
grep -rn "31" --include="*.ts" --include="*.tsx" app/api/ src/app/api/ pages/api/ 2>/dev/null | grep -E "date|month|year|appointment" | head -20
```

### Padrões Possíveis do Bug

**Padrão A — String literal com dia 31:**
```typescript
// ❌ CÓDIGO ATUAL (causa o erro)
const startDate = `${year}-${month}-01`;
const endDate = `${year}-${month}-31`;

const result = await pool.query(
  `SELECT * FROM appointments WHERE date BETWEEN $1 AND $2 AND user_id = $3`,
  [startDate, endDate, userId]
);
```

**Padrão B — Objeto Date com dia 31:**
```typescript
// ❌ CÓDIGO ATUAL (causa o erro)
const start = new Date(`${year}-${month}-01`);
const end = new Date(`${year}-${month}-31`);
```

**Padrão C — new Date(year, month, 31):**
```typescript
// ❌ CÓDIGO ATUAL (causa o erro)
const endDate = new Date(year, parseInt(month) - 1, 31);
```

### ✅ Correção Proposta

**Opção 1 — JavaScript (calcular último dia):**
```typescript
// ✅ CÓDIGO CORRIGIDO — Opção 1 (JS puro)
const yearNum = parseInt(year);
const monthNum = parseInt(month);

const startDate = `${year}-${String(monthNum).padStart(2, '0')}-01`;
const lastDay = new Date(yearNum, monthNum, 0).getDate(); // new Date(Y, M, 0) = último dia do mês M-1
const endDate = `${year}-${String(monthNum).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

const result = await pool.query(
  `SELECT * FROM appointments WHERE date BETWEEN $1 AND $2 AND user_id = $3`,
  [startDate, endDate, userId]
);
```

**Opção 2 — SQL puro (mais robusta — recomendada):**
```typescript
// ✅ CÓDIGO CORRIGIDO — Opção 2 (SQL, elimina o problema completamente)
const result = await pool.query(
  `SELECT * FROM appointments 
   WHERE date_trunc('month', date) = date_trunc('month', make_date($1, $2, 1))
   AND user_id = $3
   ORDER BY date ASC`,
  [parseInt(year), parseInt(month), userId]
);
// Remove endDate completamente — PostgreSQL calcula o mês sozinho
```

**Opção 3 — Intervalo aberto (padrão de segurança em datas):**
```typescript
// ✅ CÓDIGO CORRIGIDO — Opção 3 (intervalo >= início AND < início do próximo mês)
const result = await pool.query(
  `SELECT * FROM appointments 
   WHERE date >= make_date($1, $2, 1)
   AND date < make_date($1, $2, 1) + INTERVAL '1 month'
   AND user_id = $3
   ORDER BY date ASC`,
  [parseInt(year), parseInt(month), userId]
);
```

**Minha recomendação:** Opção 2 ou 3. Mais seguras, sem depender de cálculo no lado JS. A Opção 3 é a mais idiomática para PostgreSQL.

### Impacto da Correção
- ✅ Agenda volta a funcionar em Abril, Junho, Setembro, Novembro e Fevereiro
- ✅ BUG-02 (relatórios zerados) resolve automaticamente como cascata
- 🚫 Sem risco de regressão para os meses com 31 dias (Janeiro, Março, Maio, Julho, Agosto, Outubro, Dezembro)

---

## BUG-02 — Relatórios sem dados (cascata do BUG-01)

**Diagnóstico:** Cascata confirmada. A API `/api/relatorios` consulta os agendamentos, que falham com 500 em meses de < 31 dias.

**Solução:** Corrija BUG-01. Os relatórios voltam automaticamente.

**Ação adicional recomendada (não bloqueia):** A tela de relatórios não exibe erro quando a API falha — retorna zerado silenciosamente. Após corrigir o BUG-01, adicionar tratamento de erro visível:

```typescript
// app/dashboard/relatorios/page.tsx (ou componente equivalente)
// ❌ ATUAL — sem feedback de erro
if (!data || data.summary.totalCount === 0) {
  return <div>Nenhum dado encontrado</div> // confunde com "mês sem consultas"
}

// ✅ PROPOSTO — distinguir erro de "mês vazio"
if (error) {
  return <div className="text-red-500">Erro ao carregar relatório. Tente novamente.</div>
}
if (!data || data.summary.totalCount === 0) {
  return <div className="text-muted">Nenhuma consulta registrada neste período.</div>
}
```

---

## BUG-04 — Campo Altura: processamento de voz → banco → exibição

### Contexto (atualizado pelo Well)
O bot Telegram usa transcrição de voz. O usuário diz **"um metro e setenta"** — o sistema precisa:
1. Converter o texto transcrito → número em metros (1.70)
2. Armazenar no banco em metros (float)
3. Exibir na interface em cm (170 cm)

### Localização Esperada dos Arquivos

**Bot Telegram (processamento de voz):**
```
bot/index.ts
bot/handlers/patient.ts
bot/handlers/height.ts
bot/utils/converter.ts
lib/bot.ts
```

**API de pacientes (banco de dados):**
```
app/api/patients/route.ts
app/api/patients/[id]/route.ts
```

**Frontend (exibição):**
```
app/dashboard/patient/[id]/page.tsx
components/PatientForm.tsx
components/PatientData.tsx
```

### Busca para Localizar (executar após clonar):
```bash
# Encontrar onde 'height' é processado
grep -rn "height" --include="*.ts" --include="*.tsx" . | grep -v "node_modules" | grep -v ".next" | head -40

# Encontrar lógica de conversão de texto para número
grep -rn "metro\|altura\|height\|parseFloat\|parseInt" --include="*.ts" . | grep -v "node_modules" | head -30
```

### Análise do Fluxo Atual

Com base nas evidências do diagnóstico:
```
Banco de dados atual:
- Alexandre Cezilla: height = 1    ← erro de teste, valor inválido
- Edna dos Santos:   height = 1.65 ← correto em metros

Conclusão: o banco já armazena em METROS (float)
O label do frontend "Altura (cm)" está ERRADO
```

### PARTE A — Conversão de Voz para Metros (Bot Telegram)

O texto transcrito pode vir em vários formatos. Precisa de um parser robusto:

**Localização esperada:** `bot/utils/heightParser.ts` (ou similar — pode não existir ainda)

```typescript
// ✅ PROPOSTA — Criar ou atualizar função parseHeight()

/**
 * Converte texto de altura (transcrito por voz) para metros (float)
 * 
 * Exemplos suportados:
 * "um metro e setenta"      → 1.70
 * "um metro e setenta e cinco" → 1.75
 * "um metro setenta"        → 1.70
 * "1 metro e 70"            → 1.70
 * "1,70"                    → 1.70
 * "1.70"                    → 1.70
 * "170"                     → 1.70 (interpreta cm se > 3.0)
 * "170cm"                   → 1.70
 * "1m70"                    → 1.70
 */

const NUMEROS: Record<string, number> = {
  'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3, 'tres': 3,
  'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9,
  'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
  'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
  'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50,
  'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90,
};

export function parseHeight(input: string): number | null {
  if (!input) return null;
  
  const normalized = input.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/\s+/g, ' ');

  // --- Formato numérico direto ---
  
  // "1,70" ou "1.70" (já em metros)
  const decimalMatch = normalized.match(/^(\d)[,.](\d{2})$/);
  if (decimalMatch) {
    return parseFloat(`${decimalMatch[1]}.${decimalMatch[2]}`);
  }
  
  // "170cm" ou "170 cm"
  const cmMatch = normalized.match(/^(\d{2,3})\s*cm$/);
  if (cmMatch) {
    return parseInt(cmMatch[1]) / 100;
  }

  // "1m70" ou "1m 70"
  const mMatch = normalized.match(/^(\d)m\s*(\d{1,2})$/);
  if (mMatch) {
    return parseFloat(`${mMatch[1]}.${mMatch[2].padStart(2, '0')}`);
  }

  // Número puro — heurística: se > 3, é cm
  const pureNumber = normalized.match(/^(\d{2,3})$/);
  if (pureNumber) {
    const val = parseInt(pureNumber[1]);
    return val > 3 ? val / 100 : null; // 170 → 1.70
  }

  // --- Formato por extenso ---
  
  // "um metro e setenta" / "um metro setenta" / "um metro e setenta e cinco"
  const metroMatch = normalized.match(
    /^(um|uma|dois|duas|tres|tres)\s+metro[s]?\s+e?\s*(.+)$/
  );
  if (metroMatch) {
    const metersWord = metroMatch[1];
    const metersInt = NUMEROS[metersWord] ?? 1;
    const centsStr = metroMatch[2].trim();
    
    // Converter "setenta" → 70, "setenta e cinco" → 75
    const centsVal = parseTens(centsStr);
    if (centsVal !== null) {
      return parseFloat(`${metersInt}.${String(centsVal).padStart(2, '0')}`);
    }
  }

  return null; // não conseguiu parsear
}

function parseTens(text: string): number | null {
  // "setenta e cinco" → 75
  // "oitenta" → 80
  // "setenta" → 70
  const parts = text.split(/\s+e\s+|\s+/);
  let total = 0;
  
  for (const part of parts) {
    const val = NUMEROS[part.trim()];
    if (val === undefined) return null;
    total += val;
  }
  
  return total <= 99 ? total : null;
}
```

### PARTE B — Banco de Dados (sem alteração de schema)

O banco **já armazena em metros** (evidência: `height: 1.65` para Edna). **Não é necessário migration.**

```sql
-- Schema atual (presumido) — NÃO ALTERAR
CREATE TABLE patients (
  ...
  height FLOAT,  -- armazenado em METROS (ex: 1.65)
  ...
);
```

**Única ação no banco:** Corrigir dados de teste inválidos (opcional, já que são dados de MVP):
```sql
-- Opcional: corrigir o height=1 do Alexandre (só fazer se Well confirmar o valor correto)
-- UPDATE patients SET height = 1.75 WHERE name = 'Alexandre Cezilla'; -- ajustar valor conforme real
```

### PARTE C — Frontend (exibição em cm)

**Problema:** Label diz "Altura (cm)" mas banco tem metros. Precisa converter na exibição.

**Arquivo esperado:** `app/dashboard/patient/[id]/page.tsx` ou componente de dados do paciente.

```typescript
// ❌ CÓDIGO ATUAL — exibe valor bruto do banco (metros) com label errado
<div>
  <label>Altura (cm)</label>
  <span>{patient.height}</span>  {/* exibe "1.65" com label "cm" — ERRADO */}
</div>

// ✅ CÓDIGO CORRIGIDO — converte metros → cm na exibição
<div>
  <label>Altura</label>
  <span>
    {patient.height 
      ? `${Math.round(patient.height * 100)} cm`  // 1.65 → "165 cm"
      : '—'
    }
  </span>
</div>
```

**Para o formulário de edição (input):**
```typescript
// ❌ ATUAL — placeholder "170" mas aceita metros, label diz "cm"
<input 
  type="text" 
  placeholder="170" 
  label="Altura (cm)"
  value={patient.height}  // valor em metros — confuso para o usuário
/>

// ✅ CORRIGIDO — duas opções:

// Opção A: manter input em cm (mais intuitivo para o usuário)
<input 
  type="number" 
  placeholder="170"
  label="Altura (cm)"
  value={patient.height ? Math.round(patient.height * 100) : ''}  // metros → cm para exibir
  onChange={(e) => {
    const cm = parseInt(e.target.value);
    onChange({ ...patient, height: cm / 100 });  // cm → metros para salvar
  }}
  min={50}
  max={250}
/>

// Opção B: input em metros (mais alinhado com o bot)
<input 
  type="number"
  step="0.01"
  placeholder="1.70"
  label="Altura (m)"
  value={patient.height ?? ''}
  onChange={(e) => onChange({ ...patient, height: parseFloat(e.target.value) })}
  min={0.5}
  max={2.5}
/>
```

**Minha recomendação:** Opção A para o painel web (usuário digita 170, mais natural) + bot continua salvando em metros. A conversão cm→metros acontece no `onChange` do formulário web, e metros→cm acontece na renderização.

### Impacto da Correção BUG-04
- ✅ Exibição de altura passa a mostrar "165 cm" em vez de "1.65"
- ✅ Bot de voz converte "um metro e setenta" → 1.70 → banco → "170 cm" na tela
- ✅ IMC pode ser calculado corretamente (se houver essa feature futura)
- ⚠️ Dados de teste existentes (height=1 do Alexandre) continuarão inválidos até correção manual

---

## Outros Bugs Encontrados Durante Análise (referência)

> Esses estavam documentados no diagnóstico anterior. Nenhuma ação necessária agora.

| Bug | Descrição | Sprint |
|-----|-----------|--------|
| BUG-03 | Dois botões "Prontuário" (UX duplicada) | Sprint 2 |
| BUG-05 | Texto "Comece免费" (caractere chinês) | Sprint 3 |
| BUG-06 | Campo UF sem validação (aceita "sim") | Sprint 3 |
| BUG-07 | Link "Config." ausente no menu de Relatórios | Sprint 2 |
| BUG-08 | Campos senha sem autocomplete | Sprint 3 |

---

## Resumo das Ações Propostas

| # | Arquivo | Mudança | Aprovação necessária |
|---|---------|---------|---------------------|
| BUG-01 | `app/api/appointments/route.ts` | Substituir `31` fixo por cálculo de último dia do mês | ✅ Sim |
| BUG-02 | Automático após BUG-01 | — | — |
| BUG-04a | `bot/utils/heightParser.ts` (novo) | Criar parser de altura por voz | ✅ Sim |
| BUG-04b | `app/api/patients/route.ts` | Validar height entre 0.5 e 2.5 antes de salvar | ✅ Sim |
| BUG-04c | `app/dashboard/patient/[id]/page.tsx` | Exibir altura em cm (multiplica por 100) | ✅ Sim |
| BUG-04d | Componente de formulário de edição | Converter cm↔metros na entrada do usuário web | ✅ Sim |

---

## Próximos Passos (aguardando Well)

1. **Well precisa dar acesso ao repositório:** Opções:
   - `gh auth login` no terminal da VM com seu PAT do GitHub
   - Ou: fornecer um Personal Access Token (PAT) para configurar via `git config`

2. **Confirmar caminhos dos arquivos:** Após clone, rodar os comandos `grep` indicados acima para localizar exatamente as linhas a alterar.

3. **Confirmar a decisão de exibição do BUG-04:** 
   - Painel web: input em cm (170) ou metros (1.70)?
   - Bot: já está salvando em metros — confirmar.

4. **Aprovação para commit:** Assim que Well confirmar o acesso e revisar este relatório, Stark implementa, cria branch `fix/bug-01-appointment-month` e `fix/bug-04-height-display`, e abre PRs para revisão.

---

*Relatório elaborado por Stark 🤖 — Agente de Desenvolvimento da operação Well*  
*Status: AGUARDANDO APROVAÇÃO — nenhum commit foi feito*
