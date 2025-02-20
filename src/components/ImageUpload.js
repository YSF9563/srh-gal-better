'use client';
import { useState } from 'react';

export default function ImageUpload({ onUpload }) {
  const [imageName, setImageName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError('');

    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }
  
    if (!imageName) {
      setError('Please enter a name');
      return;
    }
  
    try {
      // Create file object for Supabase
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Upload to Supabase
      await onUpload({
        name: imageName,
        file: selectedFile,
        type: selectedFile.type
      });

      // Reset form
      setImageName('');
      setSelectedFile(null);
      setPreview(null);
      setError('');
    } catch (error) {
      setError('Error uploading file');
    }
  };
  return (
    <div className="w-full max-w-xl mx-auto backdrop-blur-sm bg-white/90 p-4 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="space-y-4 sm:space-y-6">
        <input
          type="file"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {/* File Selection Area */}
        <div className="group relative border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-10 text-center hover:border-blue-500 transition-all duration-300 hover:bg-blue-50/50">
          <input
            type="file"
            accept="*/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer block">
            <div className="space-y-4">
              <div className="flex justify-center items-center">
                <svg className="w-16 h-16 text-blue-500/70 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-gray-600 font-medium">
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-2 text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">{selectedFile.name}</span>
                  </div>
                ) : (
                  <span className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">Drop your file here</span>
                    <span className="text-sm text-gray-400 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      or click to browse
                    </span>
                  </span>
                )}
              </div>
            </div>
          </label>
        </div>

        {/* File Name Input - enhanced styling */}
        {selectedFile && (
          <div className="space-y-2">
            <label htmlFor="fileName" className="text-sm font-medium text-gray-700 px-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Name your file
            </label>
            <div className="relative">
              <input
                id="fileName"
                type="text"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                placeholder="Enter a memorable name"
                className="w-full pl-10 pr-4 py-3 sm:py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-black placeholder-gray-400 shadow-sm transition-all duration-300 hover:shadow-md font-medium"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Error Message with icon */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Upload Button with enhanced icon */}
        {selectedFile && (
          <button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            <span className="font-semibold">Upload File</span>
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}