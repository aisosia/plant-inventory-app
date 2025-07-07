import QRCode from 'react-qr-code';

export default function QRCodeGenerator({ value }: { value: string }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg">QR-код для клиента</h2>
      <QRCode value={value} size={200} />
      <p className="break-all">{value}</p>
    </div>
  );
}
