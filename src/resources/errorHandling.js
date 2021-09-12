import store from './..//store'
import router from './../router'
import db from '@/firebase'
import firebase from 'firebase'

export const checkIfUserIsNull = () => {
  const userID = store.getters['auth/getCurrentUserID']
  return userID === null
}

export const redirectToHome = () => {
  router.push({ name: "Home"}).catch(()=>{})
}

export const deleteCurrentUser = async () => {
  await db.collection('Users')
    .doc(store.getters['auth/getCurrentUserID'])
    .delete()

  console.log("Deleted User")
}

export const deleteUserRoom = async () => {
  await db.collection('Rooms')
    .doc(store.getters['auth/getCurrentRoomID'])
    .delete()

  console.log("Deleted Room")
}
