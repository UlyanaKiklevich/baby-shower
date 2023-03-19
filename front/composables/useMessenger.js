import {ref} from "vue";

let channel = null
const user = ref(null)
const results = ref({})

export default () => {
  const addUser = name => {
    results.value[name] = []
  }

  const addAnswer = (name, question, answer) => {
    results.value[name] = [...results.value[name], {
      question,
      answer,
      isCorrect: Date.now() % 2
    }]
  }

  const createChannel = name => {
    user.value = name
    // eslint-disable-next-line no-undef
    const realtime = Ably.Realtime.Promise({ authUrl: `/auth/?client=${user.value}` })
    channel = realtime.channels.get("[?rewind=100]default-useMessenger")

    channel.publish("greeting", user.value)
  }

  const publish = message => {
    channel.publish('message', {
      player: user.value,
      answer: message
    })
  }

  return {
    createChannel,
    publish,
    user,
    addUser,
    results,
    addAnswer
  }
}
