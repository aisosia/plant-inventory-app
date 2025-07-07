import { doc, collection, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export function usePlants() {
  const addPlant = async (data) => await addDoc(collection(db, "plants"), data);
  const getPlant = async (id) => {
    const snap = await getDoc(doc(db, "plants", id));
    return snap.exists() ? snap.data() : null;
  };
  const updatePlant = async (id, data) => await updateDoc(doc(db, "plants", id), data);
  return { addPlant, getPlant, updatePlant };
}
