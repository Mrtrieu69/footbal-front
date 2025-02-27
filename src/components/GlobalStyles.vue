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
</style>
