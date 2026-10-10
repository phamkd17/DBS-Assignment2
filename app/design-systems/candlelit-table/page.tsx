import type { Metadata } from "next";
import { candlelitFonts } from "@/lib/fonts";
import Showcase from "./showcase";

export const metadata: Metadata = { title: "Candlelit Table · Design System" };

export default function Page() {
  return (
    <div className={candlelitFonts}>
      <Showcase />
    </div>
  );
}
