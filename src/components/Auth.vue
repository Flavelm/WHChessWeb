<template>
  <v-form @submit.prevent="submit" class="w-2/3 bg-secondary rounded mt-10 max-w-xl">
    <v-text-field
        variant="outlined"
        v-model="login"
        label="Логин"
        class="m-2"
        color="primary"
    ></v-text-field>
    <v-text-field
        variant="outlined"
        v-model="password"
        label="Пароль"
        class="m-2"
        color="primary"
        type="password"
    ></v-text-field>

    <v-switch
        v-model="isRegister"
        hide-details
        class="m-2"
        :true-value="true"
        :false-value="false"
        label="Новый?"
        color="primary"
    ></v-switch>

    <v-btn
        :loading="loading"
        type="submit"
        class="m-2"
        :text="isRegister ? 'Зарегистрироваться' : 'Войти'"
        color="primary"
    ></v-btn>
    <v-snackbar
        v-model="snackbar"
        color="primary"
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
  </v-form>
</template>

<script>
import requests from "../requests"

export default {
  name: "AuthPage",
  data() {
    return {
      isRegister: false,
      login: "",
      password: "",
      loading: false,
      snackbar: false,
      snackbarText: null,
    }
  },
  methods: {
    async submit() {
      this.loading = true;
      const req = this.isRegister ? requests.register : requests.login;
      req(this.login, this.password).then((json) => {
        if (json["PlayerRegistered"] !== undefined) {
          if (json["PlayerRegistered"] === 0) {
            this.loading = false;
            this.snackbarText = "Ник занят";
            this.snackbar = true;
            return;
          } else {
            this.snackbarText = "Успешно";
            this.snackbar = true;
            this.isRegister = false;
            return;
          }
        }
        if (json["Error"] !== undefined || json["id"] < 0){
          this.loading = false;
          this.snackbarText = "Не верные данные";
          this.snackbar = true;
          return;
        }
        window.localStorage.setItem("id", json["id"]);
        window.localStorage.setItem("login", this.login);
        this.$router.replace({ path: '/rooms' });
      }).catch(() => {
        this.snackbarText = "Ошибка сети"
        this.snackbar = true;
        this.loading = false;
      }).finally(() => {
        setTimeout(() => {
          this.snackbar = false;
        }, 1500);
        this.loading = false;
      });
    }
  },
  beforeCreate() {
    const value = window.localStorage.getItem("id");
    const login = window.localStorage.getItem("login")
    if (value !== null && login !== null) {
      this.$router.replace({ path: '/rooms' })
    }
  }
}
</script>