# 🔮 Auditoria UX/UI Completa — Medic Bot

**Autora:** Wanda 🔮 — Especialista em UX/UI e Experiência do Usuário  
**Data:** 13/04/2026  
**Sistema:** Medic Bot (https://medic.automatizeconsulting.com.br)  
**Stack:** Next.js App Router + React + Tailwind CSS  
**Versão auditada:** Produção atual  

---

## Sumário Executivo

O Medic Bot é um sistema de prontuário eletrônico e gestão clínica com proposta clara e focada. Possui uma base funcional sólida — cadastro de pacientes, prontuário, agenda e relatórios — mas apresenta inconsistências significativas de interface, falta de responsividade mobile e lacunas importantes quando comparado a concorrentes de mercado. O sistema está em estágio **MVP funcional**, mas ainda distante de maturidade UX competitiva.

---

## PARTE 1 — Análise UX/UI Detalhada

### 1.1 Inventário de Telas Analisadas

| # | Tela | URL | Status |
|---|------|-----|--------|
| 1 | Landing Page | `/` | ✅ Capturada |
| 2 | Login | `/login` | ✅ Capturada |
| 3 | Cadastro (Registro) | `/register` | ✅ Capturada |
| 4 | Dashboard/Pacientes | `/dashboard` | ✅ Capturada |
| 5 | Novo Paciente (modal) | `/dashboard` | ✅ Capturada |
| 6 | Ficha do Paciente - Dados | `/dashboard/patient/[id]` | ✅ Capturada |
| 7 | Ficha do Paciente - Prontuário | `/dashboard/patient/[id]` | ✅ Capturada |
| 8 | Agenda | `/dashboard/agenda` | ✅ Capturada |
| 9 | Relatórios | `/dashboard/relatorios` | ✅ Capturada |
| 10 | Configurações | `/dashboard/configuracoes` | ✅ Capturada |

---

### 1.2 Análise por Tela

#### 🏠 Landing Page (`/`)

**Pontos positivos:**
- Design limpo e centralizado
- Proposta de valor clara: "Transcrição inteligente para prontuários. Simple, rápido, seguro."
- CTAs claros: "Entrar" (primário) e "Criar conta" (secundário)
- Indicadores de confiança: LGPD e Telegram

**Problemas identificados:**
- Erro de ortografia: "Simple" deveria ser "Simples" 🟡
- Ícone do logo (🩺) é um emoji — falta identidade visual profissional 🟡
- Sem onboarding visual (screenshots, vídeo demo, depoimentos) 🟡
- Sem link para "Saiba mais" ou "Como funciona" 🟢

---

#### 🔐 Login (`/login`)

**Pontos positivos:**
- Layout centralizado e limpo
- Campos bem labalizados com placeholders
- Link para criar conta

**Problemas identificados:**
- Campo de senha sem toggle de visibilidade (mostrar/ocultar) 🟡
- Sem "Esqueci minha senha" — crítico para qualquer sistema de produção 🔴
- Sem autocomplete nos campos (atributos `autocomplete` ausentes) 🟡
- Sem feedback de erro visível para credenciais inválidas (não testei por estar logado) 🟡
- Logo clicável redireciona para `/`, mas sem indicação visual de que é clicável 🟢

---

#### 📝 Cadastro (`/register`)

**Pontos positivos:**
- Campos relevantes: nome, email, senha, especialidade, Chat ID do Telegram
- Seletor de especialidade (Médico/Fisioterapeuta)
- Texto auxiliar para o Telegram Chat ID: "Vincule seu bot depois no dashboard"

**Problemas identificados:**
- **BUG-05 confirmado:** Texto "Comece免费" — mistura de português com chinês 🟠
- Apenas 2 especialidades disponíveis (Médico, Fisioterapeuta) — limitante para mercado real 🟡
- Sem confirmação de senha (campo único) 🟡
- Sem indicador de força de senha 🟢
- Sem termos de uso / política de privacidade (obrigatório pela LGPD mencionada na landing) 🟠
- Campo "Chat ID do Telegram" pode confundir novos usuários — falta tooltip explicativo 🟡

---

#### 📋 Dashboard / Lista de Pacientes (`/dashboard`)

**Pontos positivos:**
- Empty state excelente: "Nenhum paciente cadastrado" + "Cadastrar primeiro paciente" com CTA claro
- Barra de busca proeminente no topo
- Lista de pacientes com nome e data de cadastro
- Botão "+ Novo Paciente" em destaque na navbar

**Problemas identificados:**
- Navbar inconsistente entre telas — na tela de Pacientes aparece: Agenda, Pacientes, Relatórios, Config., + Novo Paciente, Sair. Nas outras telas, itens somem 🔴
- Lista de pacientes não mostra informações resumidas (telefone, convênio, último atendimento) 🟠
- Sem paginação ou indicação de quantidade total 🟡
- Sem filtros (por convênio, data, etc.) 🟡
- Ícone de logout (→) sem label text — pouco intuitivo 🟡

---

#### ➕ Novo Paciente (Modal)

**Pontos positivos:**
- Formulário muito completo: Dados Pessoais, Convênio, Endereço, Observações
- Campos bem organizados em seções com headings
- Campos com placeholders contextuais (ex: "000.000.000-00" para CPF, "70,0" para peso)
- Botões "Cancelar" e "Cadastrar" claros

**Problemas identificados:**
- Apenas "Nome completo" marcado como obrigatório (*) — permite cadastrar paciente sem telefone, CPF, ou qualquer outro dado 🟠
- Data de nascimento com formato `mm/dd/yyyy` — formato americano, deveria ser `dd/mm/yyyy` para Brasil 🔴
- Campo Estado (UF) é text input livre sem validação — aceita qualquer texto 🟡 (bug P3 conhecido)
- CEP sem busca automática de endereço (integração ViaCEP) 🟡
- CPF sem validação de dígitos verificadores 🟡
- Telefone sem máscara de input 🟡
- Modal longo precisa de scroll — formulário poderia ser em etapas (wizard) para melhor UX 🟡

---

#### 👤 Ficha do Paciente — Dados

**Pontos positivos:**
- Layout dedicado com nome do paciente em destaque
- Abas "Dados" e "Prontuário" — boa separação de contexto
- Botão "WhatsApp" para contato rápido — excelente para contexto clínico
- Botão "Imprimir Prontuário"
- Link "← Voltar" para retornar à lista

**Problemas identificados:**
- Navbar principal desaparece completamente — substituída por barra contextual. O médico perde acesso direto a Agenda, Relatórios, Config. 🟠
- Sem breadcrumb: "Pacientes > Maria Silva > Dados" seria ideal 🟡
- Sem indicação visual de campos editados/não salvos 🟡
- Botão "Salvar dados" fica no final da página — longe dos campos editados no topo 🟡

---

#### 📄 Ficha do Paciente — Prontuário

**Pontos positivos:**
- "Prontuário Consolidado" — visão resumida no topo
- "Novo Registro" com textarea e seletor de tipo
- "Histórico" com contador de registros
- Empty state útil: "Adicione um registro acima ou envie áudios pelo Telegram"

**Problemas identificados:**
- Seletor de tipo mostra apenas "Texto" — opções muito limitadas para prontuário clínico (falta: Prescrição, Atestado, Solicitação de Exame, Evolução, Anamnese) 🔴
- Sem templates de prontuário pré-configurados por especialidade 🟠
- Textarea simples sem formatação (sem rich text editor) 🟡
- Sem campos estruturados (CID, hipótese diagnóstica, conduta, etc.) 🟠
- Sem anexo de arquivos/imagens ao registro 🟡
- Sem assinatura digital do médico 🟡

---

#### 📅 Agenda (`/dashboard/agenda`)

**Pontos positivos:**
- Layout de calendário diário com slots de 30 minutos (08:00-18:00)
- Mini-calendário mensal na lateral direita
- Legenda de tipos: Consulta, Primeira Consulta, Retorno, Exame, Cirurgia
- Botão "Lembrete"
- Busca de paciente integrada
- Cada slot mostra "Novo agendamento" no hover — interação intuitiva

**Problemas identificados:**
- Navbar perde botões "Novo Paciente" e "Sair" 🔴 (inconsistência)
- Sem visão semanal ou mensal — apenas visão diária 🟠
- Sem indicação de horários ocupados vs. disponíveis em modo visual rápido 🟡
- Sem drag-and-drop para reagendar 🟡
- Não mostra status do agendamento (confirmado, pendente, chegou) 🟡
- Botão "Calendário" aparece em mobile mas sem funcionalidade clara no desktop 🟢

---

#### 📊 Relatórios (`/dashboard/relatorios`)

**Pontos positivos:**
- Resumo financeiro claro: Valor Total, Pago, a Receber
- Contadores: Total de agendamentos, Faltas, Cancelamentos
- Filtros por ano e mês
- Botão "Imprimir"
- Empty state contextual: "Nenhum agendamento em Abril / 2026"

**Problemas identificados:**
- Navbar sem "Config." e sem "Sair" 🔴
- Apenas resumo financeiro — sem gráficos ou visualizações 🟠
- Sem relatório de pacientes, produtividade, ou métricas clínicas 🟡
- Sem exportação para Excel/CSV 🟡
- Header da tabela com fundo escuro (azul/preto) — contraste visual forte com o resto da interface clean 🟢

---

#### ⚙️ Configurações (`/dashboard/configuracoes`)

**Pontos positivos:**
- Perfil do usuário com nome, email, especialidade
- Seção "Alterar Senha" com campos adequados (atual, nova, confirmar)
- Seção "Sessão" com informação de quem está logado e botão "Sair da conta"
- Instrução para encontrar Chat ID do Telegram com link para @userinfobot

**Problemas identificados:**
- Label da navbar muda: "Config." na tela de Pacientes → "Configurações" aqui 🟡 (inconsistência)
- Sem upload de foto de perfil (só emoji 🩺) 🟡
- Sem configuração de horários da agenda (início, fim, duração dos slots) 🟠
- Sem configuração de templates de prontuário 🟡
- Sem gestão de multi-usuários/recepcionistas 🟡

---

### 1.3 Avaliação por Heurísticas de Nielsen

| # | Heurística | Nota (1-5) | Observações |
|---|-----------|-----------|-------------|
| H1 | Visibilidade do status do sistema | ⭐⭐⭐ | Loading states existem ("Carregando..."), mas sem spinners animados. Sem indicação de salvamento, sem toast/snackbar de sucesso consistente. |
| H2 | Compatibilidade com o mundo real | ⭐⭐⭐⭐ | Linguagem adequada ao público médico brasileiro. Termos clínicos corretos. Data no formato dd/mm/yyyy na listagem (mas mm/dd/yyyy no input!). |
| H3 | Controle e liberdade do usuário | ⭐⭐ | Sem "Esqueci senha". Sem undo/desfazer. Modal de cadastro sem confirmação de saída. Navbar inconsistente impede navegação livre. |
| H4 | Consistência e padrões | ⭐⭐ | **Principal fraqueza.** Navbar muda entre telas. Labels mudam ("Config." vs "Configurações"). Botões aparecem/desaparecem. Cores dos CTAs variam. |
| H5 | Prevenção de erros | ⭐⭐ | Campos sem validação (CPF, UF, email). Cadastro aceita dados mínimos demais. Formato de data americano. Sem confirmação para ações destrutivas. |
| H6 | Reconhecimento vs. recordação | ⭐⭐⭐ | Labels nos campos OK. Mas sem breadcrumbs, sem indicação de "onde estou" além da navbar ativa. Ícone de logout sem label. |
| H7 | Flexibilidade e eficiência | ⭐⭐ | Sem atalhos de teclado. Sem busca global. Sem favoritos/recentes. Sem modo de digitação rápida para prontuário. |
| H8 | Design estético e minimalista | ⭐⭐⭐⭐ | Design limpo e organizado. Uso de cores consistente (azul primário). Boa hierarquia visual. Cards bem estruturados. |
| H9 | Recuperação de erros | ⭐⭐ | Mensagens de erro genéricas ou ausentes. Sem guia para corrigir problemas. Sem validação em tempo real. |
| H10 | Ajuda e documentação | ⭐ | **Zero.** Nenhuma seção de ajuda, FAQ, tooltips contextuais ou onboarding guiado. Único auxílio: texto do Telegram Chat ID. |

**Média das Heurísticas: 2.5/5** (equivalente a ~5/10 em maturidade)

---

### 1.4 Avaliação de Acessibilidade (WCAG AA)

| Critério | Status | Detalhes |
|----------|--------|----------|
| **Contraste de cores** | 🟡 Parcial | Textos cinza em placeholders podem não atingir ratio 4.5:1. Botão azul primário com texto branco OK. |
| **Tamanho de fonte** | ✅ OK | Fontes base legíveis (14-16px). Headings bem hierarquizados. |
| **Navegação por teclado** | 🟡 Parcial | Tab funciona nos campos de formulário. Falta `focus` visível em links da nav. Falta skip-link. |
| **Labels em inputs** | 🟡 Parcial | Labels visuais existem, mas usam `<div>` em vez de `<label>` com `htmlFor` — leitores de tela podem não associar. |
| **ARIA roles** | ❌ Insuficiente | Snapshot mostra elementos como `generic` ao invés de roles semânticos. Banner e nav presentes mas inconsistentes. |
| **Alt text em imagens** | ❌ Ausente | Ícones SVG sem `aria-label`. Emojis usados como ícones sem texto alternativo. |
| **Responsividade** | ❌ Problemática | Navbar quebra em mobile. Sem menu hamburger. Sem viewport meta tag adequada (inferido pelo comportamento). |
| **Formulários** | 🟡 Parcial | Campos de senha sem `type="password"` correto (snapshot mostra como `textbox`). Sem `autocomplete`. |

**Score WCAG AA estimado: ~35% de conformidade** — longe do mínimo aceitável para software de saúde.

---

### 1.5 Responsividade Mobile

**Viewport testado:** 375x812px (iPhone X equivalent)

| Tela | Comportamento | Severidade |
|------|--------------|-----------|
| Landing | Funciona razoavelmente | 🟢 |
| Login | Centralizado, OK | 🟢 |
| Cadastro | Campos se ajustam | 🟡 |
| Dashboard (Pacientes) | **Navbar quebra em 3 linhas**, texto "Medic Bot" wraps | 🔴 |
| Agenda | Grade de horários funciona, mini-calendário esconde | 🟡 |
| Ficha do Paciente | Formulário em coluna única, aceitável | 🟡 |
| Relatórios | Tabela pode truncar | 🟡 |

**Veredicto mobile:** Não é usável em smartphone sem menu hamburger. Para médicos que consultam entre atendimentos no celular, isso é **inaceitável**.

---

### 1.6 Jornada do Médico (User Journey Map)

```
Login → Dashboard → Buscar Paciente → Abrir Ficha → Aba Prontuário → Novo Registro → Salvar → Imprimir
```

| Etapa | Ação | Cliques | Fricção | Notas |
|-------|------|---------|---------|-------|
| 1. Login | Email + Senha + "Entrar" | 3 | 🟢 Baixa | Rápido, sem 2FA |
| 2. Dashboard | Visualizar lista | 0 | 🟢 Baixa | Vai direto para pacientes |
| 3. Buscar paciente | Digitar nome na busca | 1 | 🟡 Média | Busca aparenta ser por nome — sem filtros avançados |
| 4. Abrir ficha | Clicar no paciente | 1 | 🟢 Baixa | Navegação direta |
| 5. Aba Prontuário | Clicar "Prontuário" | 1 | 🟢 Baixa | Separação por abas funciona bem |
| 6. Novo registro | Digitar + Selecionar tipo + Salvar | 3 | 🟠 Alta | Textarea básica. Sem template. Sem campos estruturados. Médico precisa digitar tudo do zero. |
| 7. Imprimir | Botão "Imprimir Prontuário" | 1 | 🟡 Média | Funciona, mas formato depende da implementação |
| **Total** | | **10** | | |

**Jornada principal:** 10 cliques do login ao registro — razoável para MVP. Mas a **etapa 6 é o gargalo**: o registro de prontuário é 100% texto livre, sem nenhuma estruturação ou assistência.

---

### 1.7 Top 5 Maiores Problemas de UX

| # | Problema | Severidade | Impacto | Heurísticas Violadas |
|---|---------|-----------|---------|---------------------|
| **1** | **Navbar inconsistente entre telas** — Botões "Novo Paciente", "Config." e "Sair" aparecem/desaparecem dependendo da tela. O usuário perde a navegação global. | 🔴 Crítico | Desorientação, impossibilidade de logout em certas telas, quebra de modelo mental | H3, H4, H6 |
| **2** | **Prontuário sem estrutura clínica** — Campo de texto livre único, sem templates, sem campos de CID, prescrição, atestado. Médicos precisam de estrutura para produtividade e conformidade legal. | 🔴 Crítico | Inutilizável para prontuário médico real. Risco legal. | H2, H7 |
| **3** | **Zero responsividade mobile** — Navbar quebra em telas menores, sem menu hamburger. Médicos frequentemente usam celular entre consultas. | 🔴 Crítico | Sistema inacessível em 60%+ dos dispositivos usados por médicos | H4, H7 |
| **4** | **Sem "Esqueci minha senha"** — Funcionalidade básica de qualquer sistema de autenticação ausente. Usuário que esquece a senha fica trancado fora. | 🟠 Alto | Bloqueio total do usuário, carga de suporte | H3, H5, H9 |
| **5** | **Sem validação de dados nos formulários** — CPF sem validação, UF como texto livre, data em formato americano, email sem validação robusta. | 🟠 Alto | Dados inconsistentes no banco, erros silenciosos, retrabalho | H5, H9 |

---

## PARTE 2 — Benchmark de Mercado

### 2.1 Concorrentes Analisados

| # | Sistema | Segmento | Modelo | Fundação |
|---|---------|----------|--------|----------|
| 1 | **iClinic** | Consultórios e clínicas | SaaS mensal | ~2012 |
| 2 | **Amplimed** | Clínicas médicas | SaaS mensal | 2014 |
| 3 | **Feegow Clinic** | Clínicas e centros médicos | SaaS mensal | ~2010 |
| 4 | **Doctoralia Pro** | Profissionais individuais e clínicas | SaaS + marketplace | Parte do grupo Docplanner |
| 5 | **Ninsaúde Clinic** | Clínicas e franquias | SaaS mensal | ~2017 |

---

### 2.2 Comparativo Detalhado

#### 📊 Tabela Comparativa

| Critério | Medic Bot | iClinic | Amplimed | Feegow | Doctoralia Pro | Ninsaúde |
|----------|-----------|---------|----------|--------|---------------|----------|
| **Onboarding** | Cadastro simples, sem tutorial | Trial gratuito + onboarding guiado | Trial + equipe de implantação | Demo + suporte dedicado | Perfil gratuito + upsell | Trial + setup assistido |
| **Interface** | Clean/minimalista, mas inconsistente | Moderna, intuitiva, polida | Moderna, funcional | Profissional, densa em funcionalidades | Moderna, foco marketplace | Moderna, multi-especialidade |
| **Prontuário** | Texto livre único | Personalizável por especialidade com IA | IA para transcrição + prontuário estruturado | IA integrada, SBIS certificado | Básico + Noa Notes (IA) | IA + odontograma + multi-template |
| **Agenda** | Diária com slots 30min | Multi-visão (dia/semana/mês) + online | Inteligente + WhatsApp Connect | Multi-profissional + procedimentos | Online 24h multicanal | CRM + funil + agenda |
| **Relatórios** | Financeiro básico mensal | Completo: financeiro + clínico | Dashboards + indicadores | 100% customizáveis | Tempo real | Analytics + BI |
| **Mobile** | ❌ Quebrado | ✅ App nativo | ✅ App nativo | ✅ App nativo | ✅ App nativo | ✅ Responsivo |
| **Teleconsulta** | ❌ Não | ✅ Integrada | ✅ Integrada + criptografia | ✅ Mais completa do mercado | ✅ Integrada | ✅ Ilimitada |
| **WhatsApp** | Botão para abrir conversa | Lembretes automáticos | Connect integrado | ❌ (usa SMS) | ❌ | ✅ Integrado |
| **Faturamento TISS** | ❌ Não | ✅ | ✅ 99% menos glosas | ✅ Certificação SBIS | Parcial | ✅ |
| **Assinatura Digital** | ❌ Não | ✅ | ✅ ICP-Brasil | ✅ | ❌ | ✅ |
| **IA/Automação** | Transcrição via Telegram | Copilot + Transcrição | Amália (Agendamento + Transcrição + Copilot) | Prontuário com IA | Noa Notes | IA no prontuário |
| **LGPD** | Mencionada (sem detalhes) | Compliant | Compliant + SECTIGO | Compliant + SBIS + AWS | Compliant | Compliant |
| **Preço estimado** | Gratuito/MVP | R$ 100-250/mês | R$ 150-400/mês | R$ 200-600/mês | R$ 150-400/mês | R$ 120-350/mês |

---

### 2.3 Funcionalidades que o Medic Bot NÃO tem (e os concorrentes têm)

#### 🔴 Críticas (must-have para competir)
1. **Prontuário estruturado** — Templates por especialidade, campos CID, prescrição eletrônica
2. **Recuperação de senha** — "Esqueci minha senha"
3. **Responsividade/App mobile** — Mínimo: site responsivo. Ideal: app nativo
4. **Visão de agenda semanal/mensal** — Apenas diária é limitante
5. **Confirmação de consulta** — Via WhatsApp/SMS automático

#### 🟠 Importantes (diferenciais competitivos)
6. **Teleconsulta integrada** — Videochamada dentro do sistema
7. **Prescrição digital** — Com assinatura eletrônica válida
8. **Faturamento TISS/Convênios** — Automação de guias
9. **Dashboard com métricas** — Gráficos, KPIs, tendências
10. **Agendamento online pelo paciente** — Link compartilhável

#### 🟡 Nice-to-have (próximas evoluções)
11. **CRM de pacientes** — Funil de relacionamento, retenção
12. **Estoque de materiais** — Para clínicas com procedimentos
13. **Multi-usuário com permissões** — Médico vs. recepcionista
14. **Certificação digital ICP-Brasil** — Validade jurídica
15. **Integração com laboratórios** — Resultados de exames automáticos

---

### 2.4 O que o Medic Bot faz de DIFERENTE

| Diferencial | Análise |
|-------------|---------|
| **Integração com Telegram** | Único no mercado com transcrição via Telegram. Pode ser killer feature se bem explorada. |
| **Simplicidade radical** | Enquanto concorrentes têm 200+ funcionalidades, o Medic Bot tem ~10. Pode ser vantagem para médicos que querem "só o básico". |
| **Gratuidade** | Se for gratuito, é uma proposta de valor forte para médicos iniciantes. |
| **Velocidade de setup** | Cadastro → primeiro paciente em <2 minutos. Concorrentes levam dias de implantação. |

---

## PARTE 3 — Veredito Final

### 🎯 Nível de Maturidade UX: **3.5 / 10**

| Dimensão | Score | Justificativa |
|----------|-------|---------------|
| Funcionalidade | 4/10 | Cobre o básico, mas falta profundidade clínica |
| Visual Design | 5/10 | Clean e organizado, mas sem identidade visual forte |
| Consistência | 2/10 | Navbar muda entre telas — problema fundamental |
| Acessibilidade | 2/10 | WCAG ~35%, sem ARIA, sem responsividade |
| Experiência do Prontuário | 2/10 | Texto livre demais para uso clínico real |
| Onboarding | 3/10 | Cadastro rápido, mas zero orientação depois |
| Mobile | 1/10 | Quebrado, inutilizável |
| Competitividade | 3/10 | Muito distante dos concorrentes em features |

---

### 🏆 Top 3 Mudanças de Maior Impacto

#### 1. 🔧 **Unificar a Navbar** (Esforço: Baixo | Impacto: Altíssimo)
> Criar um componente `<Navbar />` único reutilizado em TODAS as telas. Com todos os links: Agenda, Pacientes, Relatórios, Config., + Novo Paciente, Sair. Isso resolve o problema #1 e melhora H3, H4, H6 de uma vez. **Estimativa: 2-4 horas de desenvolvimento.**

#### 2. 📋 **Estruturar o Prontuário** (Esforço: Médio | Impacto: Altíssimo)
> Adicionar templates de prontuário (Anamnese, Evolução, Prescrição, Atestado). Incluir campo de CID com autocomplete. Isso transforma o sistema de "bloco de notas" em "prontuário real". **Estimativa: 1-2 semanas.**

#### 3. 📱 **Responsividade Mobile com Menu Hamburger** (Esforço: Médio | Impacto: Alto)
> Implementar menu hamburger com Tailwind CSS (já na stack). Testar em viewports 320px-768px. Priorizar: dashboard, prontuário e agenda. **Estimativa: 3-5 dias.**

---

### ✅ O que o Medic Bot faz BEM (preservar!)

1. **Proposta clara e focada** — "Transcrição inteligente para prontuários" é uma proposta de valor diferenciada
2. **Integração Telegram** — Nenhum concorrente tem. É o killer feature. Investir mais nisso.
3. **Simplicidade de cadastro** — Do zero ao primeiro paciente em <2 minutos
4. **Empty states bem feitos** — "Nenhum paciente cadastrado" + CTA contextual é UX de qualidade
5. **Design visual base limpo** — Paleta de cores, tipografia e espaçamentos Tailwind são sólidos. A base visual é boa.
6. **Agenda funcional** — Layout diário com slots, legenda de tipos, mini-calendário. Base sólida para evoluir.
7. **WhatsApp no prontuário** — Botão de contato direto com paciente é prático

---

### 🚨 O que precisa mudar URGENTE

| # | Mudança | Por que é urgente |
|---|---------|-------------------|
| 1 | **Navbar unificada** | Qualquer usuário novo vai se perder. É o primeiro "WTF" ao navegar. |
| 2 | **"Esqueci minha senha"** | Sem isso, qualquer usuário que esquecer a senha vai embora para sempre. |
| 3 | **Data em formato BR** | `dd/mm/yyyy` é obrigatório para software brasileiro. `mm/dd/yyyy` causa erros médicos. |
| 4 | **Prontuário com pelo menos templates básicos** | Sem isso, nenhum médico vai usar em produção. É critério de eliminação. |
| 5 | **Menu hamburger mobile** | 60%+ do acesso web no Brasil é mobile. Sistema inacessível = usuários perdidos. |

---

### 🗺️ Posicionamento de Mercado

```
                    Funcionalidades
                         ↑
                         |
           Feegow ●      |
                         |      ● Amplimed
                         |
           Ninsaúde ●    |   ● iClinic
                         |
         Doctoralia ●    |
                         |
                         |
─────────────────────────┼─────────────────────── Simplicidade →
                         |
                         |
                         |     ● MEDIC BOT
                         |       (aqui)
                         |
```

**O Medic Bot está no quadrante: Low-end / Alta Simplicidade**

Isso não é necessariamente ruim. Há espaço no mercado para uma solução **simples, rápida e acessível** — especialmente para:
- Médicos recém-formados em início de carreira
- Consultórios de bairro sem secretária dedicada
- Profissionais que usam Telegram como ferramenta principal

**Mas para competir de verdade, precisa sair do "MVP funcional" para "produto mínimo amável".** Isso significa resolver os 5 urgentes acima, manter a simplicidade, e apostar forte na diferenciação via Telegram + IA de transcrição.

---

### 🔮 Recomendação da Wanda

> **O Medic Bot tem alma.** Ele resolve um problema real de um jeito que ninguém mais resolve — via Telegram. O design base é limpo, o cadastro é rápido, e a proposta é clara.
>
> Mas ele precisa de **disciplina de consistência** (navbar!), **profundidade clínica** (prontuário estruturado), e **respeito ao mobile** (menu hamburger). Essas três coisas transformam um protótipo funcional em um produto que médicos vão querer usar.
>
> O caminho é claro: **não tente competir com Feegow ou Amplimed em quantidade de features**. Compita em **simplicidade, velocidade e integração Telegram/IA**. Seja o "prontuário que você configura em 2 minutos e usa pelo celular".
>
> Sprint 1 (esta semana): Navbar + Esqueci senha + Data BR  
> Sprint 2 (próxima semana): Prontuário com templates + Mobile  
> Sprint 3: Agenda semanal + Confirmação WhatsApp  
>
> Com essas 3 sprints, o Medic Bot sai de 3.5/10 para 6/10 — e começa a competir de verdade.

---

*Relatório elaborado com 🔮 por Wanda — Especialista UX/UI da operação Well*  
*"A verdade bem dita é o melhor presente que um consultor pode dar."*
