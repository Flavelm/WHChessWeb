<template>
  <div>
    <div class="mt-2 bg-secondary flex justify-center">
      <v-btn
          :loading="btnLoading"
          v-on:click="update"
          text="Обновить"
          color="primary"
          class="m-2"
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
  beforeCreate() {
    const id = window.localStorage.getItem("id");
    if (id === null) {
      this.$router.replace({path: "/"});
    }
  },
  created() {
    this.update();
  }
}
</script>
