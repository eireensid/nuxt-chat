<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-btn @click="message">NEW MESSAGE</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head() {
    // У всех страниц должны быть title и description.
    let title = "Шаблон Nuxt-Express";
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

  sockets: {
    connect() {
      console.log('socket connected')
    }
  },
  methods: {
    message() {
      this.$socket.client.emit("createMessage", {
        text: "FROM CLIENT"
      });
    }
  }
};
</script>
