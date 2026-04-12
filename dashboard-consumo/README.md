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

Por padrão, ela lê:

- `data/consumo.json`
- ou o caminho definido em `DASHBOARD_DATA_FILE`

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

### Atualização automática

O painel faz refresh a cada 30 segundos e também permite atualização manual pelo botão.

## Próximos passos

- conectar uma API real de consumo
- persistir histórico em banco
- publicar em um host contínuo com Caddy/Traefik
- adicionar autenticação se o painel ficar exposto publicamente
