import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { Button } from "./button";
type InputBoxProps = {
  addsection: (title: string, description: string) => void;
};
export default function InputBox({ addsection }: InputBoxProps) {
  function takeinput(formData: FormData): void {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    addsection(title, description);
  }
  return (
    <div
      className="absolute top-full left-0 z-50 mt-3 h-auto w-[calc(100vw-1.5rem)] max-w-md rounded-2xl bg-card p-4 shadow-xl sm:p-5"
    >
      <form action={takeinput} className="flex flex-col items-start gap-5">
        <FieldGroup className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="AI slop"
              name="title"
              className="bg-gray-100"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input
              id="description"
              name="description"
              placeholder="all my AI agents..."
              className="bg-gray-100"
            />
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full cursor-pointer sm:w-auto">
          Submit
        </Button>
      </form>
    </div>
  );
}
