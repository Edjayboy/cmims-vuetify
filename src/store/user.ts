// Utilities
import { ROLE } from '@/constants/authentication'
import { CurrentUserMetaData } from '@/types/authentication.interface'
import { defineStore } from 'pinia'

interface State {
  _currentUser: CurrentUserMetaData | undefined,
  _accessToken: string | undefined,
  _currentUserUuid: string | undefined,
}
export const useUserStore = defineStore('user', {
  state: (): State => ({
    _currentUser: {} as CurrentUserMetaData,
    _accessToken: '',
    _currentUserUuid: ''
  }),
  actions: {
    setCurrentUser (currentUser: CurrentUserMetaData | undefined) {
      this._currentUser = currentUser
    },
    setCurrentUserUuid (currentUserUuid: string | undefined) {
      this._currentUserUuid = currentUserUuid
    },
    setAccessToken(accessToken: string | undefined) {
      this._accessToken = accessToken
    }
  },
  getters: {
    accessToken: state => state._accessToken,
    currentUser: state => state._currentUser,
    currentUserUuid: state => state._currentUserUuid,
    isAdmin: state => state._currentUser?.role == ROLE.ADMIN,
    isUser: state => state._currentUser?.role == ROLE.USER,
  },
  persist: true
})
