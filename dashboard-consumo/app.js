const fallbackData = {
  source: 'demo-local',
  lastUpdated: new Date().toISOString(),
  periodDays: 7,
  totalBudget: 100000,
  consumed: 64250,
  reserved: 4500,
  thresholds: {
    warning: 0.7,
    danger: 0.9,
  },
  daily: [
    { label: 'Seg', value: 7200 },
    { label: 'Ter', value: 8400 },
    { label: 'Qua', value: 10900 },
    { label: 'Qui', value: 8700 },
    { label: 'Sex', value: 11300 },
    { label: 'Sáb', value: 5900 },
    { label: 'Dom', value: 1850 },
  ],
};

const demoData = {
  source: 'demo-visual',
  lastUpdated: new Date().toISOString(),
  periodDays: 7,
  totalBudget: 120000,
  consumed: 91500,
  reserved: 8800,
  thresholds: {
    warning: 0.75,
    danger: 0.92,
  },
  daily: [
    { label: 'Seg', value: 9400 },
    { label: 'Ter', value: 12100 },
    { label: 'Qua', value: 10150 },
    { label: 'Qui', value: 13800 },
    { label: 'Sex', value: 17550 },
    { label: 'Sáb', value: 12700 },
    { label: 'Dom', value: 5800 },
  ],
};

const state = {
  demo: false,
  polling: null,
};

const nf = new Intl.NumberFormat('pt-BR');
const pf = new Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 1 });

const els = {
  statusPill: document.getElementById('statusPill'),
  updatedAt: document.getElementById('updatedAt'),
  totalConsumido: document.getElementById('totalConsumido'),
  totalConsumidoMeta: document.getElementById('totalConsumidoMeta'),
  saldoRestante: document.getElementById('saldoRestante'),
  saldoRestanteMeta: document.getElementById('saldoRestanteMeta'),
  consumoDia: document.getElementById('consumoDia'),
  consumoDiaMeta: document.getElementById('consumoDiaMeta'),
  consumoSemana: document.getElementById('consumoSemana'),
  consumoSemanaMeta: document.getElementById('consumoSemanaMeta'),
  dailyChart: document.getElementById('dailyChart'),
  alertsList: document.getElementById('alertsList'),
  budgetPercent: document.getElementById('budgetPercent'),
  budgetSummary: document.getElementById('budgetSummary'),
  budgetDetails: document.getElementById('budgetDetails'),
  periodoLabel: document.getElementById('periodoLabel'),
  thresholdLabel: document.getElementById('thresholdLabel'),
  refreshBtn: document.getElementById('refreshBtn'),
  toggleDemoBtn: document.getElementById('toggleDemoBtn'),
};

function toCurrencyLike(value) {
  return nf.format(Math.round(value));
}

function getTotalWeekly(data) {
  return data.daily.reduce((sum, item) => sum + item.value, 0);
}

function mergeData(payload) {
  if (!payload || typeof payload !== 'object') return fallbackData;
  return {
    ...fallbackData,
    ...payload,
    thresholds: {
      ...fallbackData.thresholds,
      ...(payload.thresholds || {}),
    },
    daily: Array.isArray(payload.daily) && payload.daily.length ? payload.daily : fallbackData.daily,
  };
}

function buildAlerts(data, percentUsed, daily, weekly) {
  const alerts = [];
  const warning = data.thresholds.warning ?? 0.7;
  const danger = data.thresholds.danger ?? 0.9;

  if (percentUsed >= danger) {
    alerts.push({
      type: 'danger',
      title: 'Limite crítico atingido',
      body: `Você já consumiu ${pf.format(percentUsed)} do orçamento disponível. É hora de segurar a aceleração e revisar tarefas mais pesadas.`,
    });
  } else if (percentUsed >= warning) {
    alerts.push({
      type: 'warn',
      title: 'Uso elevado',
      body: `O consumo já passou de ${pf.format(warning)} do orçamento. Acompanhe de perto para evitar surpresa no fechamento.`,
    });
  } else {
    alerts.push({
      type: 'ok',
      title: 'Ritmo saudável',
      body: 'O consumo está dentro da faixa planejada e há margem para operar com conforto.',
    });
  }

  const avgDaily = weekly / Math.max(data.periodDays || data.daily.length, 1);
  alerts.push({
    type: 'ok',
    title: 'Tendência média diária',
    body: `Média de ${toCurrencyLike(avgDaily)} por dia no período atual. Use isso para prever o saldo até o próximo corte.`,
  });

  if (daily > avgDaily * 1.4) {
    alerts.push({
      type: 'warn',
      title: 'Pico no dia de hoje',
      body: 'O consumo do dia está acima da média recente. Vale verificar o que disparou o pico.',
    });
  }

  return alerts;
}

