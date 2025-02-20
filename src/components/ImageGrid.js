'use client';
import { useState } from 'react';

export default function ImageGrid({ images, onDelete }) {
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = (imageId) => {
    onDelete(imageId, password);
    setPassword('');
    setSelectedImage(null);
  };

  const handleDownload = (imageUrl, imageName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
      {images.map((image) => (
        <div key={image.id} className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
          <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-900/5">
            {image.type?.startsWith('image/') ? (
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                src={image.url}
                className="w-full h-full object-cover"
                controls
              />
            )}
          </div>
          <h3 className="mt-4 font-semibold text-gray-800 truncate">{image.name}</h3>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleDownload(image.url, image.name)}
              className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            {selectedImage === image.id ? (
              <div className="flex-1 flex items-center gap-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full min-w-0 px-2 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-black"
                />
                <button
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedImage(image.id)}
                className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 font-medium text-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}