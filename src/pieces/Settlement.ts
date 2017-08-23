import { Piece } from "./Piece"
import { uuidsAreEqual } from "../UUID"


export enum SettlementType {
	Settlement = 0,
	City
}

export class Settlement extends Piece{
	
	private type : SettlementType

	constructor(public ownerID : string, public terrainIDs : Array<string>){
		super()

		// Default to settlement
		this.type = SettlementType.Settlement
	}

	promoteToCity(){
		this.type = SettlementType.City
	}

	getType() : SettlementType{
		return this.type
	}

	hasTerrain(terrainId : string) : boolean{
		for(let id of this.terrainIDs){
			if(uuidsAreEqual(id, terrainId)){
				return true
			}
		}

		return false
	}
}