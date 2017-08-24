import { expect } from "chai"


import { Catan } from "../src/Catan"
import { LargestArmyCard, LongestRoadCard, VictoryPointCard } from "../src/cards/SpecialCards"
import { GamePlay, GameState } from "../src/GamePlay"
import { Player } from "../src/Player"

describe('Player with: [ City + Largest + Longest + Victory Point]', () => {
	it('should have 7 points', () => {
		const catan = new Catan()
		
		// Create city for player 0 (2 points)
		let settlementId = catan.placeSettlement(catan.players[0]._id, null)
		catan.settlementWithId(settlementId).promoteToCity()

		catan.players[0].awardCard(new LargestArmyCard()) // 2 points
		catan.players[0].awardCard(new LongestRoadCard()) // 2 points
		catan.players[0].awardCard(new VictoryPointCard()) // 1 point

		const playerPoints = catan.countPlayerPoints(catan.players[0])
		expect(playerPoints).to.equal(7)
	})
})

describe('GamePlay singleton', () => {
	it('should always return the same instance', () => {
		const gamePlay1 = GamePlay.Instance()
		const gamePlay2 = GamePlay.Instance()
		
		expect(gamePlay1).to.equal(gamePlay2)
	})
	
	it('should change player in turn', () => {
		const catan = new Catan()

		const gamePlay = GamePlay.Instance()
		gamePlay.setPlayersIDs(Player.getIDsFromPlayers(catan.players))

		expect(gamePlay.currentPlayerID).to.equal(catan.players[0]._id)
		gamePlay.nextTurn()
		expect(gamePlay.currentPlayerID).to.equal(catan.players[1]._id)

		// Next turn until repeat
		for (var i = catan.players.length - 1; i >= 1; i--) {
			gamePlay.nextTurn()
		}
		expect(gamePlay.currentPlayerID).to.equal(catan.players[0]._id)
	})
})