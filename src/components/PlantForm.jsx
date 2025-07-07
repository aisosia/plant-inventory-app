import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../utils/firebase';
import QRCode from 'react-qr-code';
export default function PlantForm() {
  const [data, setData] = useState({ name:'', height:'', age:'', climate:'', inSoil:false, quantity:1, description:'', photo:null });
  const [qrUrl, setQrUrl] = useState('');
  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    setData(prev => ({ ...prev, [name]: type==='checkbox'?checked : type==='file'?files[0]:value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const photoRef = ref(storage, `plants/${Date.now()}_${data.photo.name}`);
    await uploadBytes(photoRef, data.photo);
    const photoURL = await getDownloadURL(photoRef);
    const docRef = await addDoc(collection(db,'plants'),{ ...data, photoURL, createdAt:Date.now(), inSoil:data.inSoil });
    const url = `${window.location.origin}/view/${docRef.id}`;
    setQrUrl(url);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required name="name" placeholder="Сорт" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="height" placeholder="Высота" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="age" placeholder="Возраст" onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="climate" placeholder="Климат" onChange={handleChange} className="w-full p-2 border rounded" />
      <label><input type="checkbox" name="inSoil" checked={data.inSoil} onChange={handleChange}/> В земле</label>
      <input type="number" name="quantity" min="1" placeholder="Количество" onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="description" placeholder="Описание" onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full" required />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Сгенерировать QR</button>
      {qrUrl && <div><QRCode value={qrUrl} /><p>{qrUrl}</p></div>}
    </form>
