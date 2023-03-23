import { ref } from 'vue'
import names from '@/data/names.json'

let channel = null
const user = ref(null)
const results = ref({})

export default () => {
  const addUser = name => {
    results.value = {
      ...results.value,
      [name]: []
    }
  }

  const addAnswer = (name, question, answer) => {
    results.value = {
      ...results.value,
      [name]: [ ...(results.value[name] || []), {
        question,
        answer,
        isCorrect: Date.now() % 2
      }]
    }
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

  const getCorrectPercentage = questionNum => {
    const names = Object.keys(results.value)
    let counter = 0
    names.forEach(name => {
      if (results.value[name][questionNum].isCorrect) {
        counter ++
      }
    })

    return Math.ceil(counter * 100 / names.length)
  }

  const getName = answer => {
    if(Array.isArray(answer)) {
      let r = ''
      for(let t of answer) {
        if (r) {
          r += ' & '
        }
        r += names.find(({ key }) => key === t).title
      }
      return r
    }

    return names.find(({ key }) => key === answer).title
  }

  const  howWasCalled = (answer, num) => {
    const names = Object.keys(results.value)
    const set = new Set()
    names.forEach(name => {
      set.add(results.value[name][num].answer)
    })

    return [ ...set ].filter(name => name !== answer).map(name => getName(name))
  }

  const userCorrectStatistics = name => {
    const counter = results.value[name].reduce((acc, el) => {
      if (el.isCorrect) {
        acc ++
      }

      return acc
    }, 0)

    return counter * 100 / results.value[name].length
  }

  return {
    createChannel,
    publish,
    user,
    addUser,
    results,
    addAnswer,
    getCorrectPercentage,
    howWasCalled,
    getName,
    userCorrectStatistics
  }
}
