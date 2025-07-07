import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useEffect, useState } from 'react';
export default function ViewPage() {
  const { query } = useRouter();
  const [plant, setPlant] = useState(null);
  useEffect(() => {
    if (!query.id) return;
    getDoc(doc(db, 'plants', query.id)).then(snap => {
      if (snap.exists()) setPlant(snap.data());
    });
  }, [query]);
  if (!plant) return <p>Загрузка…</p>;
  return (
    <div className="p-4 max-w-md mx-auto">
      <img src="/logo.png" alt="Logo" className="h-12 mb-4" />
      <h1 className="text-2xl font-bold">{plant.name}</h1>
      <img src={plant.photoURL} alt={plant.name} className="rounded mb-4" />
      <p><strong>Количество:</strong> {plant.quantity}</p>
      <p><strong>Высота:</strong> {plant.height} см</p>
      <p><strong>Возраст:</strong> {plant.age} мес.</p>
      <p><strong>Климат:</strong> {plant.climate}</p>
      <p><strong>В земле:</strong> {plant.inSoil ? "Да" : "Нет"}</p>
      <p>{plant.description}</p>
    </div>
  );
}
