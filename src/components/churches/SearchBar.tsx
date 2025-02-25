
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        type="search"
        placeholder="Search by name or location..."
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
<Card className="p-4">
  <div className="flex flex-col gap-2">
    <SearchBar
      value={searchQuery}
      onChange={setSearchQuery}
      placeholder="Search by name, location, or phone..."
    />
    {/* ADD THE GOOGLE SEARCH FORM HERE */}
    <form
      action="https://www.google.com/search"
      method="get"
      target="_blank"
      className="mt-2"
    >
      <input
        type="text"
        name="q"
        placeholder="Search Google"
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
      >
        Search Google
      </button>
    </form>
  </div>
  {/* ... rest of your card content */}
</Card>
