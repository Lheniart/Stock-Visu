<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  name: "InvestmentChart",
  props: {
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
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const labels = Array.from(
          { length: this.investmentDuration },
          (_, i) => i + 1
      );

      const totalInvested = labels.map(
          (year) => year * this.annualInvestment
      );

      const savings = labels.map((year) =>
          this.calculateCompoundInterest(
              this.annualInvestment,
              this.rate / 100,
              year
          )
      );

      new Chart(this.$refs.chartCanvas, {
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
    },
    calculateCompoundInterest(principal, rate, years) {
      let total = 0;
      for (let i = 1; i <= years; i++) {
        total += principal * Math.pow(1 + rate, years - i);
      }
      return total;
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
