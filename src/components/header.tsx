import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="font-extrabold text-4xl text-primary">
        Gerenciador Control iD
      </h1>
      <ModeToggle />
    </header>
  );
}
