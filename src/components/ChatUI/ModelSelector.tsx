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
import { useModelContext } from './ModelContext';

const modelGroups = [
  {
    label: 'OpenAI',
    models: [
      { label: 'o1-mini', value: 'o1-mini' },
      { label: 'GPT-4o', value: 'gpt-4o' },
      { label: 'GPT-4o-Mini', value: 'gpt-4o-mini' },
    ],
  },
  {
    label: 'OpenAI Legacy',
    models: [
      { label: 'GPT-3.5-Turbo-0613', value: 'gpt-3.5-turbo-0613' },
      { label: 'GPT-3.5-Turbo', value: 'gpt-3.5-turbo' },
      { label: 'GPT-4-0613', value: 'gpt-4-0613' },
      { label: 'GPT-4-Turbo', value: 'gpt-4-turbo' },
    ],
  },
] as const;

type ModelValues = typeof modelGroups[number]['models'][number]['value'];

export const DEFAULT_MODEL: ModelValues = 'gpt-4o-mini';
export const ModelSelector = () => {
  const { selectedModel, setSelectedModel } = useModelContext();

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
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

