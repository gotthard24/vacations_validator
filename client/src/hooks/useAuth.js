import { ref } from 'vue'
import { auth } from '../firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const user = ref(null)

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser
})

export function useAuth() {
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth)

  return { user, register, login, logout }
}