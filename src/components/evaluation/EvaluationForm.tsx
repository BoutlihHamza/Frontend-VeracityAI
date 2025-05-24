import React, { useState } from 'react';
import { format } from 'date-fns';
import TextArea from '../common/TextArea';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Toggle from '../common/Toggle';
import { InformationInput } from '../../types';

interface EvaluationFormProps {
  onSubmit: (data: InformationInput) => void;
  isLoading: boolean;
  initialData?: InformationInput;
}

const sourceTypeOptions = [
  { value: 'official', label: 'Official Source' },
  { value: 'news', label: 'News Organization' },
  { value: 'blog', label: 'Blog' },
  { value: 'social', label: 'Social Media' },
  { value: 'unknown', label: 'Unknown Source' }
];

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'de', label: 'German' },
  { value: 'other', label: 'Other' }
];

const EvaluationForm: React.FC<EvaluationFormProps> = ({ 
  onSubmit, 
  isLoading,
  initialData
}) => {
  const [formData, setFormData] = useState<InformationInput>(
    initialData || {
      content: '',
      source: {
        url: '',
        domain: '',
        type: 'unknown',
        reputation: 0.5
      },
      author: {
        name: '',
        credentials: '',
        isAnonymous: false,
        knownExpert: false
      },
      metadata: {
        publicationDate: format(new Date(), 'yyyy-MM-dd'),
        language: 'en',
        hasEmotionalLanguage: false,
        hasCitations: false,
        citationCount: 0,
        hasReferences: false,
        referenceUrls: []
      }
    }
  );
  
  const [referenceUrl, setReferenceUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    min = 0,
    max = Infinity
  ) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) return;
    
    const clampedValue = Math.min(Math.max(numValue, min), max);
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: clampedValue
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: clampedValue }));
    }
  };
  
  const handleToggleChange = (checked: boolean, name: string) => {
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: checked
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
  };
  
  const addReferenceUrl = () => {
    if (!referenceUrl.trim()) return;
    
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        referenceUrls: [...prev.metadata.referenceUrls, referenceUrl.trim()]
      }
    }));
    
    setReferenceUrl('');
  };
  
  const removeReferenceUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        referenceUrls: prev.metadata.referenceUrls.filter((_, i) => i !== index)
      }
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.content.trim()) {
      newErrors['content'] = 'Content is required';
    }
    
    if (formData.metadata.hasCitations && formData.metadata.citationCount <= 0) {
      newErrors['metadata.citationCount'] = 'Citation count must be greater than 0 if citations are present';
    }
    
    if (formData.metadata.hasReferences && formData.metadata.referenceUrls.length === 0) {
      newErrors['referenceUrl'] = 'Reference URLs are required if references are present';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Information Content</h3>
        <TextArea
          label="Content to Evaluate"
          name="content"
          value={formData.content}
          onChange={handleTextChange}
          rows={6}
          placeholder="Enter the information text that you want to evaluate..."
          error={errors.content}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Source Information</h3>
          
          <div className="space-y-4">
            <Input
              label="Source URL (optional)"
              name="source.url"
              type="url"
              value={formData.source.url}
              onChange={handleTextChange}
              placeholder="https://example.com"
            />
            
            <Input
              label="Domain (optional)"
              name="source.domain"
              value={formData.source.domain}
              onChange={handleTextChange}
              placeholder="example.com"
            />
            
            <Select
              label="Source Type"
              name="source.type"
              value={formData.source.type}
              onChange={handleTextChange}
              options={sourceTypeOptions}
            />
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Source Reputation (0-1)
              </label>
              <input
                type="range"
                name="source.reputation"
                min="0"
                max="1"
                step="0.1"
                value={formData.source.reputation}
                onChange={(e) => handleNumberChange(e, 0, 1)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.0</span>
                <span>0.5</span>
                <span>1.0</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Current: {formData.source.reputation}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Author Information</h3>
          
          <div className="space-y-4">
            <Toggle
              label="Anonymous Author"
              id="author-anonymous"
              checked={formData.author.isAnonymous}
              onChange={(checked) => handleToggleChange(checked, 'author.isAnonymous')}
            />
            
            <Input
              label="Author Name (optional)"
              name="author.name"
              value={formData.author.name}
              onChange={handleTextChange}
              disabled={formData.author.isAnonymous}
            />
            
            <Input
              label="Author Credentials (optional)"
              name="author.credentials"
              value={formData.author.credentials}
              onChange={handleTextChange}
              disabled={formData.author.isAnonymous}
            />
            
            <Toggle
              label="Known Expert in Field"
              id="author-expert"
              checked={formData.author.knownExpert}
              onChange={(checked) => handleToggleChange(checked, 'author.knownExpert')}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Content Metadata</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Publication Date"
              name="metadata.publicationDate"
              type="date"
              value={formData.metadata.publicationDate}
              onChange={handleTextChange}
            />
            
            <Select
              label="Language"
              name="metadata.language"
              value={formData.metadata.language}
              onChange={handleTextChange}
              options={languageOptions}
            />
            
            <Toggle
              label="Contains Emotional Language"
              id="emotional-language"
              checked={formData.metadata.hasEmotionalLanguage}
              onChange={(checked) => handleToggleChange(checked, 'metadata.hasEmotionalLanguage')}
            />
          </div>
          
          <div className="space-y-4">
            <Toggle
              label="Has Citations"
              id="has-citations"
              checked={formData.metadata.hasCitations}
              onChange={(checked) => handleToggleChange(checked, 'metadata.hasCitations')}
            />
            
            <Input
              label="Citation Count"
              name="metadata.citationCount"
              type="number"
              min="0"
              value={formData.metadata.citationCount}
              onChange={(e) => handleNumberChange(e, 0)}
              disabled={!formData.metadata.hasCitations}
              error={errors['metadata.citationCount']}
            />
            
            <Toggle
              label="Has References"
              id="has-references"
              checked={formData.metadata.hasReferences}
              onChange={(checked) => handleToggleChange(checked, 'metadata.hasReferences')}
            />
          </div>
        </div>
        
        {formData.metadata.hasReferences && (
          <div className="mt-4">
            <div className="flex items-end space-x-2">
              <Input
                label="Reference URLs"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
                placeholder="https://example.com/reference"
                error={errors.referenceUrl}
                className="flex-grow"
              />
              <Button
                type="button"
                onClick={addReferenceUrl}
                disabled={!referenceUrl.trim()}
                className="mb-1"
              >
                Add
              </Button>
            </div>
            
            {formData.metadata.referenceUrls.length > 0 && (
              <ul className="mt-2 space-y-1">
                {formData.metadata.referenceUrls.map((url, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-grow">
                      {url}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeReferenceUrl(index)}
                      className="text-red-500 hover:text-red-700 ml-2 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      
      <div className="pt-4">
        <Button type="submit" isLoading={isLoading} className="w-full md:w-auto">
          Evaluate Information
        </Button>
      </div>
    </form>
  );
};

export default EvaluationForm;