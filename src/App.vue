<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/estimation">Estimation</router-link>
    <router-link to="/goal">Objectifs</router-link>
  </nav>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: DM Sans, Avenir, Helvetica, Arial, sans-serif;
}

html {
  background-color: #D9D9D9;
}
nav {
  padding: 0 30px;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 50px;
  background-color: #384454;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  a{
    color: #D4D3DC;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    &.router-link-exact-active {
      border-bottom: solid 5px #317AC1;
      border-radius: 0px 0 5px 5px;
    }
  }
}
</style>
