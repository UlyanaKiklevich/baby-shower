import {ref} from "vue";

let channel = null
const user = ref(null)

export default () => {
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
    user
  }
}
