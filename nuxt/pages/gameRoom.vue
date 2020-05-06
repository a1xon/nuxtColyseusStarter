<template>
<v-row>
    <v-col>
        {{this.$store.state.username}}<br>
        {{this.$store.state.sessionId}}<br>
        {{players}}
    </v-col>
</v-row>
</template>

<script>
import { mapMutations } from "vuex";
import * as Colyseus from "colyseus.js";

export default {
  middleware: "authenticated",
  data: () => {
    return {
        players: {},
    };
  },
  mounted() {
    const client = new Colyseus.Client("ws://localhost:5000");
    client
      .joinOrCreate("gameroom", {
        username: this.$store.state.username
      })

      .then(room => {

        ///add session id to store
        this.$store.commit('setSessionId', room.sessionId);

        room.state.players.onAdd = (player, sessionId) => {
            //onAddedPlayer
        };

        room.state.players.onRemove = (player, sessionId) => {
            //onRemovedPlayer
        };

        room.state.players.onChange = (player, sessionId) => {
            //onChangePlayer
        };

        // room.onMessage("command", (message) => {});

        room.state.onChange = changes => {
          changes.forEach(change => {
            const { field, value } = change;
            this[field] = value;
          });
        };
      });
  }
};
</script>