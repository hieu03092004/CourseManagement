import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

type Props = {
  items: BreadcrumbItem[];
};

export default function BreadCump({ items }: Props) {
  return (
    <div className="bg-[#F5F7FE] py-3 mb-8">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400 text-xl">•</span>}
              <Link
                href={item.href}
                className={`hover:text-primary transition-colors ${
                  item.active
                    ? "text-primary font-medium"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

