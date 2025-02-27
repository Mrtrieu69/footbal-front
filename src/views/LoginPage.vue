<template>
  <div>
    <div class="mx-auto my-4 text-center auth-top">
      <img alt class="auth-top__logo" src="https://static1.squarespace.com/static/625fcb6e746c786765a8c983/t/63c6a7f30bbaac773eb64aa9/1739389808928/">
    </div>
    <v-card class="mx-auto pa-12" elevation="8" width="460" rounded="lg">
      <v-form ref="form">
        <div class="text-subtitle-1 text-medium-emphasis">Username</div>
        <v-text-field
            @keydown.enter="submit"
            :rules="[v => !!v || 'Поле обязательное']"
            v-model="username"
            density="compact"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            @input="trimSpaces"></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Password</div>
        <v-text-field
            @keydown.enter="submit"
            :rules="[v => !!v || 'Поле обязательное']"
            v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
            density="compact" prepend-inner-icon="mdi-lock-outline" variant="outlined"
            @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-btn @click="submit" :loading="loading" block color="primary" size="large" variant="flat">
          Login
        </v-btn>
        <div v-if="error" class="mt-4">
          <span class="error">{{ error }}</span>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const visible = ref(false)
const username = ref("")
const password = ref("")
const error = ref("")
const form = ref(null)
const loading = ref(false)

const store = useStore()
const router = useRouter()

const trimSpaces = () => {
  username.value = username.value.trim();
}
const submit = async () => {
  error.value = ""
  loading.value = true

  const { valid } = await form.value.validate()

  if(valid){
    store.dispatch("auth/login", {
      username: username.value,
      password: password.value
    }).then(res => {
      if(res){
        location.href = "/"
      }
    }).catch(err => {
      error.value = err
    }).finally(() => {
      loading.value = false
    })
  }
}

</script>

<style scoped lang="scss">
.auth-link:hover{
  text-decoration: underline;
}
.error{
  color: #B00020;
  font-size: 14px;
}
.auth-top{
  max-width: 460px;

  &__logo{
    width: 120px;
  }
}

.recovery {
  a {
    text-decoration: none;
  }

  a:hover {
    color: #d84315;
  }
}
</style>