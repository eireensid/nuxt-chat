<template>
  <v-container>
    <div>
      <ul>
        <li v-for="m in messages" :key="m.text">
          {{m.text}}
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: `Комната ${this.user.room}`
    }
  },

  middleware: ['chat'],

  computed: mapState(['user', 'messages'])
}
</script>