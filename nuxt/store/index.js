export const state = () => ({
    username : null,
    sessionId: null,
})

export const mutations = {
    setUsername(state, name) {
        state.username = name
    },
    setSessionId(state, id) {
        state.sessionId = id
    }
}