function renderBars(data) {
  const max = Math.max(...data.daily.map((d) => d.value), 1);
  els.dailyChart.innerHTML = data.daily
    .map((item) => {
      const height = Math.max((item.value / max) * 100, 10);
      return `
        <div class="bar-wrap">
          <div class="bar daily" style="height:${height}%;"></div>
          <span class="bar-value">${toCurrencyLike(item.value)}</span>
          <span class="bar-label">${item.label}</span>
        </div>
      `;
    })
    .join('');
}

function renderAlerts(alerts) {
  els.alertsList.innerHTML = alerts
    .map(
      (alert) => `
      <div class="alert-item ${alert.type}">
        <strong>${alert.title}</strong>
        <p>${alert.body}</p>
      </div>
    `,
    )
    .join('');
}

function render(data) {
  const totalUsed = data.consumed + (data.reserved || 0);
  const totalRemaining = Math.max(data.totalBudget - totalUsed, 0);
  const percentUsed = data.totalBudget > 0 ? totalUsed / data.totalBudget : 0;
  const weeklyTotal = getTotalWeekly(data);
  const today = data.daily.at(-1)?.value ?? 0;
  const dailyAverage = weeklyTotal / Math.max(data.daily.length, 1);
  const alerts = buildAlerts(data, percentUsed, today, weeklyTotal);

  const arc = Math.min(percentUsed, 1) * 360;
  document.documentElement.style.setProperty(
    '--budget-gradient',
    `conic-gradient(var(--accent) ${arc}deg, rgba(255,255,255,0.08) ${arc}deg)`,
  );
  const ring = document.querySelector('.budget-ring');
  if (ring) ring.style.background = `conic-gradient(var(--accent) ${arc}deg, rgba(255,255,255,0.08) ${arc}deg)`;

  els.statusPill.textContent = data.source === 'demo-visual' ? 'Modo demo visual' : 'Atualização ativa';
  els.updatedAt.textContent = `Última atualização: ${new Date(data.lastUpdated).toLocaleString('pt-BR')}`;

  els.totalConsumido.textContent = `${toCurrencyLike(totalUsed)}`;
  els.totalConsumidoMeta.textContent = `${toCurrencyLike(data.consumed)} consumidos + ${toCurrencyLike(data.reserved || 0)} reservados`;

  els.saldoRestante.textContent = `${toCurrencyLike(totalRemaining)}`;
  els.saldoRestanteMeta.textContent = `${pf.format(percentUsed)} do orçamento utilizado`;

  els.consumoDia.textContent = `${toCurrencyLike(today)}`;
  els.consumoDiaMeta.textContent = `Média diária atual: ${toCurrencyLike(dailyAverage)}`;

  els.consumoSemana.textContent = `${toCurrencyLike(weeklyTotal)}`;
  els.consumoSemanaMeta.textContent = `Período de ${data.periodDays || data.daily.length} dias`;

  els.budgetPercent.textContent = `${Math.round(percentUsed * 100)}%`;
  els.budgetSummary.textContent = `Orçamento de ${toCurrencyLike(data.totalBudget)} unidades, com ${toCurrencyLike(totalRemaining)} ainda disponíveis.`;
  els.budgetDetails.innerHTML = [
    `<li>Orçamento total: ${toCurrencyLike(data.totalBudget)}</li>`,
    `<li>Consumido (incluindo reserva): ${toCurrencyLike(totalUsed)}</li>`,
    `<li>Meta de warning: ${Math.round((data.thresholds.warning ?? 0.7) * 100)}%</li>`,
    `<li>Meta de danger: ${Math.round((data.thresholds.danger ?? 0.9) * 100)}%</li>`,
  ].join('');

  els.periodoLabel.textContent = `Período: últimos ${data.periodDays || data.daily.length} dias`;
  els.thresholdLabel.textContent = `Limites: ${Math.round((data.thresholds.warning ?? 0.7) * 100)}% / ${Math.round((data.thresholds.danger ?? 0.9) * 100)}%`;

  renderBars(data);
  renderAlerts(alerts);
}

async function loadData() {
  const endpoint = state.demo ? null : '/api/consumo';
  try {
    if (endpoint) {
      const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`API respondeu ${response.status}`);
      const json = await response.json();
      render(mergeData(json));
      return;
    }
    render(demoData);
  } catch (error) {
    console.warn('Falha ao carregar fonte principal:', error);
    render(state.demo ? demoData : fallbackData);
    els.statusPill.textContent = state.demo ? 'Modo demo visual' : 'Fallback local ativo';
  }
}

els.refreshBtn.addEventListener('click', () => loadData());
els.toggleDemoBtn.addEventListener('click', () => {
  state.demo = !state.demo;
  els.toggleDemoBtn.textContent = state.demo ? 'Voltar para API' : 'Ver dados demo';
  loadData();
});

loadData();
state.polling = setInterval(loadData, 30000);
