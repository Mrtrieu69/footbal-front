<template>
  <div class="container">
    <app-sidebar />
    <div class="content">
      <app-header />
      <div class="main">
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.fullPath"/>
          </keep-alive>
        </router-view>
      </div>
    </div>
    <div v-if="pushes.length" class="push-box">
      <v-alert
          v-for="(push, index) in pushes"
          :key="index"
          border="start"
          color="light-blue-darken-4"
          class="custom-push-box mb-1"
          closable
          :title="push.title"
          variant="outlined"
          prominent
      >
        <template v-slot:prepend>
          <div>
            <v-icon class="custom-push-box-icon">{{ pushBoxIcon(push.type) }}</v-icon>
          </div>
        </template>
        <template v-slot:text>
          <div class="custom-push-box-link">
            <span v-html="push.text"></span>
          </div>
        </template>
      </v-alert>
    </div>
  </div>
</template>

<script setup>
  import AppHeader from "./AppHeader.vue";
  import AppSidebar from "./AppSidebar.vue";
  import { useRoute } from "vue-router";
  import {onMounted, onUnmounted, ref} from "vue";
  import {pushList} from "@/services/users/userNotificationService.js";

  const route = useRoute();
  const pushes = ref([]);
  const timer = ref(null)

  const pushBoxIcon = (type) => {
    switch (type){
      case "message":
        return "mdi-message";
      case "package":
        return "mdi-bell";
      case "petition":
        return "mdi-file-sign";
    }
  }

  // Cached all list for table
  const cachedViews = [
      "UserList",
      "ClientList",
      "RoleList",
      "RegisterMemberList",
      "ActionRoleList",
      "PackageList",
      "ReactLevelsList",
      "PetitionList",
      "PackageView",
      "Message",
      "MokodoPage",
      "StatementList",
      "ReportPage",
      "Settings",
      "MapMemberActiveDistrict",
      "MapMemberActiveSubject",
      "MapMemberRegistrationDistrict",
      "MapMemberRegistrationSubject",
      "MapHttpRequestRegions",
      "GraphicPackageMember",
      "GraphicPackageRequest",
      "GraphicRegisterDynamicSro",
      "GraphicRegisterMember",
      "GraphicHttpPeriod",
      "RequestListPage"
  ]

  onMounted(() => {
    pushList().then(res => {
      pushes.value = res.pushes;
    })

    timer.value = setInterval(() => {
      pushList().then(res => {
        pushes.value = res.pushes;
      })
    }, 60000);
  })

  onUnmounted(() => {
    if(timer.value){
      clearInterval(timer.value)
    }
  })
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