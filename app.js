const { createGame, takeAction } = require('./services')

function decideAction(gameStatus) {
  const playerName = gameStatus.players[0].name
  const player = gameStatus.players.find((player) => player.name === playerName)
  const playersMoney = player.money
  const zeroMoney = playersMoney === 0
  const {
    card: cardOnTable,
    money: cardMoneyOnTable,
    cardsLeft,
    players,
  } = gameStatus
  const otherPlayers = players.filter((p) => p.name !== playerName)
  const competitorHasZeroMoney = otherPlayers.some(
    (player) => player.money === 0
  )
  const isVerySmall = cardOnTable < 5
  const isSmall = cardOnTable >= 5 && cardOnTable <= 10
  const isMedium = cardOnTable <= 20 && cardOnTable > 10
  const isLarge = cardOnTable >= 21 && cardOnTable <= 29
  const isBig = cardOnTable > 29
  const willOtherPlayersTakeCard = otherPlayers.some((p) =>
    p.cards
      .flat()
      .some((card) => card === cardOnTable + 1 || card === cardOnTable - 1)
  )
  const isAdjacentCard = player.cards
    .flat()
    .some((card) => card === cardOnTable + 1 || card === cardOnTable - 1)

  if (zeroMoney) {
    console.log(`${playerName} nostaa kortin, koska kolikot loppu.`)
    return true
  }

  if (isVerySmall && cardsLeft > 5) {
    console.log(
      `${playerName} nostaa kortin, koska se on niin pieni ja kortteja pelissä paljon jäljellä.`
    )
    return true
  }

  if (cardsLeft <= playersMoney && !isAdjacentCard) {
    console.log(
      `${playerName} panostaa, koska kortteja vähän jäljellä ja ei kuulu omaan numerosuoraan.`
    )
    return false
  }

  if (isAdjacentCard && isVerySmall) {
    console.log(
      `${playerName} nostaa koska kortti kuuluu omaan korttisuoraan eikä kolikoita kannata yrittää kerryttää koska kortti on pieni.`
    )
    return true
  }

  if (isAdjacentCard && (willOtherPlayersTakeCard || competitorHasZeroMoney)) {
    console.log(
      `${playerName} nostaa koska kortti kuuluu omaan korttisuoraan ja tietää että myös toinen pelaaja nostaisi sen.`
    )
    return true
  }

  if (
    isAdjacentCard &&
    !competitorHasZeroMoney &&
    isBig &&
    !willOtherPlayersTakeCard
  ) {
    if (cardMoneyOnTable < 6) {
      console.log(
        `${playerName} ottaa riskin eli panostaa ja kerryttää kolikoita omalle tosi suurelle kortille.`
      )
      return false
    }
    console.log(
      `${playerName} nostaa omalle numerosuoralle sopivan kortin ja kerää samalla kortille kertyneet kolikot.`
    )
    return true
  }

  if (
    isAdjacentCard &&
    !competitorHasZeroMoney &&
    isLarge &&
    !willOtherPlayersTakeCard
  ) {
    if (cardMoneyOnTable < 4) {
      console.log(
        `${playerName} ottaa riskin eli panostaa ja kerryttää kolikoita omalle numerosuoralle sopivalle isolle kortille.`
      )
      return false
    }
    console.log(
      `${playerName} nostaa omalle numerosuoralle sopivan kortin ja kerää samalla kortille kertyneet kolikot.`
    )
    return true
  }

  if (
    isAdjacentCard &&
    !competitorHasZeroMoney &&
    isMedium &&
    !willOtherPlayersTakeCard
  ) {
    if (cardMoneyOnTable < 4) {
      console.log(
        `${playerName} ottaa riskin eli panostaa ja kerryttää kolikoita omalle numerosuoralle sopivalle keskikokoiselle kortille.`
      )
      return false
    }
    console.log(
      `${playerName} nostaa omalle numerosuoralle sopivan kortin ja kerää samalla kortille kertyneet kolikot.`
    )
    return true
  }

  if (
    isAdjacentCard &&
    !competitorHasZeroMoney &&
    isSmall &&
    !willOtherPlayersTakeCard
  ) {
    if (cardMoneyOnTable < 3) {
      console.log(
        `${playerName} ottaa riskin eli panostaa ja kerryttää kolikoita omalle numerosuoralle sopivalle pienehkölle kortille.`
      )
      return false
    }
    console.log(
      `${playerName} nostaa omalle numerosuoralle sopivan kortin ja kerää samalla kortille kertyneet kolikot.`
    )
    return true
  }

  if (
    competitorHasZeroMoney &&
    !isAdjacentCard &&
    cardOnTable - cardMoneyOnTable > 1 &&
    !isVerySmall
  ) {
    console.log(
      `${playerName} panostaa, koska tietää että toinen pelaaja joutuu nostamaan kortin ja kortti on iso.`
    )
    return false
  }

  if (competitorHasZeroMoney && isVerySmall) {
    console.log(
      `${playerName} nostaa kortin, koska se on niin pieni ja tietää että toinen pelaaja joutuu nostamaan seuraavan todennäköisesti isomman kortin.`
    )
    return true
  }

  if (playersMoney < 8) {
    if (isSmall || isMedium || cardMoneyOnTable > 6) {
      console.log(
        `${playerName} nostaa kortin, koska siinä on hyvin kolikoita ja haluaa estää omien kolikoiden loppumisen kesken pelin.`
      )
      return true
    }
  }

  if (isBig && !isAdjacentCard) {
    console.log(`${playerName} ei nosta korttia, koska kortti on tosi suuri.`)
    return false
  }

  if (isLarge) {
    if (cardMoneyOnTable < 12) {
      console.log(
        `${playerName} ei nosta korttia, koska kortti on suuri ja siinä ei ole kolikoita tarpeeksi.`
      )
      return false
    }
    console.log(`${playerName} nostaa kortin, koska siinä on hyvin kolikoita.`)
    return true
  }

  if (isMedium) {
    if (cardMoneyOnTable < 8) {
      console.log(
        `${playerName} ei nosta korttia, koska kortti on suurehko ja siinä ei ole kolikoita tarpeeksi.`
      )
      return false
    }
    console.log(`${playerName} nostaa kortin, koska siinä on hyvin kolikoita.`)
    return true
  }

  if (isSmall) {
    if (cardMoneyOnTable < 6) {
      console.log(
        `${playerName} ei nosta korttia, vaikka kortti ei ole kovin iso niin siinä ei ole kolikoita tarpeeksi.`
      )
      return false
    }
    console.log(`${playerName} nostaa kortin, koska siinä on hyvin kolikoita.`)
    return true
  }

  return true
}

async function playGame() {
  const { gameId, gameStatus: initialGameStatus } = await createGame()
  if (!gameId || !initialGameStatus) return

  let gameStatus = initialGameStatus

  while (!gameStatus.finished) {
    const action = decideAction(gameStatus)
    gameStatus = await takeAction(action, gameId)
    if (!gameStatus) return
  }

  console.log('Peli päättynyt.')
}

playGame()
