import { uuid } from "../UUID"

export abstract class Piece{
	public _id : string = uuid()
}