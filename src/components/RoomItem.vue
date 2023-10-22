<template>
  <div class="w-full max-w-screen-xl mx-2 mt-2">
    <v-card
        class="mx-auto"
        width="400"
        color="secondary"
    >
      <template v-slot:title>
        {{room["Name"]}}
      </template>

      <v-card-text>
        Игроки: {{players()}}
        <br/>
        Режимы: {{modes()}}
      </v-card-text>
      <v-btn
          v-on:click="join()"
          :loading="loading"
          type="submit"
          class="m-2"
          text="Войти"
          color="primary"
          :disabled="disabled"
          >
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RoomItem",
  props: ["item"],
  data(){
    return {
      room: this.item,
      loading: false,
      disabled: false
    }
  },
  methods: {
    players() {
      let text = "";
      this.room["Players"].forEach((e) => {
        text += `${e} `;
      });
      return text;
    },
    modes() {
      let text = "";
      const mode = this.room["mode"];
      for (const key in mode) {
        if (mode[key] === 1){
          text += `${key} `
        }
      }
      return text;
    },
    join() {
      this.loading = true;
      if (this.room["Players"].length === this.room["MaxPlayers"]) {
        this.loading = false;
        this.disabled = true;
      }
      this.$router.replace({path: `game/${this.room["Name"]}`})
    }
  },
  created() {
    if (this.room["Players"].length === this.room["MaxPlayers"]) {
      this.disabled = true;
    }
  }
}
</script>
