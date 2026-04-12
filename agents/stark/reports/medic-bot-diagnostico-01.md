# Diagnóstico Técnico — Medic Bot
**Elaborado por:** Stark 🤖  
**Data:** 2026-04-11  
**Versão:** 01  
**Status:** Completo (com ressalva: não foi possível criar agendamentos sem usuário de produção)

---

## 1. Stack Identificada

| Camada | Tecnologia | Evidência |
|--------|-----------|-----------|
| **Frontend** | Next.js (App Router) | Chunks `/_next/static/chunks/`, RSC payload `self.__next_f`, buildId `wp2UQl8wc18NTAlqkWxzH` |
| **Linguagem** | React (JSX/TSX) | Componentes `$L4`, `ClientPageRoot` no RSC payload |
| **Estilização** | Tailwind CSS | Classes utilitárias no HTML (`antialiased`, `bg-background`, `rounded-xl`, etc.) |
| **Backend/API** | Next.js API Routes | Endpoints em `/api/*` servidos pelo mesmo processo Next.js |
| **Banco de Dados** | PostgreSQL | Erro literal: `"date/time field value out of range: \"2026-04-31\""` — mensagem nativa do pg |
| **Hospedagem** | Hostinger (provável) | Domínio `automatizeconsulting.com.br` em produção |
| **Autenticação** | Sessão/JWT própria | Login via `/api/auth` (cookie de sessão no browser) |

---

## 2. Mapeamento de Telas

| Rota | Tela | Acessível sem login? | Status |
|------|------|---------------------|--------|
| `/` | Landing / Home | ✅ Sim | ✅ OK |
| `/login` | Login | ✅ Sim | ✅ OK |
| `/register` | Criar Conta | ✅ Sim | ⚠️ Bug menor |
| `/dashboard` | Lista de Pacientes | ❌ Requer login | ✅ OK |
| `/dashboard/agenda` | Agenda | ❌ Requer login | 🔴 Bug crítico |
| `/dashboard/patient/[id]` | Ficha do Paciente | ❌ Requer login | ⚠️ 2 bugs |
| `/dashboard/relatorios` | Relatórios | ❌ Requer login | 🔴 Bug (cascata) |
| `/dashboard/configuracoes` | Configurações | ❌ Requer login | ✅ OK |

---

## 3. Bugs Identificados

---

### 🔴 BUG-01 — Agenda vazia (todos os meses com < 31 dias)
**Prioridade:** P1 — Bloqueante total para uso da agenda  
**Tela:** `/dashboard/agenda`

**Sintoma:**  
A agenda não exibe nenhum agendamento quando o mês selecionado tem menos de 31 dias (abril, fevereiro, junho, setembro, novembro).

**Causa raiz:**  
A API `/api/appointments` constrói um range de datas usando `dia 31` fixo como data final do mês, sem usar a data real do último dia do mês. Isso gera uma query SQL com `2026-04-31` (abril tem 30 dias) ou `2026-02-31` (fevereiro tem 28/29 dias), causando erro de validação no PostgreSQL.

**Erro retornado pela API:**
```json
{"error": "date/time field value out of range: \"2026-04-31\""}
```

**Meses afetados:** Abril, Junho, Setembro, Novembro (30 dias) e Fevereiro (28/29 dias) — 5 meses/ano  
**Meses OK:** Janeiro, Março, Maio, Julho, Agosto, Outubro, Dezembro (31 dias)

**Erro no console do browser:**
```
Failed to load resource: 500 — /api/appointments?year=2026&month=04
```

**Solução:**  
No arquivo da API Route que serve `/api/appointments`, substituir a data final estática pelo último dia real do mês:

```typescript
// ❌ Errado — dia 31 fixo
const endDate = `${year}-${month}-31`;

// ✅ Correto — último dia real do mês
const lastDay = new Date(year, parseInt(month), 0).getDate();
const endDate = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
```

Ou usando a query SQL diretamente com `DATE_TRUNC`:
```sql
WHERE date >= DATE_TRUNC('month', $1::date)
  AND date < DATE_TRUNC('month', $1::date) + INTERVAL '1 month'
```

