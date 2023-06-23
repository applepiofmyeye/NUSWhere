import { Store, registerInDevtools } from "pullstate";
import { onAuthStateChanged } from "firebase/auth/react-native";
import { auth } from "./app/firebase";


export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
});

const unsub = onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChange", user);
  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = user ? true : false;
    store.initialized = true;
  });
});

registerInDevtools({AuthStore});