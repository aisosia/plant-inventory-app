import dynamic from 'next/dynamic';
import PlantForm from '../components/PlantForm';
export default function Home() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Добавление растения</h1>
      <PlantForm />
    </div>
  );
}
