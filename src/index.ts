import { ResourceCard, ResourceType } from "./cards/ResourceCards"
import { LongestRoadCard, LargestArmyCard, VictoryPointCard } from "./cards/SpecialCards"
import { Card } from "./cards/BaseCards"
import { Player } from "./Player"
import { Dice } from "./pieces/Dice"
import { Catan } from "./Catan"
import { Terrain } from "./pieces/Terrain"


const dices: Array<Dice> = [
	new Dice(),
	new Dice()
]

let catan = new Catan()

// Add city (2 VPs)
const setID = catan.placeSettlement(
	catan.players[0]._id,
	[
		catan.terrains[7]._id,
		catan.terrains[8]._id,
		catan.terrains[12]._id
	]
)
catan.settlementWithId(setID).promoteToCity()

// Add special cards (5 Vps)
catan.players[0].awardCard(new LongestRoadCard())
catan.players[0].awardCard(new LargestArmyCard())
catan.players[0].awardCard(new VictoryPointCard())

function rollDices() {
	const dice1 = dices[0].roll()
	const dice2 = dices[1].roll()

	const token = dice1 + dice2

	document.getElementById('dice1').innerHTML = `${dice1} + ${dice2} = ${token}`;

	const terrains = catan.terrainsWithToken(token)
	catan.awardOwners(terrains)

	// Update UI
	document.getElementById('players').innerHTML = presentPlayers(catan.players)
}

// Render
function presentPlayers(players: Array<Player>): string {
	let sentence: string = ""

	for (let player of players) {
		sentence += `${player._id}# ${player.name} ${catan.countPlayerPoints(player)} \n`
	}

	return sentence
}

function presentTerrains(terrains: Array<Terrain>): string {
	let sentence: string = ""

	for (let terrain of terrains) {
		sentence += `${ResourceType[terrain.type]} - ${terrain._id} \n`
	}

	return sentence
}

document.getElementById('cards').innerHTML = presentTerrains(catan.terrains)
document.getElementById('players').innerHTML = presentPlayers(catan.players)
document.getElementById('btnDice').addEventListener('click', () => rollDices())
