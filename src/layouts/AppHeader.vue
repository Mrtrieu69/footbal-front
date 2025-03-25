<template>
  <header class="header">
    <img style="width: 50px" alt="logo" :src="logo" />
    <div class="header__login" v-if="isAuth">
      <div class="header__login-info">
        <p class="header__login-info-name">Trieu Minh Tam</p>
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
import {computed} from "vue";
import {useRouter} from "vue-router";
import logo from "@/assets/logo.png"

const router = useRouter()

const store = useStore()
const isAuth = computed(() => store.getters["auth/isAuthenticated"])
const user = computed(() => store.getters["auth/user"])

const handleLogout = () => {
  store.dispatch("auth/logout").then(res => {
    if(res){
      router.push({ name: "login" })
    }
  })
}

const items = [
  {
    title: "Account",
    content: [
      {
        icon: "mdi-logout-variant",
        title: 'Logout',
        handleFunc: handleLogout
      },
    ]
  }
]

</script>

<style lang="scss" scoped>
.header{
  padding: 20px 30px;
  height: 80px;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.16);
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
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