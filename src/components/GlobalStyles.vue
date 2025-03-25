<template>
  <slot></slot>
</template>

<script>
export default {
  name: "GlobalStyles"
};
</script>

<style lang="scss">
:root{
  --text-primary: #033c73;
  --color-primary: 3, 60, 115;
  --color-header: linear-gradient(to right, #27394e 70%, #415b76 100%);
}


*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

button,
input{
  outline: none;
  background-color: transparent;
  border: none;
}

ul{
  list-style: none;
}

a[href] {
  color: inherit;
  text-decoration: none;
}

i.v-icon{
  transition: color 0.3s;
}

body {
  b, strong {
    font-weight: 500;
  }

  font-family: "Inter", sans-serif;
  background-color: #080607;
}

.text-xs{
  font-size: 12px;
}

.text-sm{
  font-size: 14px;
}

.text-base{
  font-size: 16px;
}

img{
  max-width: 100%;
  height: auto;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}

div:empty{
  margin: 0 !important;
}

.item-icon-small{
  .v-list-item__prepend{
    max-width: 28px;

    > .v-icon{
      opacity: 1;
    }
  }
}

//Overwrite vuetify
body .v-list-item--density-default.v-list-item--one-line{
  min-height: 32px;
}

button.bg-primary,
.text-primary{
  --v-theme-primary: var(--color-primary)
}

button.bg-primary.danger{
  --v-theme-primary: 216, 16, 28;
}

.color-primary{
  color: rgb(var(--color-primary)) !important;
}

.color-secondary{
  color: rgb(var(--color-secondary)) !important;
}

button.text-primary,
a.text-primary{
  color: rgb(var(--color-primary)) !important;
}

.button-outline{
  display: inline-block;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #E6E7EA;
  box-shadow: 0px 1px 2px 0px rgba(5, 32, 81, 0.05);
  padding: 10px 16px;
  color: #FFF;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  height: 44px;

  &:hover{
    background: rgba(0, 0, 0, 0.15);
  }
}
.button-main{
  display: inline-block;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(5, 32, 81, 0.05);
  padding: 10px 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  border: 1px solid #E6E7EA;
  background: #FFF;
  height: 44px;

  &:hover{
    background: #f3f3f3;
  }

  &.loading{
    pointer-events: none;

    & .icon{
      display: none;
    }

    & .lds-ring{
      display: inline-block;
    }
  }
}

.button-main-text{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.lds-ring {
  /* change color here */
  color: #1c4c5b
}
.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}
.lds-ring {
  display: none;
  position: relative;
  width: 24px;
  height: 24px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 8px;
  border: 2px solid currentColor;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
