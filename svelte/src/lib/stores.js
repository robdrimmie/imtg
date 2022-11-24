import { writable } from 'svelte/store'

export const board = writable({})

export const characters = writable([])

export const chests = writable([])

export const consumablesVendors = writable([])

export const equipablesVendors = writable([])

export const logger = writable({})
export const moves = writable([])

export const parties = writable([])

// RMD TODO convert below to "state" store or similar, eventually
export const selected = writable({
    character: 0,
    chest: 0,
    consumablesVendor: 0,
    equipablesVendor: 0,
    party: 0,
})
export const screenIsAdventure = writable(true)
export const started = writable(false)
export const won = writable(false)