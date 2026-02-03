import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Button } from "./button";
import { Sun, MoonStar } from "lucide-react";

export default function ThemeButton() {
  return (
    <>
      <ButtonGroup className="rounded-4xl">
        <Button>
          <Sun />
        </Button>
        <Button>
          <MoonStar />
        </Button>
      </ButtonGroup>
    </>
  );
}
