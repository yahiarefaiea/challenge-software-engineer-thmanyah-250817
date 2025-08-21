import Link from "next/link";
import { Button } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-100 py-400">
      <h3 className="font-regular">Nothing here ^^</h3>

      <div className="flex items-center gap-0d50">
        <span>Go to</span>
        <Link href="/search">
          <Button size="sm">/search</Button>
        </Link>
        <span>page to see magic.</span>
      </div>
    </div>
  );
}
