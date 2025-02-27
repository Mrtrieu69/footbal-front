<template>
  <div class="container">
    <div class="content">
      <app-header />
      <div class="main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="route.fullPath"/>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
  import AppHeader from "./AppHeader.vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
</script>

<style lang="scss">
  .container{
    display: flex;
  }
  .content{
    position: relative;
    flex: 1;
  }
  .main{
    background-color: #f1f4f6;
    padding: 24px;
    min-height: calc(100vh - 60px);
  }
  .push-box{
    min-width: 20%;
    max-width: 60%;
    position: fixed;
    right: 0;
    bottom: 0;
    height: auto;
    transform: translate(-5%, -5%);
    margin: 0 auto;
    font-size: 0.9rem;
  }
  .custom-push-box {
    background-color: #fff !important;
  }
  .custom-push-box-link a {
    text-decoration: underline;
  }
  .custom-push-box-link a:hover {
    text-decoration: none;
  }
  .custom-push-box-icon {
    font-size: 34px !important;
  }
</style>