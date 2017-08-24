import { expect } from "chai"


import { Catan } from "../src/Catan"
import { LargestArmyCard, LongestRoadCard, VictoryPointCard } from "../src/cards/SpecialCards"

describe('Points [ City + Largest + Longest + Victory Point]', () => {
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