export default class Move {
	static TYPE_PROGRESS_GAME = 'TYPE_PROGRESS_GAME';
	static TYPE_START_GAME = 'TYPE_START_GAME';
	static TYPE_TRANSFER_ITEM = `TYPE_TRANSFER_ITEM`;
	static TYPE_OTHER_MESSAGES = `TYPE_OTHER_MESSAGES`;

	static other(message) {
		return new Move(Move.TYPE_OTHER_MESSAGES, {}, message);
	}

	constructor(type, input, message, moves = []) {
		this.type = type;
		this.input = input;
		this.message = message;
		this.moves = moves;
	}
}
