<template>
  <div class="h-full w-full justify-center flex">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tabs: "auth"
    }
  }
}
</script>