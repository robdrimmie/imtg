import Attributes from '$lib/Attributes'
import Dice from '$lib/Dice';
import Jobs from '$lib/Decks/Jobs';
import Modifiers from '$lib/Modifiers';
import Names from '$lib/Decks/Names';
import Paperdoll from '$lib/Items/Paperdoll';
import Tile from '$lib/Map/Tile';
import TileRelationship from '$lib/Map/TileRelationship';

export default class Character {
	static forTesting() {
		const startingPersonality = [];

		startingPersonality[Attributes.PERSONALITY_AGREEABLENESS] = 50;
		startingPersonality[Attributes.PERSONALITY_CONSCIENTIOUSNESS] = 50;
		startingPersonality[Attributes.PERSONALITY_EXTRAVERSION] = 50;
		startingPersonality[Attributes.PERSONALITY_NEUROTICISM] = 50;
		startingPersonality[Attributes.PERSONALITY_OPENNESS] = 50;

		const personality = Character.generatePersonality(startingPersonality);

		const startingPhysicality = [];

		startingPhysicality[Attributes.PHYSICALITY_AWARENESS] = 50;
		startingPhysicality[Attributes.PHYSICALITY_BRAWN] = 50;
		startingPhysicality[Attributes.PHYSICALITY_COORDINATION] = 50;
		startingPhysicality[Attributes.PHYSICALITY_ENDURANCE] = 50;
		startingPhysicality[Attributes.PHYSICALITY_MAGNETISM] = 50;

		const physicality = Character.generatePhysicality(startingPhysicality);

		const startingResources = [];

		startingResources[Attributes.RESOURCES_ENERGY] = 10;
		startingResources[Attributes.RESOURCES_HEALTH] = 10;
		startingResources[Attributes.RESOURCES_SATIETY] = 10;

		const resources = Character.generateResources(startingResources);

		return new Character({
			id: '1',
			job: Jobs.meleeDps(),
			name: 'Test Name',
			personality,
			physicality,
			resources
		});
	}

	constructor(props) {
		props = props ? props : {};

		this.id = props.id ? props.id : Dice.nextId();
		this.job = props.job ? props.job : Jobs.random();

		this.name = props.name ? props.name : Names.character();

		this.currency = props.currency ? props.currency : this.job.startingCurrency();

		const originTile = Tile.origin();

		this.paperdoll = props.paperdoll ? props.paperdoll : Paperdoll.forCharacter();

		if (props.startingGear) {
			this.paperdoll.slots[Paperdoll.DOLL_SLOT_TORSO] = this.job.startingArmour();
			this.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_RIGHT] = this.job.startingWeapon();
			this.backpack().slots[0] = this.job.startingArmour();

			// RMD TODO this should be put in slot 1, it's here while I sort out svelte-dnd-action stuff
			this.backpack().slots[7] = this.job.startingWeapon();
		}

		this.personality = props.personality ? props.personality : this.startingPersonality();

		this.physicality = props.physicality ? props.physicality : this.startingPhysicality();

		this.resources = props.resources ? props.resources : this.startingResources();

		this.currentTile = props.currentTile ? props.currentTile : originTile;
	
