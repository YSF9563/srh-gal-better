'use client';
import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';

export function ImageGallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    const savedImages = localStorage.getItem('gallery-images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gallery-images', JSON.stringify(images));
  }, [images]);

  const handleSearch = (searchTerm) => {
    const filtered = images.filter(img => 
      img.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  };

  const handleUpload = (newImage) => {
    setImages(prev => [...prev, newImage]);
    setFilteredImages(prev => [...prev, newImage]);
  };

  const handleDelete = (imageId, password) => {
    if (password === 'ILOVESARAH') {
      setImages(prev => prev.filter(img => img.id !== imageId));
      setFilteredImages(prev => prev.filter(img => img.id !== imageId));
    } else {
      alert('Incorrect password!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <ImageUpload onUpload={handleUpload} />
      </div>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      <ImageGrid 
        images={filteredImages.length > 0 ? filteredImages : images} 
        onDelete={handleDelete}
      />
    </div>
  );
}