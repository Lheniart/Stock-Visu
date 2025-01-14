<script setup lang="ts">
import {computed, ref} from "vue";
import BenefTotal from "@/components/Graphs/BenefTotal.vue";
import BenefAnnuel from "@/components/Graphs/BenefAnnuel.vue";

const annualInvestment = ref<number>(0);
const investmentDuration = ref<number>(0);
const interestRate = ref<number>(0);

const componentKey = computed(() => `${annualInvestment.value}-${investmentDuration.value}-${interestRate.value}`);


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
          <input id="pourcentageInput" v-model="interestRate" class="form-control" step="0,1"
                 type="number">
          <span class="input-group-text">%</span>
        </div>
      </div>
    </header>
    <article id="graph-wrapper">
      <div id="graphEpargne">
        <BenefTotal
            v-if="interestRate!=0 && investmentDuration != 0 && annualInvestment!= 0"
            :key="componentKey"
            :annualInvestment="annualInvestment"
            :investmentDuration="investmentDuration"
            :rate="interestRate"/>
      </div>
      <div id="graphEpargne">
        <benef-annuel
            v-if="interestRate!=0 && investmentDuration != 0 && annualInvestment!= 0"
            :key="componentKey"
            :annualInvestment="annualInvestment"
            :investmentDuration="investmentDuration"
            :rate="interestRate"/>
      </div>
    </article>
  </main>
</template>

<style scoped>
#header-input {
  align-items: center;
  justify-content: center;
  height: 120px;
}

#graph-wrapper {
  width: 100%;
  display: flex;
   align-items: center;
  justify-content: center;
  height: calc(100vh - 210px);
  gap: 30px;
  background-color: #D4D3DC;
  #graphEpargne{
    width: 40%;
  }
}
</style>
