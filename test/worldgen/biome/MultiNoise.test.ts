import { expect } from 'chai'
import type { NoiseParams } from '../../../src/worldgen'
import { Climate, MultiNoise } from '../../../src/worldgen'

describe('MultiNoise', () => {
	it('nether', () => {
		const noise: NoiseParams = { firstOctave: -7, amplitudes: [1, 1] }
		const netherBiomes = new Climate.Parameters([
			[Climate.parameters(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0), () => 'minecraft:nether_wastes'],
			[Climate.parameters(0.0, -0.5, 0.0, 0.0, 0.0, 0.0, 0.0), () => 'minecraft:soul_sand_valley'],
			[Climate.parameters(0.4, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0), () => 'minecraft:crimson_forest'],
			[Climate.parameters(0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.375), () => 'minecraft:warped_forest'],
			[Climate.parameters(-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.175), () => 'minecraft:basalt_deltas'],
		])
		const nether = new MultiNoise(BigInt(5392), netherBiomes, noise, noise, noise, noise, noise)

		expect(nether.getBiome(0, 0, 0)).equal('minecraft:soul_sand_valley')
		expect(nether.getBiome(100, 0, 0)).equal('minecraft:crimson_forest')
		expect(nether.getBiome(200, 0, 0)).equal('minecraft:nether_wastes')
		expect(nether.getBiome(300, 0, 0)).equal('minecraft:nether_wastes')
		expect(nether.getBiome(400, 0, 0)).equal('minecraft:warped_forest')
		expect(nether.getBiome(500, 0, 0)).equal('minecraft:soul_sand_valley')
	})
})
