<template>
  <div>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <div style="min-width: 400px; max-width: 700px;">
        <h2>Login Screen</h2>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-text-field label="Solo" v-model="username" :rules="usernameRules" placeholder="Username" @keyup.enter="joinRoom" autofocus solo :counter="12" required></v-text-field>
          <v-btn :disabled="!valid" color="primary" dark @click="joinRoom">Join a Room</v-btn>
        </v-form>
      </div>
    </v-col>
  </v-row>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  data: () => {
    return {
      valid: true,
      usernameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 12) || 'Name must be less than 12 characters',
        v => (v && (v.trim()).length > 2) || 'Name must be more than 2 characters',
        v => /^[a-zA-Z_\- 0123456789]*$/.test(v) || 'No special Characters'
      ],
    }
  },
  computed: {
    username : {
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('setUsername', value)
      }
    }
  },
  methods: {
    joinRoom () {
      if (this.valid && this.$store.state.username !== null) {
        this.$router.push('/gameRoom');
      }
    }
  },
}
</script>
