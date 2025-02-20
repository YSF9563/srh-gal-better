
import Image from "next/image";
import { ImageGallery } from "@/components/ImageGallery";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Image Gallery</h1>
      <ImageGallery />
    </div>
  );
}