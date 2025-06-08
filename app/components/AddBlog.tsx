'use client'

import React, { useState} from "react";

const AddBlogSection: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File>();
  
          const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
        
            // Basic validation
            if (!title || !content || !image) {
              alert('all field are required');
              return;
            }
    
            const formData = new FormData();
            formData.set('file', image);
            formData.set('title', title);
            formData.set('content', content);
        
            // backend call
        
            try {
              const response = await fetch('/api/addBlog', {
                method: 'POST',
                body: formData
              });
        
              const result = await response.json();
              console.log(result)
              if (response.ok) {
                alert('blog added successfully!');
              } else {
                alert(result.message || 'Failed to add blog');
              }
            } catch (error) {
              console.error('Error:', error);
              alert('An error occurred');
            }
            
          };
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-brown-600 mb-6">Add New Blog</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-bold text-brown-600 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-brown-600 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              rows={6}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-brown-600 mb-2">Add Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0])}
              className="w-full px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Add Blog
          </button>
        </form>
      </div>
    );
  };

export default AddBlogSection;