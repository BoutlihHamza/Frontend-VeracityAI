import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { PrologFact } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';

interface AddFactFormProps {
  onSubmit: (facts: PrologFact[]) => void;
  isLoading: boolean;
}

const AddFactForm: React.FC<AddFactFormProps> = ({ onSubmit, isLoading }) => {
  const [facts, setFacts] = useState<PrologFact[]>([{
    predicate: '',
    arguments: [''],
    comment: ''
  }]);

  const handlePredicateChange = (index: number, value: string) => {
    const newFacts = [...facts];
    newFacts[index].predicate = value;
    setFacts(newFacts);
  };

  const handleArgumentChange = (factIndex: number, argIndex: number, value: string) => {
    const newFacts = [...facts];
    newFacts[factIndex].arguments[argIndex] = value;
    setFacts(newFacts);
  };

  const handleCommentChange = (index: number, value: string) => {
    const newFacts = [...facts];
    newFacts[index].comment = value;
    setFacts(newFacts);
  };

  const addArgument = (factIndex: number) => {
    const newFacts = [...facts];
    newFacts[factIndex].arguments.push('');
    setFacts(newFacts);
  };

  const removeArgument = (factIndex: number, argIndex: number) => {
    const newFacts = [...facts];
    newFacts[factIndex].arguments.splice(argIndex, 1);
    setFacts(newFacts);
  };

  const addFact = () => {
    setFacts([...facts, { predicate: '', arguments: [''], comment: '' }]);
  };

  const removeFact = (index: number) => {
    const newFacts = [...facts];
    newFacts.splice(index, 1);
    setFacts(newFacts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(facts);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {facts.map((fact, factIndex) => (
        <div key={factIndex} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Fact #{factIndex + 1}</h4>
            {facts.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFact(factIndex)}
              >
                Remove Fact
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <Input
              label="Predicate"
              value={fact.predicate}
              onChange={(e) => handlePredicateChange(factIndex, e.target.value)}
              placeholder="e.g., source_type"
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Arguments
              </label>
              {fact.arguments.map((arg, argIndex) => (
                <div key={argIndex} className="flex gap-2">
                  <Input
                    value={arg}
                    onChange={(e) => handleArgumentChange(factIndex, argIndex, e.target.value)}
                    placeholder={`Argument ${argIndex + 1}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArgument(factIndex, argIndex)}
                    disabled={fact.arguments.length <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addArgument(factIndex)}
                leftIcon={<Plus size={16} />}
              >
                Add Argument
              </Button>
            </div>

            <TextArea
              label="Comment (optional)"
              value={fact.comment}
              onChange={(e) => handleCommentChange(factIndex, e.target.value)}
              placeholder="Add a description or comment about this fact"
              rows={2}
            />
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={addFact}
          leftIcon={<Plus size={16} />}
        >
          Add Another Fact
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
        >
          Save Facts
        </Button>
      </div>
    </form>
  );
};

export default AddFactForm;