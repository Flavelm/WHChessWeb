<template>
   <v-form @submit.prevent="submit" class="w-2/3 bg-secondary rounded mt-2 max-w-xl">
    <v-text-field 
          variant="outlined"
          label="Room name" 
          v-model="roomName"
          class="m-2"
          color="primary">
      </v-text-field>
      <v-combobox
          label="Античит"
          v-model="modeFree"
          :items="['Включить', 'Выключить']"
          variant="outlined"
          class="m-2"
          color="primary"
      ></v-combobox>
      <v-combobox
        v-model="modeRandom"
        label="Случайная расстановка"
        :items="['Включить', 'Выключить']"
        variant="outlined"
        class="m-2"
        color="primary"
      ></v-combobox>
      <v-combobox
        v-model="modeFog"
        label="Туман"
        :items="['Включить', 'Выключить']"
        variant="outlined"
        class="m-2"
        color="primary"
      ></v-combobox>

    <v-btn
        :loading="loading"
        type="submit"
        class="m-2"
        text="Создать"
        color="primary"
    ></v-btn>
  </v-form>
  <v-snackbar
      v-model="snackbar"
      color="primary"
  >
    {{ text }}

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
import requests from "@/requests"

export default {
  name: "RoomCreate",
  components: {},
  props: {
    userId: String
  },
  data() {
    return {
      loading: false,
      roomName: "",
      modeFree: "Включить",
      modeRandom: "Включить",
      modeFog: "Включить",
      snackbar: false,
      text: "null"
    }
  },
  methods: {
    async submit() {
      requests.create(this.userId, this.roomName,
          this.modeFree === "Выключить",
           this.modeRandom === "Включить",
              this.modeFog === "Включить")
          .then((json) => {
        if (json["Create"] === 0) {
          this.text = `Ошибка "${json["description"]}"`;
        } else {
          this.text = "Комната создана";
        }
        this.snackbar = true;
        this.$router.replace({path: `/game/${this.roomName}`})
      }).catch((reason) => {
        this.text = `Ошибка сети ${reason.toString()}`
        this.snackbar = true;
      }).finally(() => {
        setTimeout(() => {
          this.snackbar = false;
        }, 1500);
      });
    }
  },
  updated() {
    console.log(this.modes);
  }
}
</script>
