import type { Metadata } from "next";
import { trailheadFonts } from "@/lib/fonts";
import Showcase from "./showcase";

export const metadata: Metadata = { title: "Trailhead · Design System" };

export default function Page() {
  return (
    <div className={trailheadFonts}>
      <Showcase />
    </div>
  );
}
