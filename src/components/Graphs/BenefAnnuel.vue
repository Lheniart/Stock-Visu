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

function calculBenefAnnuel() {
  const suite = [];
 const epargne = calculEpargne(props.annualInvestment, props.rate, props.investmentDuration);
  let currentValue = epargne[0] - props.annualInvestment;
  suite.push(currentValue);
  for (let i = 1; i <= props.investmentDuration-1; i++) {
    currentValue = epargne[i] - props.annualInvestment - epargne[i-1]
    suite.push(currentValue.toFixed(2));
  }
  return suite
}
function renderChart() {
  const labels = Array.from(
      { length: props.investmentDuration },
      (_, i) => `${i + 1} année${i + 1 > 1 ? "s" : ""}`
  );


  const savings = calculBenefAnnuel();


  new Chart(chartCanvas.value, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bénéfice annuel (en bleu)",
          data: savings,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderWidth: 2,
        }
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
