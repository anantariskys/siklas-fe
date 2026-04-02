"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const buildPath = (index: number) =>
    "/" + segments.slice(0, index + 1).join("/");

  return (
    <nav className="text-sm text-gray-200">
      <ol className="flex flex-wrap items-center">
        <li>
          <Link href="/" className="font-medium text-gray-100 hover:underline">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const path = buildPath(index);
          const isLast = index === segments.length - 1;
          const name = decodeURIComponent(segment);

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2 text-gray-300">/</span>
              {isLast ? (
                <span className="font-medium capitalize text-gray-100">
                  {name}
                </span>
              ) : (
                <Link
                  href={path}
                  className="capitalize text-gray-200 hover:underline"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
