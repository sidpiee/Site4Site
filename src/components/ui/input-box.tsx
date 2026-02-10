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
      className="bg-card p-5 w-100 h-50 rounded-2xl absolute top-full mt-3 left-0 z-50
"
    >
      <form action={takeinput} className="flex flex-col items-start gap-8">
        <FieldGroup className="grid max-w-sm grid-cols-2">
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
        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </form>
    </div>
  );
}
