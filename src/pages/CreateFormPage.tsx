
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Card } from '../components/ui/card';
import { Plus, Trash2, Eye, Copy, Settings } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'rating' | 'textarea' | 'checkbox';
  label: string;
  required: boolean;
  placeholder?: string;
}

interface FormConfig {
  title: string;
  description: string;
  fields: FormField[];
  thankYouMessage: string;
  collectEmail: boolean;
  requireApproval: boolean;
}

const CreateFormPage = () => {
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: 'Share Your Experience',
    description: 'We\'d love to hear about your experience with our service!',
    fields: [
      {
        id: '1',
        type: 'text',
        label: 'Your Name',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        id: '2',
        type: 'rating',
        label: 'Overall Rating',
        required: true
      },
      {
        id: '3',
        type: 'textarea',
        label: 'Your Testimonial',
        required: true,
        placeholder: 'Tell us about your experience...'
      }
    ],
    thankYouMessage: 'Thank you for your feedback! We appreciate you taking the time to share your experience.',
    collectEmail: true,
    requireApproval: true
  });

  const [previewMode, setPreviewMode] = useState(false);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: type === 'textarea' ? 'Enter your response...' : 'Enter value...'
    };
    setFormConfig(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    }));
  };

  const removeField = (id: string) => {
    setFormConfig(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== id)
    }));
  };

  const generateEmbedCode = () => {
    const embedCode = `<iframe src="https://testimonialpro.netlify.app/form/${Date.now()}" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    alert('Embed code copied to clipboard!');
  };

  if (previewMode) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Form Preview</h1>
          <Button onClick={() => setPreviewMode(false)} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Edit Form
          </Button>
        </div>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{formConfig.title}</h2>
              <p className="text-gray-600 mt-2">{formConfig.description}</p>
            </div>
            
            <div className="space-y-4">
              {formConfig.collectEmail && (
                <div>
                  <Label htmlFor="preview-email">Email Address *</Label>
                  <Input id="preview-email" type="email" placeholder="your@email.com" className="mt-1" />
                </div>
              )}
              
              {formConfig.fields.map((field) => (
                <div key={field.id}>
                  <Label htmlFor={`preview-${field.id}`}>
                    {field.label} {field.required && '*'}
                  </Label>
                  {field.type === 'text' && (
                    <Input 
                      id={`preview-${field.id}`} 
                      placeholder={field.placeholder} 
                      className="mt-1" 
                    />
                  )}
                  {field.type === 'email' && (
                    <Input 
                      id={`preview-${field.id}`} 
                      type="email" 
                      placeholder={field.placeholder} 
                      className="mt-1" 
                    />
                  )}
                  {field.type === 'textarea' && (
                    <Textarea 
                      id={`preview-${field.id}`} 
                      placeholder={field.placeholder} 
                      className="mt-1" 
                    />
                  )}
                  {field.type === 'rating' && (
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  )}
                  {field.type === 'checkbox' && (
                    <div className="flex items-center space-x-2 mt-1">
                      <Checkbox id={`preview-${field.id}`} />
                      <Label htmlFor={`preview-${field.id}`}>{field.placeholder}</Label>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button className="w-full">Submit Testimonial</Button>
            
            <div className="text-sm text-gray-500 text-center">
              {formConfig.requireApproval && 'Your testimonial will be reviewed before being published.'}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Testimonial Form</h1>
          <p className="text-gray-600">Design a custom form to collect testimonials from your customers</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setPreviewMode(true)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={generateEmbedCode}>
            <Copy className="w-4 h-4 mr-2" />
            Get Embed Code
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Form Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={formConfig.title}
                  onChange={(e) => setFormConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="form-description">Description</Label>
                <Textarea
                  id="form-description"
                  value={formConfig.description}
                  onChange={(e) => setFormConfig(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="thank-you">Thank You Message</Label>
                <Textarea
                  id="thank-you"
                  value={formConfig.thankYouMessage}
                  onChange={(e) => setFormConfig(prev => ({ ...prev, thankYouMessage: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="collect-email"
                  checked={formConfig.collectEmail}
                  onCheckedChange={(checked) => 
                    setFormConfig(prev => ({ ...prev, collectEmail: checked as boolean }))
                  }
                />
                <Label htmlFor="collect-email">Collect email addresses</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="require-approval"
                  checked={formConfig.requireApproval}
                  onCheckedChange={(checked) => 
                    setFormConfig(prev => ({ ...prev, requireApproval: checked as boolean }))
                  }
                />
                <Label htmlFor="require-approval">Require approval before publishing</Label>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Form Fields</h3>
            <div className="space-y-4">
              {formConfig.fields.map((field) => (
                <div key={field.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{field.label}</span>
                    <Button
                      onClick={() => removeField(field.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`label-${field.id}`}>Label</Label>
                      <Input
                        id={`label-${field.id}`}
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
                      <Input
                        id={`placeholder-${field.id}`}
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Checkbox
                      id={`required-${field.id}`}
                      checked={field.required}
                      onCheckedChange={(checked) => 
                        updateField(field.id, { required: checked as boolean })
                      }
                    />
                    <Label htmlFor={`required-${field.id}`}>Required field</Label>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Add Fields</h3>
            <div className="space-y-2">
              <Button
                onClick={() => addField('text')}
                variant="outline"
                className="w-full justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                Text Field
              </Button>
              <Button
                onClick={() => addField('email')}
                variant="outline"
                className="w-full justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                Email Field
              </Button>
              <Button
                onClick={() => addField('textarea')}
                variant="outline"
                className="w-full justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                Long Text
              </Button>
              <Button
                onClick={() => addField('rating')}
                variant="outline"
                className="w-full justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                Star Rating
              </Button>
              <Button
                onClick={() => addField('checkbox')}
                variant="outline"
                className="w-full justify-start"
              >
                <Plus className="w-4 h-4 mr-2" />
                Checkbox
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Form Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Fields:</span>
                <span className="font-medium">{formConfig.fields.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Required Fields:</span>
                <span className="font-medium">
                  {formConfig.fields.filter(f => f.required).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email Collection:</span>
                <span className="font-medium">
                  {formConfig.collectEmail ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateFormPage;
