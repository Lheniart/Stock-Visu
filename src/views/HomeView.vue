<script setup lang="ts">
  import {ref} from "vue";

  const annualInvestment = ref<number>(0);
  const investmentDuration = ref<number>(0);
  const interestRate = ref<number>(0);

</script>

<template>
  <main>
    <header class="row g-3" id="header-input">
      <div class="col-md-2">
        <label class="form-label" for="investissementInput">Investissement annuel</label>
        <div class="input-group">
          <input id="investissementInput" v-model="annualInvestment" class="form-control" min="0" step="100"
                 type="number">
          <span class="input-group-text">€</span>
        </div>
      </div>
      <div class="col-md-2">
        <label class="form-label" for="durationInput">Durée de l'investissement</label>
        <div class="input-group">
          <input id="durationInput" v-model="investmentDuration" class="form-control" max="60" min="0" step="1"
                 type="number">
          <span class="input-group-text">Année</span>
        </div>
      </div>
      <div class="col-md-2">
        <label class="form-label" for="pourcentageInput">Taux</label>
        <div class="input-group">
          <input id="pourcentageInput" v-model="interestRate" class="form-control"  step="0,1"
                 type="number">
          <span class="input-group-text">%</span>
        </div>
      </div>
    </header>
  </main>
</template>

<style scoped>
 #header-input{
   align-items: center;
   justify-content: center;
   height: 120px;
 }
</style>
