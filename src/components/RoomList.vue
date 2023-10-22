<template>
  <div>
    <div class="w-full max-w-screen-xl mt-2 bg-secondary">
      <v-btn
          :loading="btnLoading"
          v-on:click="update"
          text="Обновить"
          color="primary"
      ></v-btn>
    </div>
    <RoomItem v-for="room in rooms" v-bind:key="room['Name']" :item="room"/>
  </div>
  <v-snackbar
      v-model="snackbar"
  >
    {{ snackbarText }}

    <template v-slot:actions>
      <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import RoomItem from "@/components/RoomItem.vue"
import requests from "@/requests"

export default {
  name: "RoomList",
  components: {
    RoomItem
  },
  data() {
    return {
      rooms: [],
      snackbar: false,
      snackbarText: null,
      btnLoading: false
    }
  },
  methods: {
    update() {
      this.btnLoading = true;
      requests.rooms().then((json) => {
        this.rooms = json["Rooms"];
      }).catch(() => {
        this.snackbarText = "Не удалось обновить"
        this.snackbar = true;
      }).finally(() => {
        setTimeout(() => {
          this.snackbar = false;
        }, 1500);
        this.btnLoading = false;
      });
    }
  },
  created() {
    this.update();
  }
}
</script>
