import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import QRCodeGenerator from "./QRCodeGenerator";

export default function PlantForm() {
  const [data, setData] = useState({
    name: "",
    height: "",
    age: "",
    climate: "",
    inSoil: false,
    quantity: 1,
    description: "",
    photo: null,
  });
  const [qrUrl, setQrUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const photoRef = ref(storage, `plants/${Date.now()}_${data.photo.name}`);
    await uploadBytes(photoRef, data.photo);
    const photoURL = await getDownloadURL(photoRef);
    const docRef = await addDoc(collection(db, "plants"), {
      ...data,
      photoURL,
      createdAt: Date.now(),
      available: true,
    });
    const url = `${window.location.origin}/view/${docRef.id}`;
    setQrUrl(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Сорт растения" onChange={handleChange} className="w-full p-2 border rounded" required />
      <input name="height" placeholder="Высота (см)" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="age" placeholder="Возраст (мес.)" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="climate" placeholder="Климат" onChange={handleChange} className="w-full p-2 border rounded" />
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="inSoil" checked={data.inSoil} onChange={handleChange} />
        <span>Посажено в землю</span>
      </label>
      <input name="quantity" type="number" min="1" placeholder="Количество" onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="description" placeholder="Описание" onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full" required />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Сгенерировать QR-код</button>
      {qrUrl && <QRCodeGenerator value={qrUrl} />}
    </form>
  );
}