		if (props.tileRelationships) {
			this.tileRelationships = props.tileRelationships;
		} else {
			this.tileRelationships = new Map();

			// Set character in Origin town with a high level of knowledge about it
			const originRelationship = this.updateRelationshipWithTile(originTile);

			originRelationship.knowledgeLevel = Tile.KNOWLEDGE_EXPERIENCED;
			this.tileRelationships.set(originTile.id, originRelationship);
		}
	}

	// #region progress
	progressStats() {
		
	}
	
	progress() {
		console.log(`progressing ${this.name}`, this)
		
		// update current and apparent stats based on gear
		this.progressStats()
		
		// update tile relationships
		this.progressTileRelationships()
	}
	
	progressTileRelationships() {
		this.tileRelationships.forEach( (tileRelationship) => {
			console.log("tR", tileRelationship)

			tileRelationship.progress(this)
		})
	}

	// #endregion progress

	// #region Attribute generators
	// 8d8 = starting values in range 8 - 64 which feels like a good place to aim for now
	startingPersonality() {

		const startingPersonality = [];

		startingPersonality[Attributes.PERSONALITY_AGREEABLENESS] = Dice.d8(8)
		startingPersonality[Attributes.PERSONALITY_CONSCIENTIOUSNESS] = Dice.d8(8)
		startingPersonality[Attributes.PERSONALITY_EXTRAVERSION] = Dice.d8(8)
		startingPersonality[Attributes.PERSONALITY_NEUROTICISM] = Dice.d8(8)
		startingPersonality[Attributes.PERSONALITY_OPENNESS] = Dice.d8(8)

		return Character.generatePersonality(startingPersonality);
	}

	startingPhysicality() {
		const startingPhysicality = [];

		startingPhysicality[Attributes.PHYSICALITY_AWARENESS] = Dice.d8(8)
		startingPhysicality[Attributes.PHYSICALITY_BRAWN] = Dice.d8(8)
		startingPhysicality[Attributes.PHYSICALITY_COORDINATION] = Dice.d8(8)
		startingPhysicality[Attributes.PHYSICALITY_ENDURANCE] = Dice.d8(8)
		startingPhysicality[Attributes.PHYSICALITY_MAGNETISM] = Dice.d8(8)

		return Character.generatePhysicality(startingPhysicality);
	}

	startingResources() {
		const resources = [];

		resources[Attributes.RESOURCES_ENERGY] = Math.ceil(this.getCurrentEndurance() * .1)
		resources[Attributes.RESOURCES_HEALTH] = Math.ceil(this.getCurrentBrawn() * .1)
		resources[Attributes.RESOURCES_SATIETY] = 5

		return Character.generateResources(resources);
	}

	static generateTrait(attributes, scores) {
		const trait = new Map();

		attributes.forEach((val, index, set) => {
			trait.set(
				val,
				Attributes.forAttribute(val, scores)
			)
		})

		return trait
	}

	static generatePersonality(scores) {
		return this.generateTrait(
			[
				Attributes.PERSONALITY_AGREEABLENESS
				, Attributes.PERSONALITY_CONSCIENTIOUSNESS
				, Attributes.PERSONALITY_EXTRAVERSION
				, Attributes.PERSONALITY_NEUROTICISM
				, Attributes.PERSONALITY_OPENNESS
			]
			, scores
		)
	}

	static generatePhysicality(scores) {
		return this.generateTrait(
			[
				Attributes.PHYSICALITY_AWARENESS
				, Attributes.PHYSICALITY_BRAWN
				, Attributes.PHYSICALITY_COORDINATION
				, Attributes.PHYSICALITY_ENDURANCE
				, Attributes.PHYSICALITY_MAGNETISM
			]
			, scores
		)
	}

	static generateResources(scores) {
		return this.generateTrait(
			[
				Attributes.RESOURCES_ENERGY
				, Attributes.RESOURCES_HEALTH
				, Attributes.RESOURCES_SATIETY
			]
			, scores
		)
	}

	// #endregion Attribute generators

	// #region Attributes and other getters
	getAttribute(attributeToGet) {
		let attribute

		const traitConstant = Attributes.getTraitConstantForAttribute(attributeToGet)

		if(traitConstant == Attributes.TRAIT_PERSONALITY) {
			attribute = this.personality.get(attributeToGet)
		}

		if(traitConstant == Attributes.TRAIT_PHYSICALITY) {
			attribute = this.physicality.get(attributeToGet)
		}

		if(traitConstant == Attributes.TRAIT_RESOURCES) {
			attribute = this.resources.get(attributeToGet)
		}

		// console.log("INSIDE GETATTRIBUTE")
		const modifier = this.getItemModifierForAttribute(attributeToGet)

		// console.log("getAttribute - modifier", 
		// 	modifier,
		// 	attribute, 
		// 	attribute.base - (attribute.base * modifier),
		// 	(attribute.base * modifier) - attribute.base
		// )

		const attributeDelta = Math.round((attribute.base * modifier) - attribute.base)

		const apparentAttribute = new Attributes(attribute.name, attribute.base, attribute.label)
	// console.log(" ---- ", attribute.current, attributeDelta)
		// maybe add as a third property, attribute.apparent
		apparentAttribute.current = attribute.current + attributeDelta

		// console.log("getAttribute - returning attribute", attribute, attributeDelta, apparentAttribute)
		// Today I think that the base value should not be modified. 12/10 health looks good and reveals the value of the modifier
		// attribute.base *= modifier

		return apparentAttribute;
	}

	getTrait(traitToGet) {
		switch (traitToGet) {
			case Attributes.TRAIT_PERSONALITY:
				return this.personality;

			case Attributes.TRAIT_PHYSICALITY:
				return this.physicality;

			case Attributes.TRAIT_RESOURCES:
				return this.resources;

			default:
				throw new Error("Unknown traitToGet")
		}
	}

	// #region Attribute-sepecific getters

	getEnergy() {
		return this.getAttribute(Attributes.RESOURCES_ENERGY);
	}

	getHealth() {
		// console.log("CHARACTER GETHEALTH CALLED", this.getAttribute(Attributes.RESOURCES_HEALTH))
		return this.getAttribute(Attributes.RESOURCES_HEALTH)
	}

	getSatiety() {
		return this.getAttribute(Attributes.RESOURCES_SATIETY)
	}

	getAgreeableness() {
		return this.getAttribute(Attributes.PERSONALITY_AGREEABLENESS)
	}

	getConscientousness() {
		return this.getAttribute(Attributes.PERSONALITY_CONSCIENTIOUSNESS)
	}

	getExtraversion() {
		return this.getAttribute(Attributes.PERSONALITY_EXTRAVERSION)
	}

	getNeuroticism() {
		return this.getAttribute(Attributes.PERSONALITY_NEUROTICISM)
	}

	getOpenness() {
		return this.getAttribute(Attributes.PERSONALITY_OPENNESS)
	}

	getAwareness() {
		return this.getAttribute(Attributes.PHYSICALITY_AWARENESS)
	}

	getBrawn() {
		return this.getAttribute(Attributes.PHYSICALITY_BRAWN)
	}

	getCoordination() {
		return this.getAttribute(Attributes.PHYSICALITY_COORDINATION)
	}

	getEndurance() {
		return this.getAttribute(Attributes.PHYSICALITY_ENDURANCE)
	}

	getMagnetism() {
		return this.getAttribute(Attributes.PHYSICALITY_MAGNETISM)
	}
	// #endregion Attribute-sepecific getters

	// #region Current Value  getters
	getCurrentAttribute(attributeToGet) {
		return this.getAttribute(attributeToGet).current
	}

	getCurrentEnergy() {
		return this.getEnergy().current;
	}

	getCurrentHealth() {
		return this.getHealth().current;
	}

	getCurrentSatiety() {
		return this.getSatiety().current;
	}

	getCurrentAgreeableness() {
		return this.getAgreeableness().current;
	}

	getCurrentConscientousness() {
		return this.getConscientousness().current;
	}

	getCurrentExtraversion() {
		return this.getExtraversion().current;
	}

	getCurrentNeuroticism() {
		return this.getNeuroticism().current;
	}

	getCurrentOpenness() {
		return this.getOpenness().current;
	}

	getCurrentAwareness() {
		return this.getAwareness().current;
	}

	getCurrentBrawn() {
		return this.getBrawn().current;
	}

	getCurrentCoordination() {
		return this.getCoordination().current;
	}

	getCurrentEndurance() {
		return this.getEndurance().current;
	}

	getCurrentMagnetism() {
		return this.getMagnetism().current;
	}
	// #endregion Current Value  getters

	getCapacity() {
		return this.backpack().availableCapacity();
	}

	getGearScore() {
		const tileRelationship = this.tileRelationships.get(this.currentTile.id);
		return tileRelationship.calculateGearScore(this);
	}

	getItemModifierForAttribute(attributeToGet) {
		// console.log("getItemModifierForAttribute - attributeToGet", attributeToGet)
		const items = []

		const slots = [
			Paperdoll.DOLL_SLOT_HEAD,
			Paperdoll.DOLL_SLOT_TORSO,
			Paperdoll.DOLL_SLOT_LEGS,
			// 20220908 2019 just not letting stuff held in hands have a passive effect on the character holding them
			// Paperdoll.DOLL_SLOT_HAND_LEFT,
			// Paperdoll.DOLL_SLOT_HAND_RIGHT,
			Paperdoll.DOLL_SLOT_WAIST,
		]

		// if there's an item in the slot _and_ it modifies attributeToGet, add it to the list
		slots.forEach(slot => {
			if(this.paperdoll.slots[slot]?.attribute === attributeToGet) {
				items.push(this.paperdoll.slots[slot])
			}
		})

		// console.log("getItemModifierForAttribute - attributeToGet, items", attributeToGet, items )

		// an a * b * c type thing
		const accumulatedModifier = items.reduce(
			(accumulatingModifier, currentItem) => {
				// console.log("accumulatingModifer, currentItem, passiveModifier, existance", 
				// 	accumulatingModifier, 
				// 	currentItem, 
				// 	currentItem.passiveModifier, 
				// 	(
				// 		currentItem.passiveModifier
				// 		? "IT EXISTS"
				// 		: "IT DOES NOT EXIST"
				// 	)
				// )

				return accumulatingModifier * (
					currentItem.passiveModifier
					? currentItem.passiveModifier()
					: 1
				)
			}, 
			1
		)

		return accumulatedModifier
	}
	// #endregion Attributes and other getters

	// #region Attribute setters
	setAttribute(attributeToSet, attributeDelta) {	
		// console.log("Character setAttribute - attributeToSet, attributeDelta", attributeToSet, attributeDelta)

		const attribute = this.getAttribute(attributeToSet)

		const trait = this.getTrait(
			Attributes.getTraitConstantForAttribute(attributeToSet)
		)

		attribute.current += attributeDelta

		trait.set(attributeToSet, attribute)

		return attribute
	}
	// #endregion Attribute setters

	// #region calculate Desire methods

	// A character wants to go adventuring if they are healthy, energetic and satiated
	// A character with high neuroticism has a high threshold, so that is the threshold for now
	calculateAdventuringDesire() {
		let adventuringDesireScore = 1;

		const threshold = this.getCurrentNeuroticism() * 0.01;

		const energy = this.getEnergy();

		// No energy means no desire to adventure
		if (energy.current === 0) {
			adventuringDesireScore *= 0;
		} else if (energy.current / energy.base >= threshold) {
			adventuringDesireScore *= Modifiers.INCREASE;
		} else {
			adventuringDesireScore *= Modifiers.DECREASE;
		}

		const health = this.getHealth();

		if (health.current === 0) {
			adventuringDesireScore *= 0;
		} else if (health.current / health.base >= threshold) {
			adventuringDesireScore *= Modifiers.INCREASE;
		} else {
			adventuringDesireScore *= Modifiers.DECREASE;
		}

		// RMD TODO - maybe should still be able to adventure even if satiety is 0?
		// but I'm not sure. that's a desperate degree of hunger so I think I'll
		// stick with the pattern for now.
		const satiety = this.getSatiety();
		if (satiety.current === 0) {
			adventuringDesireScore *= 0;
		} else if (satiety.current / satiety.base >= threshold) {
			adventuringDesireScore *= Modifiers.INCREASE;
		} else {
			adventuringDesireScore *= Modifiers.DECREASE;
		}

		return adventuringDesireScore;
	}

	// A character who is getting low on health, energy and satiety is going to want
	// to rest. High neuroticism will encourage resting sooner. High concientousness should also.
	// So the threshold is (1 - (neuroAs%)) * (1 - (concientAs%))) ?
	calculateRestingDesire() {
		let restingDesireScore = 1;

		const threshold =
			(1 - this.getCurrentConscientousness() * 0.01) * (1 - this.getCurrentNeuroticism() * 0.01);

		// eg cons.9 * nuero.9 = threshold.81
		// energy = 9/10 = .9. Energy > threshold, so desire to rest Modifiers.DECREASEs
		// energy = 8/10 = .8. Energy < threshold, so desire to rest Modifiers.INCREASEs
		// this character plays it safe and wants to rest a lot
		// but if they have no energy they _must_ rest!
		const energy = this.getEnergy();
		if (energy.current === 0) {
			restingDesireScore *= 100;
		} else if (energy.current / energy.base <= threshold) {
			restingDesireScore *= Modifiers.INCREASE;
		} else {
			restingDesireScore *= Modifiers.DECREASE;
		}

		// eg cons.1 * neuro.1 = threshold.01
		// health = 1/10 = .1 health > threshold so desire to rest Modifiers.DECREASEs
		// health = 0/10 = 0. health < threshold so desire to rest Modifiers.INCREASEs.
		// this character risks it all every time
		// I'm going to say that when they're down to 10 hit point they MUST rest
		const health = this.getHealth();
		if (health.current < 2) {
			restingDesireScore *= 100;
		}
		if (health.current / health.base <= threshold) {
			restingDesireScore *= Modifiers.INCREASE;
		} else {
			restingDesireScore *= Modifiers.DECREASE;
		}

		const satiety = this.getSatiety();
		// desperate hunger, like with adventuring
		if (satiety.current === 0) {
			restingDesireScore *= 100;
		}
		if (satiety.current / satiety.base <= threshold) {
			restingDesireScore *= Modifiers.INCREASE;
		} else {
			restingDesireScore *= Modifiers.DECREASE;
		}

		return restingDesireScore;
	}

	// A character wants to vend (dump gear at minimum) if they have low capacity
	calculateVendingDesire() {
		let vendingDesireScore = 1;

		const threshold =
			0.01 * this.getCurrentConscientousness() * (0.01 * this.getCurrentNeuroticism());

		const capacity = {
			base: this.backpack().capacity,
			current: this.backpack().availableCapacity()
		};

		const modifier = capacity.base - capacity.current

		vendingDesireScore = (capacity.base - capacity.current) * .2

		return vendingDesireScore;
	}
	// #endregion calculate Desire methods

	// #region inventory management
	backpack() {
		return this.paperdoll.slots[Paperdoll.DOLL_SLOT_BACK];
	}

	loot() {
		let loot = [];

		this.paperdoll.slots.forEach((paperdollSlot, index) => {
			if (paperdollSlot && paperdollSlot.isContainer) {
				const newLoot = paperdollSlot.loot();
				if (newLoot) {
					loot = [...loot, ...newLoot];
				}
			}

			if (paperdollSlot && !paperdollSlot.isContainer) {
				loot.push(paperdollSlot);
			}
		});

		// return the array of items
		return loot;
	}

	// loop through paperdoll and any containers looking for the win condition
	// removes it and returns item if found
	// rmd todo refactor
	// there should be like `Character.hasItem(id)` that does most of this and 
	//   return an inventory path reference to the item. then this method can 
	//   just loot based on path or whatever and this seeking logic can be in one spot
	lootWinConditionItem() {
		const winConditionItem = this.paperdoll.slots.find( 
			(paperdollSlotItem,
			idx,
			arr) => {
				if(!paperdollSlotItem) return false

				if(paperdollSlotItem.isWinConditionItem) {
					arr[idx] = null
					return true
				}
				
				// search through containers
				if (paperdollSlotItem.slots) {
					return paperdollSlotItem.slots.find( 
						(containerSlotItem, 
						idx, 
						arr) => {
							if(!containerSlotItem) return false

							arr[idx] = null
							return containerSlotItem.isWinConditionItem
						}
					)
				}

				return false
			}
		)

		return winConditionItem
	}	
	// #endregion inventory management

	// #region score methods
	scoreActionsAndTiles() {
		// how much does this character want to choose adventuring?
		// if they know adventuring is not available, then 0 much.
		const actionScores = new Map();

		const bestTiles = this.bestTilesForActions();

		actionScores.set('adventure', {
			score: this.calculateAdventuringDesire(),
			tile: bestTiles.adventure.tile
		});

		actionScores.set('rest', {
			score: this.calculateRestingDesire(),
			tile: bestTiles.rest.tile
		});

		actionScores.set('vend', {
			score: this.calculateVendingDesire(),
			tile: bestTiles.vend.tile
		});

		return actionScores;
	}

	bestTilesForActions() {
		let bestTiles = {
			adventure: {
				score: 0,
				tile: null
			},

			rest: {
				score: 0,
				tile: null
			},

			vend: {
				score: 0,
				tile: null
			}
		};

		let tileScores = [];

		// find the best tiles for each type of action based on this character's knowledge
		this.tileRelationships.forEach((tileRelationship, key, map) => {
			const tileUnderConsideration = tileRelationship.tile
// console.log(`${this.name} considering ${tileUnderConsideration.id}`)
			// Dampen the score based on the distance
			const tileDistance = this.currentTile.distanceFromTile(tileUnderConsideration)
			const distanceDampener = 1 - tileDistance * 0.1

			// Get base the tile relationship score, dampened by distance
			const tileRelationshipScore =
				tileRelationship.scores.overall * distanceDampener
// console.log("distanceDampener", distanceDampener, tileRelationshipScore)			
			const tileKnowledge = tileUnderConsideration.getKnowledgeForLevel(
				tileRelationship.knowledgeLevel
			)

			const tileScoreForAdventuring =
				tileRelationshipScore * tileRelationship.calculateAdventuringValue(tileKnowledge);
			const tileScoreForResting =
				tileRelationshipScore * tileRelationship.calculateRestingValue(tileKnowledge);
			const tileScoreForVending =
				tileRelationshipScore * tileRelationship.calculateVendingValue(tileKnowledge);
// console.log("tileScoreForAdventuring, tileScoreForResting, tileScoreForVending", tileScoreForAdventuring, tileScoreForResting, tileScoreForVending)
			// update best tiles
			if (tileScoreForAdventuring > bestTiles.adventure.score) {
				bestTiles.adventure = {
					score: tileScoreForAdventuring,
					tile: tileUnderConsideration
				};
			}

			if (tileScoreForResting > bestTiles.rest.score) {
				bestTiles.rest = {
					score: tileScoreForResting,
					tile: tileUnderConsideration
				};
			}

			if (tileScoreForVending > bestTiles.vend.score) {
				bestTiles.vend = {
					score: tileScoreForVending,
					tile: tileUnderConsideration
				};
			}

			// add to collection of all scores, which isn't used but might be useful
			const tileActionScores = {
				tile: tileUnderConsideration,
				adventure: tileScoreForAdventuring,
				rest: tileScoreForResting,
				vend: tileScoreForVending
			};

			tileScores.push(tileActionScores);
		});

		return bestTiles;
	}
	// #endregion score methods

	// #region Tile Relationship, movement, knowledge
	movedIntoTile(tile, neighbours) {
		neighbours.forEach((neighbour) => {
			this.tileRelationships.set(neighbour.id, this.updateRelationshipWithTile(neighbour));
		});

		this.currentTile = tile;

		const energy = this.resources.get(Attributes.RESOURCES_ENERGY);

		energy.current--;

		if (energy.current < 0) energy.current = 0;

		this.resources.set(Attributes.RESOURCES_ENERGY, energy);
	}

	updateRelationshipWithTile(tile) {
		// console.log("updateRelationshipWithTile with tile", tile, this)

		// Get the existing relationship or create a new one with barebones details.
		const relationship = this.tileRelationships.get(tile.id) ?? new TileRelationship(this, tile);

		if (relationship.knowledgeLevel === Tile.KNOWLEDGE_MEMOIR) {
			relationship.knowledgeLevel = Tile.KNOWLEDGE_EXPERIENCED;
		}

		if (relationship.knowledgeLevel === Tile.KNOWLEDGE_OBITUARY) {
			relationship.knowledgeLevel = Tile.KNOWLEDGE_MEMOIR;
		}

		// when the character moves into a tile they get a lot of information
		if (relationship.knowledgeLevel < Tile.KNOWLEDGE_OBITUARY) {
			relationship.knowledgeLevel = Tile.KNOWLEDGE_OBITUARY;
		}

		// write out relationship and return it
		this.tileRelationships.set(tile.id, relationship);
		return relationship;
	}
	// #endregion Tile Relationship, movement, knowledge

	// #region Encounter resolution
	combatAction(allies, opponents) {
		return this.job.combatAction(this, allies, opponents);
	}

	pickTarget(actor, allies, opponents) {
		return this.job.pickTarget(actor, allies, opponents)
	}

	resolveSuccessfulHit(target) {
		return this.job.resolveSuccessfulHit(this, target)
	}

	testAttributes(attributesToTest, roll = Dice.d100()) {
		console.log("Character testAttributes", attributesToTest, roll)
		const attributesSum = attributesToTest.reduce(
			(prev, curr) => {
				console.log("test attributes sum", prev, curr, this.getCurrentAttribute(curr))


				return prev + this.getCurrentAttribute(curr)
			},
			1
		) 
		
		const attributesAverage = attributesSum / attributesToTest.length
		const attributesModifier = attributesAverage / 50

		// console.log(
		// 	"testAttributes attr, roll, attributesSum, attributesAverage, attributesModifier, result", 
		// 	attributesToTest, 
		// 	roll, 
		// 	attributesSum,
		// 	attributesAverage, 
		// 	attributesModifier,
		// 	roll * attributesModifier
		// )

		return roll * attributesModifier
	}


	rollDodge() {
		return this.testAttributes([
			Attributes.PERSONALITY_CONSCIENTIOUSNESS,
			Attributes.PERSONALITY_NEUROTICISM,
			Attributes.PHYSICALITY_AWARENESS,
			Attributes.PHYSICALITY_COORDINATION,
		])
	}

	rollHit() {
		return this.testAttributes([
			Attributes.PERSONALITY_CONSCIENTIOUSNESS,
			Attributes.PERSONALITY_NEUROTICISM,
			Attributes.PHYSICALITY_AWARENESS,
			Attributes.PHYSICALITY_COORDINATION,
		])
	}

	rollInitiative() {
		return Math.min(
			Math.floor(
				Dice.d100() *
					((this.getCurrentAwareness() * 2) / 100) *
					((this.getCurrentCoordination() * 2) / 100)
			),
			99
		);
	}
	// #endregion Encounter resolution
}
