import { Card, SpecialCard } from "./cards/BaseCards"
import { uuid } from "./UUID"

export class Player{
	
	public _id : string = uuid()
	private deck : Array<Card>

	constructor(public name : string){
		this.deck = new Array<Card>()
	}

	awardCard(card : Card){
		this.deck.push(card)
	}

	getDeckVitoryPoints() : number{
		let points = 0

		for(let card of this.deck){
			if(card instanceof SpecialCard){
				points += card.points
			}
		}

		return points
	}
}