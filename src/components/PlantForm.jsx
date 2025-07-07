import { useState } from "react";
import QRCode from "qrcode.react";
import { addPlant } from "../utils/firebase";

export default function PlantForm() {
  const [formData, setFormData] = useState({
    name: "",
    latinName: "",
    description: "",
    photo: null,
  });
  const [qrUrl, setQrUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await addPlant(formData);
    const url = `${window.location.origin}/view/${id}`;
    setQrUrl(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        name="name"
        placeholder="Название"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        type="text"
        name="latinName"
        placeholder="Латинское название"
        value={formData.latinName}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
        required
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
        Сгенерировать QR
      </button>
      {qrUrl && (
        <div className="mt-4">
          <QRCode value={qrUrl} />
          <p className="text-sm break-all mt-2">{qrUrl}</p>
        </div>
      )}
    </form>
  );
}
