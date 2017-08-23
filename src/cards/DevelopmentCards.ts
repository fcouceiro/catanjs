import { DevelopmentCard } from "./BaseCards"

export class KnightCard extends DevelopmentCard {
	apply() { }
}

export abstract class ProgressCard extends DevelopmentCard {
	
}

export class RoadBuildingPCard extends ProgressCard{
	apply() { }
}

export class YearOfPlentyPCard extends ProgressCard{
	apply() { }
}

export class MonopolyPCard extends ProgressCard{
	apply() { }
}