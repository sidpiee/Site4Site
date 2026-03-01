import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
type SearchBarProps = {
  placeholder: string;
  Search: string;
  SetSearch: (value: string) => void;
};
export function SearchBar({ placeholder, Search, SetSearch }: SearchBarProps) {
  return (
    <Field className="max-w-sm ">
      <InputGroup className="bg-slate-200/50 dark:border-blue-500 border-blue-300 ">
        <InputGroupInput
          id="inline-end"
          placeholder={placeholder}
          className="placeholder:text-gray-500"
          value={Search}
          onChange={(e) => SetSearch(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
