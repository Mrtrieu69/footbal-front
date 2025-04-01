<template>
<!--  <div>-->
<!--    <div class="mx-auto my-4 text-center auth-top">-->
<!--      <img alt class="auth-top__logo" src="https://static1.squarespace.com/static/625fcb6e746c786765a8c983/t/63c6a7f30bbaac773eb64aa9/1739389808928/">-->
<!--    </div>-->
<!--    <v-card class="mx-auto pa-12" elevation="8" width="460" rounded="lg">-->
<!--      <v-form ref="form">-->
<!--        <div class="text-subtitle-1 text-medium-emphasis">Username</div>-->
<!--        <v-text-field-->
<!--            @keydown.enter="submit"-->
<!--            :rules="[v => !!v || 'Поле обязательное']"-->
<!--            v-model="username"-->
<!--            density="compact"-->
<!--            prepend-inner-icon="mdi-email-outline"-->
<!--            variant="outlined"-->
<!--            @input="trimSpaces"></v-text-field>-->
<!--        <div class="text-subtitle-1 text-medium-emphasis">Password</div>-->
<!--        <v-text-field-->
<!--            @keydown.enter="submit"-->
<!--            :rules="[v => !!v || 'Поле обязательное']"-->
<!--            v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"-->
<!--            density="compact" prepend-inner-icon="mdi-lock-outline" variant="outlined"-->
<!--            @click:append-inner="visible = !visible"-->
<!--        ></v-text-field>-->
<!--        <v-btn @click="submit" :loading="loading" block color="primary" size="large" variant="flat">-->
<!--          Login-->
<!--        </v-btn>-->
<!--        <div v-if="error" class="mt-4">-->
<!--          <span class="error">{{ error }}</span>-->
<!--        </div>-->
<!--      </v-form>-->
<!--    </v-card>-->
<!--  </div>-->
  <div class="body">
    <div class="container-wrp">
      <div class="left-side" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div></div>
        <div>
          <h1>FootballAI</h1>
          <p>Create a competitive edge with intelligent football analysis</p>
        </div>
      </div>
      <div class="right-side">
        <div class="flex justify-center">
          <img style="width: 130px" alt="logo" :src="logo"/>
        </div>
        <div>
          <h2 class="text-4xl font-bold mb-3 text-center text-white">Welcome to FootballAI</h2>
          <p class="text-subtitle text-gray-400 mb-8 text-center">Enter your email and password to access your account</p>
          <v-form ref="form">
            <label class="label" for="email">Email</label>
            <input class="form-input mb-6" v-model="username" type="email" id="email" placeholder="Enter your email">
            <label class="label" for="password">Password</label>
            <input class="form-input" v-model="password" type="password" id="password" placeholder="Enter your password">
            <div class="checkbox-container">
              <label>
                <input type="checkbox"> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button @click="submit" type="button">Sign In</button>
          </v-form>
        </div>
        <div class="footer">
          <p>Don't have an account? <a class="sigup" href="#">Sign Up</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import backgroundImage from "@/assets/Burnham Stone.png"
import logo from "@/assets/logo.png"

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
.container-wrp {
  display: flex;
  min-height: 100vh;
  max-width: 1440px;
  margin: auto;
}

.left-side {
  width: 50%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  margin: 8px;
  background-size: cover;
}

.right-side {
  width: 50%;
  padding: 48px 145px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  color: #FFF;
  font-size: 60px;
  font-style: normal;
  font-weight: 400;
  line-height: 72px; /* 100% */
  letter-spacing: -2.88px;
  margin-bottom: 16px;
}

p {
  color: rgba(255, 255, 255, 0.88);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  color: white;
}

.text-subtitle{
  color: #B8B8B8;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 48px;
}

form {
  max-width: 430px;
}

.label {
  display: block;
  color: #FFF;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  background: #272727 !important;
  border: none;
  color: #8E8E8E;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

input::placeholder {
  color: #A0A0A0;
}

.checkbox-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  color: #B8B8B8;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}

.checkbox-container label {
  display: flex;
  align-items: center;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 6px;
}

button {
  width: 100%;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 12px;
  margin-top: 40px;
  cursor: pointer;
  padding: 12px 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
}

button:hover {
  background-color: #f3f3f3;
}

.footer {
  text-align: center;
  margin-top: 20px;
}

.footer p{
  color: #A4A4A4;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.footer p .sigup{
  color: #B4B4B4;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
</style>