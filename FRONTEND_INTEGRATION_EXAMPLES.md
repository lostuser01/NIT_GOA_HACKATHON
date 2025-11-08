# Frontend Integration Examples

> Step-by-step code examples for integrating the 4 new features into your Next.js app

---

## Table of Contents

1. [Multi-Photo Upload in Report Form](#1-multi-photo-upload-in-report-form)
2. [Ward Selector Integration](#2-ward-selector-integration)
3. [Before/After Photos Display](#3-beforeafter-photos-display)
4. [Admin Panel Integration](#4-admin-panel-integration)
5. [Ward-Based Filtering](#5-ward-based-filtering)

---

## 1. Multi-Photo Upload in Report Form

### Update `app/report/page.tsx`

```typescript
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, X } from 'lucide-react';

export default function ReportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    ward: "",
    description: "",
    photos: [] as File[]
  });

  // Handle multiple file selection
  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate total size (50MB max)
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 50 * 1024 * 1024) {
      alert("Total file size should not exceed 50MB");
      return;
    }
    
    setFormData({ ...formData, photos: files });
  };

  // Upload photos to Cloudinary
  const uploadPhotos = async (files: File[]): Promise<string[]> => {
    const data = new FormData();
    files.forEach(file => data.append('files', file));
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    
    if (!res.ok) throw new Error('Upload failed');
    
    const result = await res.json();
    return result.urls;
  };

  // Submit issue with photos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 1. Upload photos first
      let photoUrls: string[] = [];
      if (formData.photos.length > 0) {
        photoUrls = await uploadPhotos(formData.photos);
      }
      
      // 2. Create issue with photo URLs
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          beforePhotoUrls: photoUrls,
          location: `${location.lat}, ${location.lng}`,
          coordinates: { lat: location.lat, lng: location.lng }
        }),
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Failed to create issue');
      
      router.push('/map');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to report issue');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... other form fields ... */}
      
      {/* Photo Upload Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Upload Photos (Optional)
        </label>
        
        {formData.photos.length > 0 ? (
          <div className="space-y-3">
            {/* Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {formData.photos.map((file, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    onClick={() => {
                      const newPhotos = formData.photos.filter((_, i) => i !== index);
                      setFormData({ ...formData, photos: newPhotos });
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add More Button */}
            <button
              type="button"
              onClick={() => document.getElementById('photos')?.click()}
              className="w-full p-2 border-2 border-dashed rounded-lg hover:bg-gray-50"
            >
              Add More Photos
            </button>
          </div>
        ) : (
          /* Upload Dropzone */
          <label 
            htmlFor="photos"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <Camera className="w-12 h-12 mb-3 text-gray-400" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> multiple photos
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 50MB total)</p>
          </label>
        )}
        
        <input
          id="photos"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleMultipleImages}
        />
      </div>
      
      <button type="submit">Submit Issue</button>
    </form>
  );
}
```

---

## 2. Ward Selector Integration

### Add Ward Dropdown to Report Form

```typescript
import { WARDS } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Add to your form:
<div className="space-y-2">
  <Label htmlFor="ward">Ward/District *</Label>
  <Select
    value={formData.ward}
    onValueChange={(value) => setFormData({ ...formData, ward: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select your ward" />
    </SelectTrigger>
    <SelectContent>
      {WARDS.map((ward) => (
        <SelectItem key={ward} value={ward}>
          {ward}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
```

---

## 3. Before/After Photos Display

### Use the BeforeAfterPhotos Component

```typescript
import { BeforeAfterPhotos } from '@/components/before-after-photos';

export default function IssueDetailPage({ issue }: { issue: Issue }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
      <p className="text-gray-600 mb-6">{issue.description}</p>
      
      {/* Display Before/After Photos */}
      {issue.beforePhotoUrls && (
        <BeforeAfterPhotos
          beforeUrls={issue.beforePhotoUrls}
          afterUrls={issue.afterPhotoUrls}
          issueTitle={issue.title}
          status={issue.status}
        />
      )}
      
      {/* Other issue details */}
    </div>
  );
}
```

---

## 4. Admin Panel Integration

### Add After Photos When Resolving Issues

```typescript
'use client';

import { useState } from 'react';

export function ResolveIssueModal({ issue, onClose }: { issue: Issue; onClose: () => void }) {
  const [afterPhotos, setAfterPhotos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleResolve = async () => {
    setUploading(true);
    
    try {
      // 1. Upload after photos
      let afterPhotoUrls: string[] = [];
      
      if (afterPhotos.length > 0) {
        const formData = new FormData();
        afterPhotos.forEach(file => formData.append('files', file));
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });
        
        const uploadData = await uploadRes.json();
        afterPhotoUrls = uploadData.urls;
      }
      
      // 2. Update issue with after photos
      const updateRes = await fetch(`/api/issues/${issue.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'resolved',
          afterPhotoUrls
        }),
        credentials: 'include'
      });
      
      if (!updateRes.ok) throw new Error('Failed to update');
      
      alert('Issue resolved successfully!');
      onClose();
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to resolve issue');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Resolve Issue</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Upload After Photos (Optional)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setAfterPhotos(Array.from(e.target.files || []))}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleResolve}
            disabled={uploading}
            className="flex-1 bg-green-500 text-white p-2 rounded"
          >
            {uploading ? 'Uploading...' : 'Mark as Resolved'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Ward-Based Filtering

### Filter Issues by Ward in Map/Dashboard

```typescript
'use client';

import { useState, useEffect } from 'react';
import { WARDS } from '@/lib/types';

export default function MapPage() {
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, [selectedWard]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedWard) params.append('ward', selectedWard);
      
      const res = await fetch(`/api/issues?${params}`);
      const data = await res.json();
      
      if (data.success) {
        setIssues(data.data.issues);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Ward Filter */}
      <div className="mb-4">
        <Select value={selectedWard} onValueChange={setSelectedWard}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter by Ward" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Wards</SelectItem>
            {WARDS.map((ward) => (
              <SelectItem key={ward} value={ward}>
                {ward}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Map and Issues Display */}
      {loading ? (
        <p>Loading issues...</p>
      ) : (
        <div>
          {/* Your map component */}
          <Map issues={issues} />
          
          {/* Issues list */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Showing {issues.length} issue(s)
              {selectedWard && ` in ${selectedWard}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 6. Admin Ward Analytics Display

### Show Ward Performance in Admin Panel

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function WardAnalytics() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await fetch('/api/admin/stats', {
      credentials: 'include'
    });
    
    const data = await res.json();
    if (data.success) {
      setStats(data.data);
    }
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ward Performance</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ward</TableHead>
            <TableHead>Total Issues</TableHead>
            <TableHead>Resolved</TableHead>
            <TableHead>Resolution Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.wardPerformance.map((ward: any) => (
            <TableRow key={ward.ward}>
              <TableCell className="font-medium">{ward.ward}</TableCell>
              <TableCell>{ward.total}</TableCell>
              <TableCell>{ward.resolved}</TableCell>
              <TableCell>
                <Badge 
                  variant={parseFloat(ward.resolutionRate) > 50 ? 'default' : 'destructive'}
                >
                  {ward.resolutionRate}%
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

---

## Quick API Usage Reference

### Upload Photos
```typescript
const uploadPhotos = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  
  const { urls } = await res.json();
  return urls;
};
```

### Create Issue with Ward + Photos
```typescript
const createIssue = async (data: CreateIssueData) => {
  const res = await fetch('/api/issues', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      category: data.category,
      ward: data.ward,
      beforePhotoUrls: data.photoUrls,
      location: data.location,
      coordinates: data.coordinates
    }),
    credentials: 'include'
  });
  
  return await res.json();
};
```

### Update Issue with After Photos
```typescript
const resolveIssue = async (issueId: string, afterPhotoUrls: string[]) => {
  const res = await fetch(`/api/issues/${issueId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'resolved',
      afterPhotoUrls
    }),
    credentials: 'include'
  });
  
  return await res.json();
};
```

### Filter by Ward
```typescript
const getIssuesByWard = async (ward: string) => {
  const params = new URLSearchParams({ ward });
  const res = await fetch(`/api/issues?${params}`);
  return await res.json();
};
```

---

**All examples are production-ready! Just copy-paste and adjust styling as needed.**

For complete API documentation, see [README.md](./README.md).
For quick reference, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md).