/* 
  heavily influenced by 
  https://github.com/Hellenic/react-hexgrid/blob/master/src/Hexagon/Hexagon.js 
*/

class Hex {
	static LEFT_WARDS = new Hex(-1, 0, 1);
	static LEFT_DOWNWARDS = new Hex(-1, 1, 0);
	static LEFT_UPWARDS = new Hex(0, -1, 1);

	static NOWARDS = new Hex(0, 0, 0);

	static ORIGIN = new Hex(0, 0, 0);

	static RIGHT_WARDS = new Hex(1, 0, -1);
	static RIGHT_DOWNWARDS = new Hex(0, 1, -1);
	static RIGHT_UPWARDS = new Hex(1, -1, 0);

	static INVALID_HEX_COORDINATES = 'Invalid hex coordinates';

	static add = (firstHex, secondHex) => {
		return new Hex(firstHex.q + secondHex.q, firstHex.r + secondHex.r, firstHex.s + secondHex.s);
	};

	static distance(firstHex, secondHex) {
		return Hex.lengths(Hex.subtract(firstHex, secondHex));
	}

	static lengths(Hex) {
		return parseInt((Math.abs(Hex.q) + Math.abs(Hex.r) + Math.abs(Hex.s)) / 2);
	}

	static neighboursOfCoordinate(origin) {
		const neighbours = [];

		const directions = [
			Hex.LEFT_WARDS,
			Hex.LEFT_UPWARDS,
			Hex.RIGHT_UPWARDS,
			Hex.RIGHT_WARDS,
			Hex.RIGHT_DOWNWARDS,
			Hex.LEFT_DOWNWARDS
		];

		directions.forEach((direction) => {
			const neighbour = Hex.add(origin, direction);
			if (neighbour) {
				neighbours.push(neighbour);
			} else {
				console.error('not neighbour??', neighbour);
			}
		});

		return neighbours;
	}

	static origin = () => {
		return new Hex(0, 0, 0);
	};

	static subtract(firstHex, secondHex) {
		return new Hex(firstHex.q - secondHex.q, firstHex.r - secondHex.r, firstHex.s - secondHex.s);
	}

	constructor(q, r, s) {
		if (q + r + s !== 0) {
			throw new Error(Hex.INVALID_HEX_COORDINATES);
		}

		this.q = q;
		this.r = r;
		this.s = s;
	}

	// #region Instance methods

	// when a coordinate is a direction then it should be able to do one direction clockwise and one counterclocwise
	forks() {
		return [
			new Hex(parseInt(-1 * this.r), parseInt(-1 * this.s), parseInt(-1 * this.q)),
			new Hex(parseInt(-1 * this.s), parseInt(-1 * this.q), parseInt(-1 * this.r))
		];
	}

	id = () => {
		return `${this.q}${this.r}${this.s}`;
	};

	isOrigin() {
		return this.q === 0 && this.r === 0 && this.s === 0;
	}
}

export default Hex;
