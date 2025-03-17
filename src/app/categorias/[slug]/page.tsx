"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FilterSearch } from "@/components/FilterSearch";
import { ProfessionalSection } from "@/features/category/components/ProfessionalSection";
import { useParams } from "next/navigation";
import { SpecializationsFilterList } from "@/components/SpecializationsFilterList";

export default function Page() {
  const params = useParams();

  const slug = [params.slug].flat().join("/") || "";

  const nameFormatted = decodeURIComponent(slug.replace(/-/g, " "));

  return (
    <main className="flex flex-col gap-6 w-full max-w-[86rem]">
      <div className="flex flex-col gap-3">
        <Link className="w-fit" href="/">
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-semibold capitalize">{nameFormatted}</h1>
        <div className="flex gap-2 ">
          <FilterSearch />
          <SpecializationsFilterList />
        </div>
      </div>
      <ProfessionalSection />
    </main>
  );
}
