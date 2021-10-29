<template>
  <v-layout column justify-center align-center full-height>
    <v-card min-width="400">
      <v-card-title>
        <h2>Nuxt чат</h2>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="16"
            :rules="nameRules"
            label="Ваше имя"
            required
          ></v-text-field>

          <v-text-field
            v-model="room"
            :rules="roomRules"
            label="Введите комнату"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="submit"
          >
            Войти
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  layout: 'empty',

  head() {
    // У всех страниц должны быть title и description.
    let title = "Добро пожаловать в Nuxt чат!";
    let description = "Описание контента главной страницы сайта";

    return {
      title: title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
      ],
    };
  },

  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Введите имя',
      v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Введите комнату'
    ]
  }),

  sockets: {
    connect() {
      console.log('socket connected')
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        // 3 parament - callback, will be called when server receives the given info
        this.$socket.client.emit('userJoined', user, data => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    }
  }
};
</script>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
