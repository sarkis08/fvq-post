<template>
  <v-alert
    type="error"
    :value="true"
    transition="scale-transition"
    dismissible
  >
    <p>{{message}}</p>
  </v-alert>
</template>

<script>
export default {
  props: ["message"]
};
</script>