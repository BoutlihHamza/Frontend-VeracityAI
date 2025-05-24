import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import TextArea from '../common/TextArea';
import Select from '../common/Select';
import Button from '../common/Button';
import Toggle from '../common/Toggle';
import { InformationInput } from '../../types';

interface BatchItemProps {
  index: number;
  item: InformationInput;
  onChange: (index: number, item: InformationInput) => void;
  onRemove: (index: number) => void;
  isRemovable: boolean;
}

const sourceTypeOptions = [
  { value: 'official', label: 'Official Source' },
  { value: 'news', label: 'News Organization' },
  { value: 'blog', label: 'Blog' },
  { value: 'social', label: 'Social Media' },
  { value: 'unknown', label: 'Unknown Source' }
];

const BatchItem: React.FC<BatchItemProps> = ({
  index,
  item,
  onChange,
  onRemove,
  isRemovable
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(index, { ...item, content: e.target.value });
  };
  
  const handleSourceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(index, { 
      ...item, 
      source: { 
        ...item.source, 
        type: e.target.value as 'official' | 'news' | 'blog' | 'social' | 'unknown'
      } 
    });
  };
  
  const handleReputationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    
    onChange(index, { 
      ...item, 
      source: { 
        ...item.source, 
        reputation: Math.min(Math.max(value, 0), 1)
      } 
    });
  };
  
  const handleToggleChange = (field: string, checked: boolean) => {
    if (field === 'author.isAnonymous') {
      onChange(index, {
        ...item,
        author: {
          ...item.author,
          isAnonymous: checked
        }
      });
    } else if (field === 'author.knownExpert') {
      onChange(index, {
        ...item,
        author: {
          ...item.author,
          knownExpert: checked
        }
      });
    } else if (field === 'metadata.hasEmotionalLanguage') {
      onChange(index, {
        ...item,
        metadata: {
          ...item.metadata,
          hasEmotionalLanguage: checked
        }
      });
    } else if (field === 'metadata.hasCitations') {
      onChange(index, {
        ...item,
        metadata: {
          ...item.metadata,
          hasCitations: checked
        }
      });
    }
  };
  
  return (
    <Card className="overflow-visible">
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
            Item #{index + 1}
          </h4>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {isRemovable && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <TextArea
            value={item.content}
            onChange={handleContentChange}
            rows={3}
            placeholder="Enter information to evaluate..."
          />
        </div>
        
        {expanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label="Source Type"
                value={item.source.type}
                onChange={handleSourceTypeChange}
                options={sourceTypeOptions}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Source Reputation (0-1)
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={item.source.reputation}
                onChange={handleReputationChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="mt-1 text-sm text-gray-500">
                Current: {item.source.reputation}
              </div>
            </div>
            
            <div>
              <Toggle
                label="Anonymous Author"
                id={`anonymous-${index}`}
                checked={item.author.isAnonymous}
                onChange={(checked) => handleToggleChange('author.isAnonymous', checked)}
              />
            </div>
            
            <div>
              <Toggle
                label="Known Expert"
                id={`expert-${index}`}
                checked={item.author.knownExpert}
                onChange={(checked) => handleToggleChange('author.knownExpert', checked)}
              />
            </div>
            
            <div>
              <Toggle
                label="Emotional Language"
                id={`emotional-${index}`}
                checked={item.metadata.hasEmotionalLanguage}
                onChange={(checked) => handleToggleChange('metadata.hasEmotionalLanguage', checked)}
              />
            </div>
            
            <div>
              <Toggle
                label="Has Citations"
                id={`citations-${index}`}
                checked={item.metadata.hasCitations}
                onChange={(checked) => handleToggleChange('metadata.hasCitations', checked)}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BatchItem;