import { TaskType } from './enums'

export const DEFAULT_DEVELOPERS: readonly string[] = [
	'Alice',
	'Bob',
	'Charlie',
	'Dave',
] as const

export const DEFAULT_ESTIMATES: Readonly<Partial<Record<TaskType, number>>> = {
	[TaskType.Bug]: 4,
	[TaskType.Feature]: 16,
	[TaskType.Research]: 8,
	[TaskType.Chore]: 2,
} as const
