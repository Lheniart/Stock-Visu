<script setup lang="ts">
import {computed, ref} from "vue";

const goal = ref<number>(0);
const investmentDuration = ref<number>(1);
const interestRate = ref<number>(0);
const interestRateComparaison = ref<number>(0);

const epargneAnnuelle = ref<number[]>([]);
const epargneAnnuelleComparaison = ref<number[]>([]);

const calculerEpargneAnnuelle = (invest: number, r: number) => {
  const n = investmentDuration.value;
  epargneAnnuelle.value = [];


  for (let i = 1; i <= n; i++) {
    const currentValue = (invest * r * (Math.pow(r, i) - 1)) / (r - 1)
    epargneAnnuelle.value.push(currentValue.toFixed(2));
  }
}
const calculerEpargneAnnuelleComparaison = (invest: number, r: number) => {
  const n = investmentDuration.value;
  epargneAnnuelleComparaison.value = [];


  for (let i = 1; i <= n; i++) {
    const currentValue = (invest * r * (Math.pow(r, i) - 1)) / (r - 1)
    epargneAnnuelleComparaison.value.push(currentValue.toFixed(2));
  }
}


const annualInvestment = computed(() => {
  const r = (interestRate.value / 100) + 1;
  const n = investmentDuration.value;
  const FV = goal.value;

  if (interestRate.value == 0 || goal.value == 0) {
    epargneAnnuelle.value= [];
    epargneAnnuelleComparaison.value = [];
    return 0
  }

  const annualInvest = (FV * (r - 1)) / (r * (Math.pow(r, n) - 1));

  calculerEpargneAnnuelle(annualInvest, r);

  return annualInvest.toFixed(2);
});

const annualInvestmentComparaison = computed(() => {
  const r = (interestRateComparaison.value / 100) + 1;
  const n = investmentDuration.value;
  const FV = goal.value;

  if (interestRateComparaison.value == 0 || goal.value == 0) {
    epargneAnnuelle.value= [];
    epargneAnnuelleComparaison.value = [];
    return 0
  }

  const annualInvest = (FV * (r - 1)) / (r * (Math.pow(r, n) - 1));

  calculerEpargneAnnuelleComparaison(annualInvest, r);

  return annualInvest.toFixed(2);
});


</script>

<template>
  <main>
    <header class="row g-12" id="header-input">
      <div class="col-md-3">
        <label class="form-label" for="investissementInput">Objectifs d'épargne</label>
        <div class="input-group">
          <input id="investissementInput" v-model="goal" class="form-control" min="0" step="100"
                 type="number">
          <span class="input-group-text">€</span>
        </div>
      </div>
      <div class="col-md-3">
        <label class="form-label" for="durationInput">Durée de l'investissement</label>
        <div class="input-group">
          <input id="durationInput" v-model="investmentDuration" class="form-control" max="60" min="1" step="1"
                 type="number">
          <span class="input-group-text">Année</span>
        </div>
      </div>
      <div class="col-md-3">
        <label class="form-label" for="pourcentageInput">Taux</label>
        <div class="input-group">
          <input id="pourcentageInput" v-model="interestRate" class="form-control" step="0.1"
                 type="number">
          <span class="input-group-text">%</span>
        </div>

      </div>
      <div class="col-md-3">
        <label class="form-label" for="pourcentageComparaisonInput">Taux (comparaison) </label>
        <div class="input-group">
          <input id="pourcentageComparaisonInput" v-model="interestRateComparaison" class="form-control" step="0.1"
                 type="number">
          <span class="input-group-text">%</span>
        </div>

      </div>
    </header>
    <article id="graph-wrapper">
      <div class="container mt-4" v-if="annualInvestment">
        <h2>Investissement annuel : {{ annualInvestment }} €</h2>
        <h3>Soit : {{ (annualInvestment / 12).toFixed(2) }} € par mois</h3>
        <h1>Tableau des objectifs d'épargne</h1>
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">Année</th>
            <th scope="col">Epargne</th>
            <th scope="col">Montant total investi</th>
            <th scope="col">Bénéfice annuel</th>
            <th scope="col">Total bénéfice</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(goal, index) in epargneAnnuelle" :key="goal.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ epargneAnnuelle[index] }} €</td>
            <td> {{ ((index + 1) * annualInvestment).toFixed(2) }} €</td>
            <td v-if="epargneAnnuelle[index-1]">
              {{ (epargneAnnuelle[index] - epargneAnnuelle[index - 1] - annualInvestment).toFixed(2) }} €
            </td>
            <td v-else>{{ (epargneAnnuelle[index] - annualInvestment).toFixed(2) }} €</td>
            <td>{{ (epargneAnnuelle[index] - ((index + 1) * annualInvestment)).toFixed(2) }} €</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="container mt-4" v-if="annualInvestment && interestRateComparaison!=0">
        <h2>Investissement annuel : {{ annualInvestmentComparaison }} €</h2>
        <h3>Soit : {{ (annualInvestmentComparaison / 12).toFixed(2) }} € par mois</h3>
        <h1>Tableau des objectifs d'épargne</h1>
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">Année</th>
            <th scope="col">Epargne</th>
            <th scope="col">Montant total investi</th>
            <th scope="col">Bénéfice annuel</th>
            <th scope="col">Total bénéfice</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(goal, index) in epargneAnnuelleComparaison" :key="goal.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ epargneAnnuelleComparaison[index] }} €</td>
            <td> {{ ((index + 1) * annualInvestmentComparaison).toFixed(2) }} €</td>
            <td v-if="epargneAnnuelleComparaison[index-1]">
              {{ (epargneAnnuelleComparaison[index] - epargneAnnuelleComparaison[index - 1] - annualInvestmentComparaison).toFixed(2) }} €
            </td>
            <td v-else>{{ (epargneAnnuelleComparaison[index] - annualInvestmentComparaison).toFixed(2) }} €</td>
            <td>{{ (epargneAnnuelleComparaison[index] - ((index + 1) * annualInvestmentComparaison)).toFixed(2) }} €</td>
          </tr>
          </tbody>
        </table>
      </div>
    </article>
  </main>
</template>

<style scoped>
#header-input {
  align-items: center;
  justify-content: center;
  height: 120px;
  padding: 0px 30px;
}

#graph-wrapper {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  height: calc(100vh - 210px);
  gap: 30px;
  background-color: #D4D3DC;
}
</style>
