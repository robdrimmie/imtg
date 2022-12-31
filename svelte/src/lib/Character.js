import Attributes from '$lib/Attributes'
import Backpacks from '$lib/Decks/Backpacks'
import Dice from '$lib/Dice'
import Jobs from '$lib/Decks/Jobs'
import Logger from '$lib/Logger'
import Modifiers from '$lib/Modifiers'
import Names from '$lib/Decks/Names'
import Paperdoll from '$lib/Items/Paperdoll'
import Tile from '$lib/Map/Tile'
import TileRelationship from '$lib/Map/TileRelationship'
import Deck from './Deck'

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

			// rmd todo backpack should probably be created via Job.startingBackpack or somesuch
			// paperdoll.slots[Paperdoll.DOLL_SLOT_BACK] = Backpack.ofTenSlots();

			// this.paperdoll.slots[Paperdoll.DOLL_SLOT_TORSO] = this.job.startingArmour();
			// this.paperdoll.slots[Paperdoll.DOLL_SLOT_HAND_RIGHT] = this.job.startingWeapon();
			// this.backpack().slots[0] = this.job.startingArmour();

			// RMD TODO this should be put in slot 1, it's here while I sort out svelte-dnd-action stuff
			// this.backpack().slots[7] = this.job.startingWeapon();
		}

		this.personality = props.personality ? props.personality : this.startingPersonality();

		this.physicality = props.physicality ? props.physicality : this.startingPhysicality();

		this.resources = props.resources ? props.resources : this.startingResources();

		this.currentTile = props.currentTile ? props.currentTile : originTile;

		this.tiles = props.tiles ? props.tiles :  {
			adventuring: this.currentTile,
			resting: this.currentTile,
			vending: this.currentTile
		}
			
		if (props.tileRelationships) {
			this.tileRelationships = props.tileRelationships;
		} else {
			this.tileRelationships = new Map();

			// Set character in Origin town with a high level of knowledge about it
			const originRelationship = this.updateRelationshipWithTile(originTile);

			originRelationship.knowledgeLevel = Tile.KNOWLEDGE_EXPERIENCED;
			this.tileRelationships.set(originTile.id, originRelationship);
		}

		// scores are absolute, so 0 is a baseline
		this.actionScores = {
			adventuring: 0,
			resting: 0,
			vending: 0
		}
	}

	// #region progress
	progressActionScores() {
		this.actionScores.adventuring = this.calculateAdventuringScore()
		this.actionScores.resting = this.calculateRestingScore()
		this.actionScores.vending = this.calculateVendingScore()
	}

	progressAttributes() {
		Logger.debug('Progressing attributes')

		// reset all traits to baseline
		this.physicality.forEach( attribute => {
			attribute.apparent = attribute.base
			attribute.current = attribute.apparent
		})
		this.personality.forEach( attribute => {
			attribute.apparent = attribute.base
			attribute.current = attribute.apparent
		})
		this.resources.forEach( attribute => {
			attribute.apparent = attribute.base
			attribute.current = attribute.apparent
		})

		// Items equipped in hand slots do not apply passive effects
		const slots = [
			Paperdoll.DOLL_SLOT_HEAD,
			Paperdoll.DOLL_SLOT_TORSO,
			Paperdoll.DOLL_SLOT_LEGS,
			Paperdoll.DOLL_SLOT_WAIST,
		]

		// accumulate all passive modifiers
		const modifications = new Map()
		slots.forEach( slotIndex => {
			// console.log("looking at ", slotIndex, this.paperdoll, this.paperdoll.slots[slotIndex])
			const item = this.paperdoll.slots[slotIndex]

			if (item === null) return
			if (item.isWinConditionItem) return
		
			if (modifications.get(item.attribute) === undefined) {
				modifications.set(item.attribute, 1)
			}

			modifications.set(
				item.attribute, 
				modifications.get(item.attribute) * item.passiveModifier()
			)
		})

		// apply passive modifiers
		modifications.forEach( (modifier, attributeConstant) => {
			const traitConstant = Attributes.getTraitConstantForAttribute(attributeConstant)

			const trait = this.getTrait(traitConstant)
			const attribute = trait.get(attributeConstant)

			// > apparent might be base modified by passives and current is apparent modified by wounds.
			const apparent = attribute.base * modifier
			const woundTotal = attribute.wounds.reduce( (prev, cur) => {
				return prev + cur
			}, 0)
			const current = apparent - woundTotal

			attribute.apparent = apparent
			attribute.current = current

			Logger.info(`Items modified ${attribute.name}.`)
			Logger.info(`  ${attribute.base} * ${modifier} = ${attribute.apparent}`)
			Logger.info(`  ${attribute.apparent} - ${woundTotal} = ${attribute.current}`)

			trait.set(
				attributeConstant,
				attribute
			)
		})
	}

	progress() {
		Logger.debug(`Progressing ${this.name}...`)
		
		// update current and apparent stats based on gear
		this.progressAttributes()
		
		// update tile relationships
		this.progressTileRelationships()

		// update the character's scores for each action
		this.progressActionScores() 

		// update the character's scores for each tile
		this.progressTileScores()

		// choose the character's preferred action
		Logger.debug(`Finished progressing ${this.name}.`)
	}
	
	progressTileRelationships() {
		this.tileRelationships.forEach( (tileRelationship) => {
			tileRelationship.progress(this)
		})	
	}

	progressTileScores() {
		this.tiles = this.bestTilesForActions()
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

		return attribute;
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
		const tileRelationship = this.tileRelationships.get(this.currentTile.id)
		return tileRelationship.calculateAttributeScore(this)
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

	getTraitAverage(trait) {
		let sum = 0
		let count = 0

		for(const attribute of trait) {
			sum += attribute[1].apparent
			count++
		}
		
		return sum / count
	}

	getPersonalityAverage() {
		return this.getTraitAverage(this.personality)
	}
	
	getPhysicalityAverage() {
		return this.getTraitAverage(this.physicality)

	}

	// #endregion Attributes and other getters

	// #region Attribute setters
	applyRegionModifiers(modifiers) {
		// console.log("before", this.getAgreeableness().base, this.getAgreeableness().current, this.getAgreeableness().apparent)

		const modifyBase = (attribute) => {
			const attributeToSet = this.getAttribute(attribute)

			const traitToSet = this.getTrait(
				Attributes.getTraitConstantForAttribute(attribute)
			)

			attributeToSet.base *= modifiers[attribute]

			traitToSet.set(attribute, attributeToSet)

			return attribute	
		}

		[
			...Attributes.PERSONALITIES, 
			...Attributes.PHYSICALITIES
		].forEach(physicality => {
			return modifyBase(physicality)
		})

		// console.log("after", this.getAgreeableness().base, this.getAgreeableness().current, this.getAgreeableness().apparent)
	}

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

	// #region calculate Action Score methods

	// A character wants to go adventuring if they are healthy, energetic and satiated
	// A character with high neuroticism has a high threshold, so that is the threshold for now
	calculateAdventuringScore() {
		const energy = this.getEnergy();
		const health = this.getHealth();
		const satiety = this.getSatiety();

		// if any resource is zero the character is not able to adventure
		if (energy.current === 0 || health.current === 0 || satiety.current === 0) {
			return 0
		}

		// if the character cannot carry more gear they really really don't want to adventure
		console.log("getcap", this.getCapacity())
		if (this.getCapacity() <= 0) {
			return 0.1
		}

		console.log("return advscore", energy.asScore(), health.asScore(), satiety.asScore())
		return energy.asScore() * health.asScore() * satiety.asScore()
	}

	// A character who is getting low on health, energy and satiety is going to want
	// to rest. High neuroticism will encourage resting sooner. High concientousness should also.
	// So the threshold is (1 - (neuroAs%)) * (1 - (concientAs%))) ?
	calculateRestingScore() {
		let restingActionScore = 1;

		const threshold =
			(1 - this.getCurrentConscientousness() * 0.01) * (1 - this.getCurrentNeuroticism() * 0.01);

		// eg cons.9 * nuero.9 = threshold.81
		// energy = 9/10 = .9. Energy > threshold, so desire to rest Modifiers.DECREASEs
		// energy = 8/10 = .8. Energy < threshold, so desire to rest Modifiers.INCREASEs
		// this character plays it safe and wants to rest a lot
		// but if they have no energy they _must_ rest!
		const energy = this.getEnergy();
		if (energy.current === 0) {
			restingActionScore *= 100;
		} else if (energy.current / energy.base <= threshold) {
			restingActionScore *= Modifiers.INCREASE;
		} else {
			restingActionScore *= Modifiers.DECREASE;
		}

		// eg cons.1 * neuro.1 = threshold.01
		// health = 1/10 = .1 health > threshold so desire to rest Modifiers.DECREASEs
		// health = 0/10 = 0. health < threshold so desire to rest Modifiers.INCREASEs.
		// this character risks it all every time
		// I'm going to say that when they're down to 10 hit point they MUST rest
		const health = this.getHealth();
		if (health.current < 2) {
			restingActionScore *= 100;
		}
		if (health.current / health.base <= threshold) {
			restingActionScore *= Modifiers.INCREASE;
		} else {
			restingActionScore *= Modifiers.DECREASE;
		}

		const satiety = this.getSatiety();
		// desperate hunger, like with adventuring
		if (satiety.current === 0) {
			restingActionScore *= 100;
		}
		if (satiety.current / satiety.base <= threshold) {
			restingActionScore *= Modifiers.INCREASE;
		} else {
			restingActionScore *= Modifiers.DECREASE;
		}

		return restingActionScore;
	}

	// A character wants to vend (dump gear at minimum) if they have low capacity
	calculateVendingScore() {
		let vendingActionScore = 1

		const capacity = {
			base: this.backpack().capacity,
			current: this.backpack().availableCapacity()
		}

		// _really_ wants to vend if there's no capacity
		if(capacity.current === 0) {
			vendingActionScore = 2
		} else {
			vendingActionScore = (capacity.base - capacity.current) * .2
		}

		return vendingActionScore
	}
	// #endregion calculate Desire methods

	// #region inventory management
	backpack() {
		if (this.paperdoll.slots[Paperdoll.DOLL_SLOT_BACK] === null) {
			this.paperdoll.slots[Paperdoll.DOLL_SLOT_BACK] = Backpacks.sack()
		}

		return this.paperdoll.slots[Paperdoll.DOLL_SLOT_BACK]
	}

	loot() {
		let items = []

		this.paperdoll.slots.forEach((paperdollSlot, index) => {
			if (paperdollSlot && paperdollSlot.isContainer) {
				const newLoot = paperdollSlot.loot();
				if (newLoot) {
					items = [...items, ...newLoot];
				}
			}

			if (paperdollSlot && !paperdollSlot.isContainer) {
				items.push(paperdollSlot);
			}
		});

		// return the array of items
		return { items, currency: this.currency };
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
		const actionScores = new Map();

		actionScores.set('adventure', {
			score: this.actionScores.adventuring,
			tile: this.tiles.adventure.tile
		});

		actionScores.set('rest', {
			score: this.actionScores.resting,
			tile: this.tiles.rest.tile
		});

		actionScores.set('vend', {
			score: this.actionScores.vending,
			tile: this.tiles.vend.tile
		});

		return actionScores;
	}

	bestTilesForActions() {
		let bestTiles = {
			adventure: {
				score: -1,
				tile: null
			},

			rest: {
				score: -1,
				tile: null
			},

			vend: {
				score: -1,
				tile: null
			}
		};

		// find the best tiles for each type of action based on this character's knowledge
		this.tileRelationships.forEach((tileRelationship, key, map) => {
			const tileUnderConsideration = tileRelationship.tile
			console.log(`Considering tile with ID ${tileUnderConsideration.id}`

// ,			tileRelationship.scores.overall
,			tileRelationship.values.adventuring
,			tileRelationship.values.resting
,			tileRelationship.values.vending
			)

			const tileScoreForAdventuring = /*tileRelationship.scores.overall * */tileRelationship.values.adventuring.overall
			const tileScoreForResting = /*tileRelationship.scores.overall * */tileRelationship.values.resting.overall
			const tileScoreForVending = /*tileRelationship.scores.overall * */tileRelationship.values.vending.overall
			
			console.log("tile scores", tileScoreForAdventuring, tileScoreForResting, tileScoreForVending)

			// update best tiles
			if (tileScoreForAdventuring > bestTiles.adventure.score) {
				console.log("Replacing score", tileScoreForAdventuring, bestTiles.adventure.score)
				// replace if score is higher
				bestTiles.adventure = {
					score: tileScoreForAdventuring,
					contenders: [tileUnderConsideration]
				};
			} else if (tileScoreForAdventuring == bestTiles.adventure.score) {
				console.log("adding contender")
				// combine if score is equal
				bestTiles.adventure = {
					score: tileScoreForAdventuring,
					contenders: [...bestTiles.adventure.contenders, tileUnderConsideration]
				}
			}

			if (tileScoreForResting > bestTiles.rest.score) {
				bestTiles.rest = {
					score: tileScoreForResting,
					contenders: [tileUnderConsideration]
				};
			} else if (tileScoreForResting == bestTiles.rest.score) {
				bestTiles.rest = {
					score: tileScoreForResting,
					contenders: [...bestTiles.rest.contenders, tileUnderConsideration]
				};
			}

			if (tileScoreForVending > bestTiles.vend.score) {
				bestTiles.vend = {
					score: tileScoreForVending,
					contenders: [tileUnderConsideration]
				};
			} else if (tileScoreForVending == bestTiles.vend.score) {
				bestTiles.vend = {
					score: tileScoreForVending,
					contenders: [...bestTiles.vend.contenders, tileUnderConsideration]
				};
			}

			console.log("here", 
				tileRelationship.values, 
				bestTiles.adventure,
				bestTiles.adventure.score, 
				bestTiles.adventure.contenders, 
				tileScoreForAdventuring, 
				tileScoreForAdventuring > bestTiles.adventure.score,

				// bestTiles.resting.score, 
				// bestTiles.resting.tile, 
				// tileScoreForResting, 
				// tileScoreForResting > bestTiles.resting.score,

				// bestTiles.vending.score, 
				// bestTiles.vending.tile, 
				// tileScoreForVending, 
				// tileScoreForVending > bestTiles.vending.score
			)

		});

		console.log('adventure', bestTiles.adventure.contenders)
		console.log('rest', bestTiles.rest.contenders)
		console.log('vend', bestTiles.vend.contenders)

		bestTiles.adventure.tile = Deck.pickOneCard(bestTiles.adventure.contenders)
		bestTiles.rest.tile = Deck.pickOneCard(bestTiles.rest.contenders)
		bestTiles.vend.tile = Deck.pickOneCard(bestTiles.vend.contenders)

		return bestTiles;
	}
	// #endregion score methods

	// #region Tile Relationship, movement, knowledge
	scoutTile(tile) {
		let relationship = this.tileRelationships.get(tile.id)
		
		if (relationship === undefined) {
			// when a tile is discovered it is still unknown
			relationship = new TileRelationship(this, tile);
		} else {
			// if the tile has been discovered seeing it again can add more knowledge
			// but only to a max of tombstone level
			if(
				relationship.knowledgeLevel < Tile.KNOWLEDGE_TOMBSTONE
				&& this.shouldIncreaseKnowledgeLevel()
			) {
				relationship.knowledgeLevel++
			}
		}

		// write out relationship and return it
		this.tileRelationships.set(tile.id, relationship);
		return relationship;
	}

	movedIntoTile(tile, neighbours) {
		// learn a tiny bit about neighbouring tiles
		neighbours.forEach((neighbour) => {
			this.tileRelationships.set(neighbour.id, this.scoutTile(neighbour));
		});

		// expend energy to move
		const energy = this.resources.get(Attributes.RESOURCES_ENERGY);
		energy.current--;
		if (energy.current < 0) energy.current = 0;
		this.resources.set(Attributes.RESOURCES_ENERGY, energy);

		// move into tile
		this.currentTile = tile;

		// learn more about tile
		this.updateRelationshipWithTile(tile)
	}

	
	shouldIncreaseKnowledgeLevel() {
		// conscientiousness and awareness
		return 50 < this.testAttributes([
			Attributes.PERSONALITY_CONSCIENTIOUSNESS,
			Attributes.PHYSICALITY_AWARENESS
		])
	}

	updateRelationshipWithTile(tile) {
		// console.log("updateRelationshipWithTile with tile", tile, this)

		// Get the existing relationship or create a new one with barebones details.
		const relationship = this.tileRelationships.get(tile.id) ?? new TileRelationship(this, tile);

		if (
			relationship.knowledgeLevel < 100
			&&  this.shouldIncreaseKnowledgeLevel()
		) {
			relationship.knowledgeLevel++
			Logger.info(`${this.name} increases knowledge of ${relationship.tile.id} to ${relationship.knowledgeLevel}`)
		}

		// write out relationship and return it
		this.tileRelationships.set(tile.id, relationship);
		return relationship;
	}

	defeatOnTile(tile) {
		const relationship = this.tileRelationships.get(tile.id)

		relationship.defeat()
	}

	victoryOnTile(tile) {
		// find TileRelationship
		const relationship = this.tileRelationships.get(tile.id)

		relationship.victory()
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
		// console.log("Character testAttributes", attributesToTest, roll)
		const attributesSum = attributesToTest.reduce(
			(prev, curr) => {
				// console.log("test attributes sum", prev, curr, this.getCurrentAttribute(curr))


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
