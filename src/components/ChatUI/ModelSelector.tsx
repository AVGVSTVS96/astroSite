import type React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@components/ui/select';
import { useModel } from '@hooks/useModel';

const modelGroups = [
  {
    label: 'OpenAI',
    models: [
      { label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo' },
      { label: 'GPT-4-Turbo', value: 'gpt-4-turbo' },
      { label: 'GPT-4o', value: 'gpt-4o' },
    ],
  },
  {
    label: 'OpenAI Legacy',
    models: [
      { label: 'GPT-3.5-Turbo-0613', value: 'gpt-3.5-turbo-0613' },
      { label: 'GPT-4-0613', value: 'gpt-4-0613' },
    ],
  },
];

export const ModelSelector = () => {
  const defaultModel = 'gpt-3.5-turbo';
  const { selectedModel, handleModelChange } = useModel(defaultModel);

  return (
    <Select value={selectedModel} onValueChange={handleModelChange}>
      <SelectTrigger className="w-full focus:ring-ring/20 xs:w-[180px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {modelGroups.map((group, index) => (
          <SelectGroup key={group.label}>
            <SelectLabel className="text-sm font-bold tracking-wide text-foreground">
              {group.label}
            </SelectLabel>
            {group.models.map((item) => (
              <SelectItem
                key={item.value}
                className="text-muted-foreground data-[state=checked]:text-foreground"
                value={item.value}>
                {item.label}
              </SelectItem>
            ))}
            {index < modelGroups.length - 1 && <SelectSeparator />}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
