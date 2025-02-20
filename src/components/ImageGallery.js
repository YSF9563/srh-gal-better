'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUpload from './ImageUpload';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';

export function ImageGallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    fetchImages();
    setupRealtime();
  }, []);

  const setupRealtime = () => {
    const channel = supabase
      .channel('images-channel')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'images' }, 
        (payload) => {
          setImages(prev => [payload.new, ...prev].sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          ));
          setFilteredImages(prev => [payload.new, ...prev].sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          ));
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'images' },
        (payload) => {
          setImages(prev => prev.filter(img => img.id !== payload.old.id));
          setFilteredImages(prev => prev.filter(img => img.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setImages(data || []);
      setFilteredImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = images.filter(img => 
      img.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  };

  const handleUpload = async (newImage) => {
    try {
      const { data, error: uploadError } = await supabase
        .storage
        .from('gallery')
        .upload(`${Date.now()}-${newImage.file.name}`, newImage.file);

      if (uploadError) {
        throw new Error('Error uploading file');
      }

      const { data: urlData } = await supabase
        .storage
        .from('gallery')
        .getPublicUrl(data.path);

      const { data: insertedData, error: dbError } = await supabase
        .from('images')
        .insert([{
          name: newImage.name,
          url: urlData.publicUrl,
          type: newImage.type,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (dbError) {
        throw new Error('Error saving image data');
      }

      // Update local state immediately
      setImages(prev => [insertedData, ...prev]);
      setFilteredImages(prev => [insertedData, ...prev]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (imageId, password) => {
    if (password === 'ILOVESARAH') {
      try {
        const { error } = await supabase
          .from('images')
          .delete()
          .eq('id', imageId);

        if (error) throw error;
        
        // Update local state immediately
        setImages(prev => prev.filter(img => img.id !== imageId));
        setFilteredImages(prev => prev.filter(img => img.id !== imageId));
      } catch (error) {
        alert('Error deleting image: ' + error.message);
      }
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