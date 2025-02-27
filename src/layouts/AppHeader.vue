<template>
  <header class="header">
    <div class="header__notification">
      <router-link v-if="notification.statement" to="/statements" :class="{'header__notification-baget': !!statementCnt}" title="Выписки" :data-count="statementCnt">
        <v-icon icon="mdi-notebook"></v-icon>
      </router-link>
      <router-link v-if="notification.package" to="/package" :class="{'header__notification-baget': !!packageCnt}" title="Пакеты об изменениях" :data-count="packageCnt">
        <v-icon icon="mdi-bell"></v-icon>
      </router-link>
      <router-link v-if="notification.message" to="/messages" :class="{'header__notification-baget': !!messageCnt}" title="Сообщения" :data-count="messageCnt">
        <v-icon icon="mdi-message"></v-icon>
      </router-link>
      <router-link v-if="notification.petition" to="/petition/list" :class="{'header__notification-baget': !!petitionCnt}" title="Обращения" :data-count="petitionCnt">
        <v-icon icon="mdi-file-sign"></v-icon>
      </router-link>
    </div>
    <div class="header__login" v-if="isAuth">
      <div class="header__login-info">
        <p class="header__login-info-name">{{ user.fio }}</p>
        <v-tooltip :text="user.userRole.description" location="bottom">
          <template v-slot:activator="{ props }" >
            <p v-bind="props" class="header__login-info-type">{{ user.userRole.title }}</p>
          </template>
        </v-tooltip>
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-account" size="small" v-bind="props"></v-btn>
        </template>

        <v-list min-width="200px">
          <div v-for="(item, index) in items" :key="index" >
            <p class="header-menu-title">{{ item.title }}</p>
            <v-list-item
                v-for="(child, id) in item.content"
                :key="id"
                @click="child.handleFunc"
                class="item-icon-small header-menu-item"
            >
              <template v-slot:prepend>
                <v-icon size="small" :icon="child.icon"></v-icon>
              </template>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </div>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
import {notificationList} from "@/services/statistic/notificationService.js";

const router = useRouter()

const store = useStore()
const isAuth = computed(() => store.getters["auth/isAuthenticated"])
const user = computed(() => store.getters["auth/user"])

const notification = ref({})
const timer = ref(null)

const statementCnt = computed(() => notification.value.statement?.cntSigGeneratedForUser)
const messageCnt = computed(() => notification.value.message?.cntUnreadForUser)
const packageCnt = computed(() => notification.value.package?.cntModerationRequestForUser)
const petitionCnt = computed(() => notification.value.petition?.cntModeratedForUser)

const handleLogout = () => {
  store.dispatch("auth/logout").then(res => {
    if(res){
      router.push({ name: "login" })
    }
  })
}

const handleRedirect = (path, id) => {
  router.push({
    name: path,
    params: {
      id: id
    }
  })
}

const items = [
  {
    title: "Аккаунт",
    content: [
      {
        icon: "mdi-badge-account-horizontal-outline",
        title: 'Профиль',
        handleFunc: () => handleRedirect("profile", user.value.id)
      },
      {
        icon: "mdi-history",
        title: 'История',
        handleFunc: () => handleRedirect("history")
      },
      {
        icon: "mdi-cog",
        title: 'Настройки',
        handleFunc: () => handleRedirect("settings")
      },
      {
        icon: "mdi-logout-variant",
        title: 'Выйти',
        handleFunc: handleLogout
      },
    ]
  }
]

onMounted(() => {
  notificationList().then(res => {
    notification.value = res
  })

  timer.value = setInterval(() => {
    notificationList().then(res => {
      notification.value = res
    })
  }, 60000)
})

onUnmounted(() => {
  if(timer.value){
    clearInterval(timer.value)
  }
})

</script>

<style lang="scss" scoped>
.header{
  padding: 0 24px;
  height: 60px;
  background-image: var(--color-header);
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  gap: 20px;
}
.header-menu-title{
  padding: 0 16px;
  font-weight: 500;
  color: var(--text-secondary);
}
.header-menu-item{
  color: rgb(var(--color-primary)) !important;
}

.header__login{
  display: flex;
  align-items: center;
  column-gap: 10px;

  &-info{
    display: flex;
    flex-direction: column;
    color: white;
    align-items: end;
    user-select: none;

    &-type{
      font-size: 14px;
      opacity: 0.6;
    }
  }
}

.header__notification{
  color: white;
  display: flex;
  gap: 20px;

  &-baget{
    position: relative;

    &::before{
      content: attr(data-count);
      position: absolute;
      top: 0;
      right: 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 18px;
      height: 17px;
      background-color: #FF5722;
      color: white;
      font-size: 12px;
      transform: translate(50%, -50%);
      z-index: 99;
    }
  }
}
</style>