**Impacto pós-correção:** Agenda volta a funcionar nos 5 meses afetados. Relatórios também se beneficiam (os dados da agenda alimentam os relatórios).

---

### 🔴 BUG-02 — Relatórios sem dados
**Prioridade:** P1 (cascata do BUG-01)  
**Tela:** `/dashboard/relatorios`

**Sintoma:**  
Relatório de Abril/2026 mostra todos os valores zerados: R$ 0,00 / 0 consultas / 0 faltas / 0 cancelamentos.

**Causa raiz:**  
Cascata direta do BUG-01. O módulo de relatórios em `/api/relatorios` consulta os agendamentos do período. Como a API de agendamentos falha com 500 em abril, não há dados para agregar.

**Evidência:**  
A API `/api/relatorios?year=2026&month=04` retorna estrutura vazia mas com HTTP 200 (não gera 500 — trata o erro silenciosamente):
```json
{
  "summary": {"totalValue": 0, "totalPaid": 0, "totalPending": 0, "totalCount": 0, ...},
  "appointmentsList": []
}
```

**Solução:** Corrigir BUG-01. Os relatórios voltarão a funcionar automaticamente para os meses afetados.

**Observação adicional:** A tela de Relatórios não exibe mensagem de erro quando a API de agendamentos falha — fica silenciosamente vazia. Recomendado adicionar tratamento de erro visível para o usuário.

---

### 🟡 BUG-03 — Dois pontos de acesso ao Prontuário (UX duplicada)
**Prioridade:** P2 — Confusão de UX, não bloqueia funcionalidade  
**Tela:** `/dashboard/patient/[id]`

**Sintoma:**  
Na tela de ficha do paciente existem **dois elementos** que levam ao mesmo destino (aba Prontuário):
1. **Botão "Prontuário"** no header superior direito (ao lado do botão WhatsApp)
2. **Aba "Prontuário"** na navegação interna (ao lado da aba "Dados")

Ambos têm comportamento idêntico: mudam a view para o prontuário do paciente.

**Causa provável:**  
Durante o desenvolvimento, foi implementada a navegação por abas (Dados / Prontuário), e o botão de atalho no header foi adicionado depois — ou vice-versa — sem remover o elemento anterior.

**Evidência no DOM:**
```
button "Prontuário" [ref=e13]  ← header superior direito
button "Prontuário" [ref=e21]  ← aba de navegação interna
```

**Solução:**  
Remover o botão "Prontuário" do header superior (ref=e13). Manter apenas a navegação por abas (Dados / Prontuário), que é o padrão UX esperado para este tipo de interface. O header pode manter apenas o botão WhatsApp.

**Impacto:** Elimina confusão visual. Interface fica mais limpa e consistente.

---

### 🟡 BUG-04 — Campo Altura com valor inválido / unidade inconsistente
**Prioridade:** P2 — Dado médico incorreto, pode afetar cálculo de IMC  
**Tela:** `/dashboard/patient/[id]` → seção Dados Pessoais

**Sintoma (parte 1 — valor inválido):**  
Paciente Alexandre Cezilla tem `Altura (cm) = 1` — valor claramente inválido (1 cm não é altura humana).

**Sintoma (parte 2 — inconsistência de unidade):**  
O label diz **"Altura (cm)"**, mas o placeholder do campo é `170`, sugerindo cm. No entanto, o dado armazenado no banco para Edna dos Santos Trindade é `height: 1.65` — que é a altura em **metros** (1,65m), não em centímetros (165cm).

**Evidência:**
```json
// API /api/patients retorna:
{"name": "Alexandre Cezilla", "height": 1}      // ← 1 metro? Inválido de qualquer forma
{"name": "Edna dos Santos Trindade", "height": 1.65}  // ← 1,65m (correto em metros)

// Frontend exibe no campo "Altura (cm)":
Alexandre: "1"    // ← inválido
Edna:       "1.65" // ← correto em metros, mas label diz cm
```

