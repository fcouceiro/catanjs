import { Card } from "./BaseCards"

export enum ResourceType {
	Brick = 0,
	Grain,
	Lumber,
	Ore,
	Wool,
	Desert
}

export class ResourceCard extends Card {

	constructor(public type: ResourceType) {
		super();
	}
}