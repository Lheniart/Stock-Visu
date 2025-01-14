<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

const props = defineProps({
  annualInvestment: {
    type: Number,
    required: true,
  },
  investmentDuration: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const chartCanvas = ref(null);

function calculEpargne(investissementAnnuel, taux, n) {
  n = n - 1
  const tauxDecimal = taux / 100;
  const suite = [];

  let currentValue = investissementAnnuel * (tauxDecimal + 1);
  suite.push(currentValue);

  for (let i = 1; i <= n; i++) {
    currentValue = (currentValue + investissementAnnuel) * (tauxDecimal + 1);
    suite.push(currentValue.toFixed(2));
  }
  return suite;
}
function calculTotalInvesti(investissementAnnuel, n) {

  const suite = [];
  for (let i = 1; i <= n; i++) {
    let investissement = i* investissementAnnuel
    suite.push(investissement.toFixed(2));
  }
  return suite;
}

function renderChart() {
  const labels = Array.from({ length: props.investmentDuration }, (_, i) => i + 1);

  const totalInvested = calculTotalInvesti(props.annualInvestment, props.investmentDuration);

  const savings = calculEpargne(props.annualInvestment, props.rate, props.investmentDuration)

  new Chart(chartCanvas.value, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Épargne (en bleu)",
          data: savings,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderWidth: 2,
        },
        {
          label: "Total investi (en rouge)",
          data: totalInvested,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Montant (€)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Années",
          },
        },
      },
    },
  });
}

onMounted(() => {
  renderChart();
});
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
