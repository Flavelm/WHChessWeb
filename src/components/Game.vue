<template>
  <div class="w-full flex justify-center flex-wrap">
    <GameTable :user-id="this.userId" :room-name="this.roomName" :rotate="this.rotateTable" />
    <GameInfo :user-id="this.userId" :room-name="this.roomName"></GameInfo>
  </div>
</template>

<script>
import GameTable from "@/components/GameTable.vue";
import GameInfo from "@/components/GameInfo.vue";

export default {
  name: "GamePage",
  components: {GameInfo, GameTable},
  data() {
    return {
      userId: -2,
      rotateTable: false,
      roomName: null
    }
  },
  created() {
    this.userId = window.localStorage.getItem('id');
    this.roomName = this.$route.params.roomName;
    //console.log(this.$route.params.roomName)
  }
}
</script>

<style scoped>

</style>