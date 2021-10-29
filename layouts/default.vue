<template>
  <v-app app>
    <v-navigation-drawer v-model="drawer" app mobile-breakpoint="650">
      <v-list subheader>
        <v-subheader>Список людей в комнате</v-subheader>

        <v-list-item-group
          active-class="pink--text"
        >
          <v-list-item
            v-for="u in users"
            :key="u.id"
          >
            <!-- <v-list-item-avatar>
              <v-img
                :alt="`${chat.title} avatar`"
                :src="chat.avatar"
              ></v-img>
            </v-list-item-avatar> -->

            <v-list-item-content>
              <v-list-item-title v-text="u.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon :color="u.id === user.id ? 'deep-purple accent-4' : 'grey'">
                mdi-message-outline
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div style="height: 100%">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  head() {
    return {
      // Установка rel="canonical" на всех страницах шаблона.
      link: [{ rel: "canonical", href: `${process.env.baseUrl}${this.$route.path}` }],

      // Пример установки общих мета-тегов на страницах.
      meta: [{ hid: "og:url", property: "og:url", content: `${process.env.baseUrl}${this.$route.path}` }],
    };
  },

  data: () => ({
    drawer: true
  }),

  computed: mapState(['user', 'users']),

  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$socket.client.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=leftChat')
        this.clearData()
      })
    }
  }

};
</script>
