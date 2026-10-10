import type { Metadata } from "next";
import { lineAndStoneFonts } from "@/lib/fonts";
import Showcase from "./showcase";

export const metadata: Metadata = { title: "Line & Stone · Design System" };

export default function Page() {
  return (
    <div className={lineAndStoneFonts}>
      <Showcase />
    </div>
  );
}
