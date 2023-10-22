<template>
  <div class="h-full w-full">
    <div class="bg-secondary w-full">
      <v-tabs
          v-model="tab"
          color="primary"
          align-tabs="center"
      >
        <v-tab value="1" v-on:click="() => console.log(tab)">Список комнат</v-tab>
        <v-tab value="2" v-on:click="() => console.log(tab)">Создать комнату</v-tab>
      </v-tabs>
    </div>
    <div class="w-full flex justify-center">
      <v-window v-model="tab" class="w-full">
        <v-window-item value="1" class="w-full flex justify-center" :eager="false">
          <RoomList />
        </v-window-item>

        <v-window-item value="2" class="w-full flex justify-center" :eager="false">
          <RoomCreate :userId="userId" />
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import RoomList from "@/components/RoomList.vue";
import RoomCreate from "@/components/RoomCreate.vue"

export default {
  name: "MainMenu",
  components: {RoomList, RoomCreate},
  data() {
    return {
      userId: window.localStorage.getItem("id"),
      tab: null
    }
  },
  methods: {
    update() {
    }
  },
  created() {
    if (this.userId === null) {
      this.$router.replace({path: "/"});
    }
  }
}
</script>
