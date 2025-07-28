import { atom } from 'jotai'
import type { User } from './interfaces/index.js'

const userAtom = atom<User | null>(null)
const authTokenAtom = atom<string | null>(null)
const refreshTokenAtom = atom<string | null>(null)

export { userAtom, authTokenAtom, refreshTokenAtom }