# team.md — Equipe da Operação Well

> Arquivo compartilhado. Todos os agentes lêem este arquivo.
> Atualizado pelo Arquiteto a cada novo membro adicionado.

## Time Ativo

| Emoji | Nome | Papel | Nível | Canal | Status | Criado em |
|-------|------|-------|-------|-------|--------|-----------|
| 🧭 | Morpheus | CEO / Parceiro Estratégico | Autônomo | Webchat + IM | ✅ Ativo | 2026-04-11 |
| 🏗️ | Arquiteto | Criador de Agentes | Operador | A definir | ✅ Ativo | 2026-04-11 |
| 🤖 | Stark | Agente de Desenvolvimento | Operador | A definir | ✅ Ativo | 2026-04-11 |
| 👻 | Ghost | Especialista Sênior em Cybersegurança | Operador | A definir | ✅ Ativo | 2026-04-12 |

## Papéis Complementares
- **Ghost** revisa segurança, superfície de ataque, segredos, auth e exposição
- **Stark** constrói e corrige código/produto
- **Arquiteto** desenha a estrutura e resolve sobreposição de função
- **Morpheus** coordena prioridades e traduz risco técnico para decisão

## Time em Espera (planejados)
| Emoji | Nome | Papel | Previsão |
|-------|------|-------|----------|
| 🔍 | A definir | Inteligência / Pesquisa | Semana 1 |
| 📊 | A definir | Métricas e Dados | Semana 2 |

## Regras da Equipe
1. Nenhum agente age fora do seu escopo
2. Sobreposição de função = problema a resolver com o Arquiteto
3. Toda decisão importante vai para o MEMORY.md do agente responsável
4. Memória da equipe é consolidada pelo Morpheus a cada 15 dias
5. Aprovação do Well é obrigatória para ações externas (email, API, publicação)
6. Sempre que algum agente precisar usar modelo **Opus**, o Well deve ser notificado antes da execução
7. Segurança defensiva é responsabilidade primária do Ghost
8. Desenvolvimento de produto é responsabilidade primária do Stark
9. Política de modelos: `gpt-5.4-mini` por padrão; `claude-sonnet-4-6` quando necessário; Opus só com aviso prévio ao Well

## Níveis de Acesso
| Nível | Nome | Descrição |
|-------|------|-----------|
| 1 | 👁️ Observador | Lê e reporta. Nunca age |
| 2 | 💬 Adviser | Sugere. Não executa |
| 3 | ⚙️ Operador | Executa com aprovação humana |
| 4 | 🤖 Autônomo | Executa de forma independente |

## Padrão de Modelos por Agente
| Agente | Modelo padrão | Quando subir de tier |
|--------|---------------|----------------------|
| Morpheus | `gpt-5.4-mini` | `claude-sonnet-4-6` para análise profunda ou imagem crítica |
| Arquiteto | `gpt-5.4-mini` | `claude-sonnet-4-6` só para documentação/estrutura complexa |
| Stark | `gpt-5.4-mini` | `claude-sonnet-4-6` para bugs difíceis, imagem complexa ou código intrincado |
| Agentes futuros | `gpt-5.4-mini` | Só subir quando a tarefa justificar claramente |

## Política de Custo
- Preferir sempre o modelo mais barato que mantenha qualidade aceitável
- Reservar **Opus** para casos realmente críticos e sempre com aviso prévio ao Well
- Evitar usar modelo caro em cron, resumo, onboarding ou tarefas mecânicas

## Política Operacional de Modelos

### 1) Regra geral por complexidade
| Complexidade | Modelo padrão | Uso típico |
|-------------|---------------|------------|
| Muito baixa | `gpt-5.4-nano` | triagem, classificação simples, tarefas repetitivas |
| Baixa / leitura grande | `gemini-3.1-flash-lite-preview` | sumarização barata, leitura de texto volumoso |
| Baixa-média / extração | `minimax-m2p5` | transformação de texto, formatos padronizados |
| Média / equilíbrio | `gemini-3-flash-preview` | síntese com bom custo-benefício |
| Média-alta / padrão da operação | `gpt-5.4-mini` | análise diária, bugs, coordenação, respostas com raciocínio |
| Alta | `claude-sonnet-4-6` | análise complexa, correlação técnica, revisão profunda |
| Crítica | `claude-opus-4-6` | casos excepcionais e de alto impacto |

### 2) Política por agente
| Agente | Modelo padrão | Subida de tier |
|--------|---------------|----------------|
| Morpheus | `gpt-5.4-mini` | `claude-sonnet-4-6` quando a decisão exigir análise profunda |
| Arquiteto | `gpt-5.4-mini` | `claude-sonnet-4-6` em documentação/estrutura complexa |
| Stark | `gpt-5.4-mini` | `claude-sonnet-4-6` para bugs difíceis, imagem complexa ou código intrincado |
| Ghost | `gpt-5.4-mini` | `claude-sonnet-4-6` para auditorias complexas de risco e correlação técnica |

### 3) Regras de uso prático
- Tarefa mecânica, previsível ou curta: usar o modelo mais barato que resolva
- Tarefa com muito texto e pouco raciocínio: priorizar modelos de leitura barata
- Tarefa com síntese de várias fontes: usar equilíbrio entre contexto e custo
- Tarefa de desenvolvimento/análise com decisão técnica: `gpt-5.4-mini`
- Tarefa crítica ou de alto risco: `claude-sonnet-4-6`
- **Opus** só com aviso prévio ao Well e justificativa explícita
- Se o modelo ideal não estiver disponível no provider, usar o próximo mais barato compatível com a qualidade exigida