**Causa provável:**  
O formulário do Telegram Bot envia a altura em metros (padrão do bot de transcrição), mas o banco de dados e o label do frontend dizem "cm". Há conflito entre o que o bot salva e o que o painel web exibe.

**Solução (2 opções):**

**Opção A — Padronizar em metros (recomendada):**  
Alterar o label de `Altura (cm)` para `Altura (m)` e o placeholder de `170` para `1.70`. Adicionar validação: valores aceitos entre 0.50 e 2.50.

**Opção B — Converter para cm:**  
Manter o label `Altura (cm)`, mas converter todos os valores existentes no banco multiplicando por 100 (migration), e alterar o bot para enviar em cm.

**Ação imediata:** O valor `height = 1` do Alexandre deve ser corrigido — provavelmente deveria ser `1.75` ou similar. Confirmar com o Well.

---

### 🟡 BUG-05 — Texto com caractere chinês na tela de Registro
**Prioridade:** P3 — Cosmético, mas prejudica credibilidade do produto  
**Tela:** `/register`

**Sintoma:**  
O subtítulo da tela de registro exibe: **"Comece免费"**  
O caractere `免费` significa "grátis" em mandarim. O texto correto deveria ser "Comece grátis" ou "Comece gratuitamente".

**Causa provável:**  
Resquício de cópia/cola de algum template ou IA que gerou o texto com caractere em mandarim, não detectado na revisão.

**Evidência no HTML:**
```html
<p class="text-muted text-sm mt-1">Comece免费</p>
```

**Solução:**  
```html
<!-- Arquivo: app/register/page.tsx (ou similar) -->
<!-- ❌ Atual -->
<p>Comece免费</p>

<!-- ✅ Correto -->
<p>Comece gratuitamente</p>
```

**Impacto:** Correção de 1 linha. Elimina constrangimento de credibilidade para demos e novos usuários.

---

### 🟡 BUG-06 — Campo Estado (UF) salva texto livre sem validação
**Prioridade:** P3 — Qualidade de dado, não bloqueia uso  
**Tela:** `/dashboard/patient/[id]` → seção Endereço

**Sintoma:**  
O campo "Estado (UF)" aceita qualquer texto. Dois pacientes têm o valor `"sim"` salvo no banco como estado.

**Evidência na API:**
```json
{"name": "Andrea Trindade", "state": "sim"}
{"name": "Edna dos Santos Trindade", "state": "sim"}
```
(O frontend exibe "RJ" para Edna após algum processamento — possível normalização/conversão na renderização, mas o banco tem "sim")

**Causa provável:**  
O campo é `<input type="text">` livre — sem validação de formato UF (2 letras maiúsculas). O bot de Telegram pode ter enviado resposta de confirmação ("sim") em vez do código do estado.

**Solução:**  
Substituir o campo texto por um `<select>` com os 27 estados brasileiros (UFs), tanto no painel web quanto validando a entrada no bot de Telegram.

---

### ⚠️ BUG-07 — Link "Config." ausente do menu em algumas telas
**Prioridade:** P3 — UX inconsistente  
**Tela:** `/dashboard/relatorios`

**Sintoma:**  
O menu de navegação principal exibe 4 itens nas telas Agenda, Pacientes e Configurações:
`Agenda | Pacientes | Relatórios | Config.`

Porém, na tela de Relatórios, o menu exibe apenas 3 itens:
`Agenda | Pacientes | Relatórios`

O link "Config." desaparece.

**Causa provável:**  
O componente de layout da tela de Relatórios usa um `<nav>` diferente do restante do dashboard — possivelmente um componente separado sem o link de Config., ou uma condicional que filtra o item ativo de forma incorreta.

**Solução:**  
Verificar o componente de layout (`layout.tsx`) de `/dashboard/relatorios` e garantir que usa o mesmo componente `<Navbar>` das demais telas, incluindo o link para `/dashboard/configuracoes`.

---

