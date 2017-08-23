import { Piece } from "./Piece"
import { ResourceType } from "../cards/ResourceCards"

export class Terrain extends Piece{
	
	constructor(public token : number, public type: ResourceType) {
		super();
	}
}