import { Terrain } from "./pieces/Terrain"
import { Robber } from "./pieces/Robber"
import { Settlement, SettlementType } from "./pieces/Settlement"
import { ResourceCard, ResourceType } from "./cards/ResourceCards"
import { Player } from "./Player"
import { uuidsAreEqual } from "./UUID"

export class Catan {

	public terrains: Array<Terrain>
	private settlements: Array<Settlement>
	private robber: Robber

	public players: Array<Player> = [
		new Player("Francisco"),
		new Player("Catarina"),
		new Player("Paulo"),
		new Player("Isa"),
		new Player("Cristiana"),
		new Player("Carolina"),
		new Player("Bernardo"),
		new Player("Xavier")
	]

	constructor() {
		// Line by line
		this.terrains = new Array<Terrain>(
			new Terrain(10, ResourceType.Ore),
			new Terrain(2, ResourceType.Wool),
			new Terrain(9, ResourceType.Lumber),

			new Terrain(12, ResourceType.Grain),
			new Terrain(6, ResourceType.Brick),
			new Terrain(4, ResourceType.Wool),
			new Terrain(10, ResourceType.Brick),

			new Terrain(9, ResourceType.Grain),
			new Terrain(11, ResourceType.Lumber),
			new Terrain(0, ResourceType.Desert),
			new Terrain(3, ResourceType.Lumber),
			new Terrain(8, ResourceType.Ore),

			new Terrain(8, ResourceType.Lumber),
			new Terrain(3, ResourceType.Ore),
			new Terrain(4, ResourceType.Grain),
			new Terrain(5, ResourceType.Wool),

			new Terrain(5, ResourceType.Brick),
			new Terrain(6, ResourceType.Grain),
			new Terrain(11, ResourceType.Wool)
		)

		this.settlements = new Array<Settlement>()

		// Start robber in the Desert terrain
		this.robber = new Robber(this.terrains[9]._id)
	}

	terrainsWithToken(token: number): Array<string> {
		let ids = new Array<string>()

		for (let terrain of this.terrains) {
			if (terrain.token == token) {
				ids.push(terrain._id)
			}
		}

		return ids
	}

	terrainWithId(terrainId: string): Terrain {
		for (let terrain of this.terrains) {
			if (uuidsAreEqual(terrain._id, terrainId)) {
				return terrain;
			}
		}

		return null;
	}

	playerWithId(playerId: string): Player {
		for (let player of this.players) {
			if (uuidsAreEqual(player._id, playerId)) {
				return player;
			}
		}

		return null;
	}

	countPlayerPoints(player: Player): number {
		let points = 0

		for (let settlement of this.settlements) {
			if (uuidsAreEqual(settlement.ownerID, player._id)) {
				let type: SettlementType = settlement.getType()

				if (type == SettlementType.Settlement) {
					points += 1
				}
				else if (type == SettlementType.City) {
					points += 2
				}
			}
		}

		return points + player.getDeckVitoryPoints()
	}

	settlementWithId(settlementId: string): Settlement {
		for (let settlement of this.settlements) {
			if (uuidsAreEqual(settlement._id, settlementId)) {
				return settlement;
			}
		}

		return null;
	}

	awardOwners(terrainIDs: Array<string>): Array<string> {
		let ids = new Array<string>()

		for (let settlement of this.settlements) {
			for (let terrainID of terrainIDs) {
				// Skip if terrain is being robbed
				if(uuidsAreEqual(this.robber.terrainID, terrainID)){
					continue
				}

				if (settlement.hasTerrain(terrainID)) {
					let type: SettlementType = settlement.getType()

					let terrain = this.terrainWithId(terrainID)
					let owner = this.playerWithId(settlement.ownerID)

					if (type == SettlementType.Settlement) {
						console.log(`Giving 1 ${ResourceType[terrain.type]} to ${owner.name}`)
						owner.awardCard(new ResourceCard(terrain.type))
					}
					else if (type == SettlementType.City) {
						console.log(`Giving 2 ${ResourceType[terrain.type]} to ${owner.name}`)
						owner.awardCard(new ResourceCard(terrain.type))
						owner.awardCard(new ResourceCard(terrain.type))
					}
				}
			}
		}

		return ids
	}

	placeSettlement(ownerID: string, terrainIDs: Array<string>): string {
		let settlement = new Settlement(ownerID, terrainIDs)
		this.settlements.push(settlement)

		return settlement._id
	}
}