<template>
  <div class="container">
    <div class="content">
      <app-header />
      <div class="main">
        <div class="bg-opacity"></div>
        <div class="position-relative">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
          </router-view>
        </div>
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
    padding: 24px;
    min-height: calc(100vh - 60px);
    background: url("https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    no-repeat center center fixed;
    background-size: cover;
    position: relative;
  }
  .bg-opacity{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); /* Lớp phủ tối để nổi bật nội dung */
    z-index: 0;
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