### ⚠️ BUG-08 — Campo senha sem autocomplete nos formulários
**Prioridade:** P3 — Acessibilidade / boas práticas  
**Telas:** `/login`, `/register`, `/dashboard/configuracoes`

**Sintoma:**  
Os campos de senha não têm o atributo `autocomplete` configurado corretamente.

**Evidência no console:**
```
[DOM] Input elements should have autocomplete attributes 
(suggested: "current-password" / "new-password")
```

**Solução:**  
Adicionar os atributos adequados:
```html
<!-- Login -->
<input type="password" autocomplete="current-password" />

<!-- Register / Nova senha -->
<input type="password" autocomplete="new-password" />
```

---

## 4. Resumo Executivo

| # | Bug | Tela | Prioridade | Tipo |
|---|-----|------|-----------|------|
| BUG-01 | Agenda vazia (API 500 — dia 31 inválido) | Agenda | 🔴 P1 | Backend |
| BUG-02 | Relatórios sem dados (cascata BUG-01) | Relatórios | 🔴 P1 | Cascata |
| BUG-03 | Dois botões "Prontuário" (UX duplicada) | Ficha Paciente | 🟡 P2 | Frontend |
| BUG-04 | Altura inválida / unidade inconsistente | Ficha Paciente | 🟡 P2 | Dados/Frontend |
| BUG-05 | Texto "Comece免费" (caractere chinês) | Registro | 🟡 P3 | Frontend |
| BUG-06 | Campo Estado (UF) sem validação | Ficha Paciente | 🟡 P3 | Validação |
| BUG-07 | Link "Config." ausente no menu de Relatórios | Relatórios | 🟡 P3 | Frontend |
| BUG-08 | Campos senha sem autocomplete | Login/Register/Config | 🟡 P3 | Acessibilidade |

---

## 5. Ordem de Correção Recomendada

```
Sprint 1 (urgente — produção quebrada):
  BUG-01 → BUG-02 (automático após BUG-01)

Sprint 2 (qualidade — UX e dados):
  BUG-03 → BUG-04 → BUG-07

Sprint 3 (polish — credibilidade):
  BUG-05 → BUG-06 → BUG-08
```

---

## 6. Perguntas para o Well

1. **Acesso ao repositório:** Qual é o repositório GitHub do Medic Bot? Preciso do acesso para localizar o arquivo da API Route e propor o PR de correção do BUG-01.

2. **Campo Altura:** O bot de Telegram envia a altura em metros (ex: 1.75) ou em centímetros (ex: 175)? Isso define qual das duas opções de correção do BUG-04 deve ser aplicada.

3. **Alexandre Cezilla — Altura:** O valor `height = 1` do Alexandre é um dado de teste ou erro de cadastro? Precisa ser corrigido manualmente no banco?

4. **Usuário de produção:** Existe um usuário de demo separado para testes futuros? Usei o próprio cadastro do Well neste diagnóstico — recomendo criar um usuário `demo@automatizeconsulting.com.br` para testes futuros.

---

## 7. Erros de Console Registrados

| Timestamp | Tipo | Endpoint | Status |
|-----------|------|----------|--------|
| 01:42:18 | ERROR | `/api/appointments?year=2026&month=04` | 500 |
| 01:42:21 | ERROR | `/api/appointments?year=2026&month=04` | 500 |
| 01:42:34 | ERROR | `/api/appointments?year=2026&month=04` | 500 |
| 01:44:02 | ERROR | `/api/reports?year=2026&month=04` | 404 (rota não existe) |
| 01:44:50 | ERROR | `/api/appointments?year=2026&month=04` | 500 |
| — | VERBOSE | `/login` | Campo senha sem autocomplete |
| — | VERBOSE | `/register` | Campo senha sem autocomplete |
| — | VERBOSE | `/dashboard/configuracoes` | Campos senha sem autocomplete |

---

*Relatório gerado por Stark 🤖 — Agente de Desenvolvimento da operação Well*  
*Próximo passo: aguardar acesso ao repositório GitHub para iniciar as correções*
