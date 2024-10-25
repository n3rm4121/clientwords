import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { buttonVariants } from './ui/button';

interface QRCodeGeneratorProps {
  url: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  const qrRef = useRef<HTMLDivElement | null>(null);

  const downloadQRCode = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'qr-code.png';
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Dialog>
        <DialogTrigger className={buttonVariants({
          variant: 'default',
          size: 'lg',
          className: 'w-full font-sans relative'
        })} >Show QR Code</DialogTrigger>
        <DialogContent className='p-4'>
          <DialogHeader>
            <DialogTitle>Your QR Code has been generated!</DialogTitle>
            <DialogDescription>
              Share this QR code with your clients to get testimonials.
            </DialogDescription>
          </DialogHeader>

          <div ref={qrRef} className="mb-4">
            <QRCodeCanvas value={url} size={256} />
          </div>
          <button
            onClick={downloadQRCode}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200"
          >
            Download QR Code
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRCodeGenerator;
