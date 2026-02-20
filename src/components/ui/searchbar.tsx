import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
type SearchBarProps = {
  placeholder: string;
};
export function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <Field className="max-w-sm ">
      <InputGroup className="bg-slate-200/50 dark:border-blue-500 border-blue-300 ">
        <InputGroupInput
          id="inline-end"
          placeholder={placeholder}
          className="placeholder:text-gray-500"
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
