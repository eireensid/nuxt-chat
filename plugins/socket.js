import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io(process.env.BASE_URL);

export default ({ store }) => {
  Vue.use(VueSocketIOExt, socket, { store });
}
