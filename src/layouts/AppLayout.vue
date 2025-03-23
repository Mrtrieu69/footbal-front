<template>
  <div class="container-wrp">
    <div class="content">
      <div class="bg-top"></div>
      <div class="bg-bottom"></div>
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
  .container-wrp{
    display: flex;
    overflow: hidden;
  }
  .content{
    position: relative;
    width: 1224px;
    margin: auto;
  }
  .main{
    margin-top: 24px;
    margin-bottom: 24px;
    min-height: calc(100vh - 152px);
    border-radius: 36px;
    background: rgba(255, 255, 255, 0.16);
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

  .bg-top{
    position: absolute;
    top: 0;
    left: 0;
    width: 1024px;
    height: 1024px;
    border-radius: 2048px;
    background: #146C60;
    filter: blur(500px);
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .bg-bottom{
    position: absolute;
    right: 200px;
    bottom: -300px;
    width: 1024px;
    height: 1024px;
    border-radius: 2048px;
    background: #DD9C79;
    filter: blur(500px);
    transform: translate(50%, 50%);
    z-index: -1;
  }
</style>