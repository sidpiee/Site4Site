import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  return (
    <Field className="max-w-sm ">
      <InputGroup className="bg-slate-200/50 dark:border-blue-500 border-blue-300">
        <InputGroupInput id="inline-end" placeholder="Titanic..." />
        <InputGroupAddon align="inline-end">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
