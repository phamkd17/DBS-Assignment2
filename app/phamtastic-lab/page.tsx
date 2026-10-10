import type { Metadata } from "next";
import { lineAndStoneFonts } from "@/lib/fonts";
import Lab from "./lab";

export const metadata: Metadata = {
  title: "The Phamtastic Culinary Lab",
  description: "Bring three ingredients, learn why it works, and build your own creation.",
};

export default function Page() {
  return (
    <div className={lineAndStoneFonts}>
      <Lab />
    </div>
  );
}
