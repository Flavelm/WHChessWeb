<template>
  <div class="m-2">
    <v-card
        class="mx-auto"
        width="500"
        height="500"
        color="secondary"
    >
      <template v-slot:title>
        Игра
      </template>
      <v-card-item>
        Вы играете за {{color}}
        <br/>
        <div v-if="this.isWaiting">Ваш ход!</div>
        <div v-else>Ходит оппонент!</div>
      </v-card-item>

      <v-card-title>
        Чат с оппонентом
      </v-card-title>

      <v-card-text>
        <div class="overflow-y-scroll" style="max-height: 190px">
          <div class="" v-for="msg in chatHistory" v-bind:key="msg">
            {{msg}}
          </div>
        </div>
      </v-card-text>
      <v-form @submit.prevent="chat">
        <v-text-field
            variant="outlined"
            v-model="message"
            label="Сообщение"
            class="mx-2"
            color="primary"
            type="text"
            :rules="rules"
        ></v-text-field>
        <v-btn
            :loading="loading"
            type="submit"
            class="mx-2 mb-0"
            text="Выслать"
            color="primary"
        >
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import requests from "@/requests";

export default {
  name: "GameInfo",
  props: {
    roomName: String,
    userId: -2,
  },
  data() {
    return {
      chatHistory: [],
      color: "-",
      isWaiting: false,
      message: "",
      loading: false,
      longPollInterval: null,
      rules: [v => !!v || 'Обязательно',
        v => /[A-Za-z0-9]+/.test(v)||'Только на англиском!']
    }
  },
  methods: {
    chat() {
      if (this.message === "" && this.loading) {
        return;
      }
      this.loading = true;
      requests.chat(this.userId, this.roomName, this.message).then((json) => {
        if (json["SendMessage"] === 1) {
          console.log("Success!")
        }
        this.loading = false;
      });
    }
  },
  created() {
    this.longPollInterval = setInterval(() => {
      requests.color(this.userId, this.roomName).then((json) => {
        this.color = json["Color"];
      });
      requests.isWaitPlayer(this.userId, this.roomName).then((json) => {
        this.isWaiting = json["WP"];
      });
      requests.chatHistory(this.roomName).then((json) => {
        this.chatHistory = json["ChatHistory"];
      });
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.longPollInterval);
  }
}
</script>

<style scoped>

</style>