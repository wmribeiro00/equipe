# Dashboard de Consumo

MVP de um painel para acompanhar consumo de tokens/créditos com interface em português.

## Como rodar

```bash
cd dashboard-consumo
npm start
```

Abra: `http://localhost:3000`

## Fonte de dados

A API principal é `GET /api/consumo`.

Ela lê a fonte nesta ordem:

1. `DASHBOARD_DATA_URL` — URL externa com JSON
2. `DASHBOARD_DATA_FILE` — arquivo local com JSON
3. `data/consumo.json` — arquivo padrão local
4. fallback interno, se tudo falhar

### API auxiliar

- `GET /api/health` — saúde do serviço
- `GET /api/source` — mostra a origem ativa dos dados
- `GET /api/consumo` — payload principal do painel

### Estrutura esperada

```json
{
  "source": "data/consumo.json",
  "lastUpdated": "2026-04-12T21:24:00.000Z",
  "periodDays": 7,
  "totalBudget": 100000,
  "consumed": 64250,
  "reserved": 4500,
  "thresholds": {
    "warning": 0.7,
    "danger": 0.9
  },
  "daily": [
    { "label": "Seg", "value": 7200 }
  ]
}
```

## Atualização automática

O painel faz refresh a cada 30 segundos e também permite atualização manual pelo botão.

## Próximos passos

- conectar a API real de consumo
- persistir histórico em banco
- publicar em domínio com Caddy/Traefik
- adicionar autenticação se o painel ficar exposto publicamente
