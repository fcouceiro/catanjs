export enum GameState {
	Initializing = 0,
	SetupFirstTurn,
	SetupSecondTurn,
	Roll,
	Award,
	TradeOrBuild,
	Ended
}

export class GamePlay {
	private static _instance: GamePlay;

	private state: GameState
	
	public currentPlayerID: string
	private playerIDs: Array<string>

	init() {
		this.state = GameState.Initializing
	}

	public static Instance(): GamePlay {
		// Do you need arguments? Make it a regular method instead.
		return this._instance || (this._instance = new this());
	}

	getState(): GameState {
		return this.state
	}

	setPlayersIDs(playerIDs: Array<string>){
		this.playerIDs = playerIDs
		this.currentPlayerID = this.playerIDs[0]
	}

	nextTurn() {
		const currentPlayerIndex = this.playerIDs.indexOf(this.currentPlayerID)

		if(currentPlayerIndex + 1 >= this.playerIDs.length){
			this.currentPlayerID = this.playerIDs[0]
		}
		else{
			this.currentPlayerID = this.playerIDs[currentPlayerIndex + 1]
		}
	}
}