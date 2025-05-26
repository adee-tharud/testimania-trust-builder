
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateConfig, generateEmbedCode } from '../store/slices/widgetSlice';
import WidgetPreview from '../components/Widget/WidgetPreview';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Copy, Code } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const WidgetPage = () => {
  const dispatch = useAppDispatch();
  const { config, embedCode } = useAppSelector((state) => state.widget);

  const handleConfigChange = (key: string, value: any) => {
    dispatch(updateConfig({ [key]: value }));
  };

  const handleGenerateCode = () => {
    dispatch(generateEmbedCode());
    toast({
      title: 'Embed code generated!',
      description: 'Your widget embed code is ready to use.',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: 'Copied!',
      description: 'Embed code copied to clipboard.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Widget Customization</h1>
        <p className="text-gray-600">Customize and generate your testimonial widget</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Widget Settings</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="layout">Layout</Label>
                <Select value={config.layout} onValueChange={(value) => handleConfigChange('layout', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select value={config.theme} onValueChange={(value) => handleConfigChange('theme', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="maxTestimonials">Max Testimonials to Show</Label>
                <Input
                  id="maxTestimonials"
                  type="number"
                  value={config.maxTestimonials}
                  onChange={(e) => handleConfigChange('maxTestimonials', parseInt(e.target.value))}
                  min={1}
                  max={20}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showRating">Show Ratings</Label>
                <Switch
                  id="showRating"
                  checked={config.showRating}
                  onCheckedChange={(checked) => handleConfigChange('showRating', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showDate">Show Dates</Label>
                <Switch
                  id="showDate"
                  checked={config.showDate}
                  onCheckedChange={(checked) => handleConfigChange('showDate', checked)}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Styling</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                    className="w-12 h-10"
                  />
                  <Input
                    value={config.primaryColor}
                    onChange={(e) => handleConfigChange('primaryColor', e.target.value)}
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                    className="w-12 h-10"
                  />
                  <Input
                    value={config.backgroundColor}
                    onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="borderRadius">Border Radius (px)</Label>
                <Input
                  id="borderRadius"
                  type="number"
                  value={config.borderRadius}
                  onChange={(e) => handleConfigChange('borderRadius', parseInt(e.target.value))}
                  min={0}
                  max={20}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Embed Code</h3>
            
            <div className="space-y-4">
              <Button onClick={handleGenerateCode} className="w-full">
                <Code className="w-4 h-4 mr-2" />
                Generate Embed Code
              </Button>
              
              {embedCode && (
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    {embedCode}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:sticky lg:top-6">
          <WidgetPreview />
        </div>
      </div>
    </div>
  );
};

export default WidgetPage;
