'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function NewSubjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    level: 'L3',
    technologies: '',
    maxStudents: '1',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a subject title',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a description',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.domain.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a domain',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const newSubject = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        maxStudents: parseInt(formData.maxStudents),
        technologies: formData.technologies.split(',').map((t) => t.trim()).filter((t) => t),
        createdAt: new Date().toISOString(),
      };

      console.log('[v0] New subject created:', newSubject);

      toast({
        title: 'Success',
        description: 'Subject created successfully',
      });

      router.push('/teacher/subjects');
    } catch (error) {
      console.error('[v0] Error creating subject:', error);
      toast({
        title: 'Error',
        description: 'Failed to create subject',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">Create New Subject</h1>
          <p className="text-slate-600 mt-2">Add a new subject to your teaching portfolio</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
            <CardDescription>Fill in the details for your new subject</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Subject Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Advanced Web Development"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this subject covers..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  disabled={isLoading}
                  rows={4}
                />
              </div>

              {/* Domain */}
              <div className="space-y-2">
                <Label htmlFor="domain" className="text-sm font-medium">
                  Domain *
                </Label>
                <Input
                  id="domain"
                  placeholder="e.g., Web Development, Data Science"
                  value={formData.domain}
                  onChange={(e) => handleChange('domain', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Level */}
              <div className="space-y-2">
                <Label htmlFor="level" className="text-sm font-medium">
                  Level *
                </Label>
                <Select value={formData.level} onValueChange={(value) => handleChange('level', value)}>
                  <SelectTrigger id="level" disabled={isLoading}>
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L3">L3 (Licence 3)</SelectItem>
                    <SelectItem value="M1">M1 (Master 1)</SelectItem>
                    <SelectItem value="M2">M2 (Master 2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label htmlFor="technologies" className="text-sm font-medium">
                  Technologies (comma-separated)
                </Label>
                <Input
                  id="technologies"
                  placeholder="e.g., React, Node.js, PostgreSQL"
                  value={formData.technologies}
                  onChange={(e) => handleChange('technologies', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Maximum Students */}
              <div className="space-y-2">
                <Label htmlFor="maxStudents" className="text-sm font-medium">
                  Maximum Number of Students *
                </Label>
                <Input
                  id="maxStudents"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="e.g., 5"
                  value={formData.maxStudents}
                  onChange={(e) => handleChange('maxStudents', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Subject'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
