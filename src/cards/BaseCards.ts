export abstract class Card {
	whoAmI() {
		let instance: any = this.constructor;
		return instance.name;
	}
}

export abstract class DevelopmentCard extends Card {
	abstract apply(): void;
}

export abstract class SpecialCard extends Card {
	public readonly points: number;

	constructor(points: number) {
		super();
		this.points = points;
	}

	abstract update(): void;
}