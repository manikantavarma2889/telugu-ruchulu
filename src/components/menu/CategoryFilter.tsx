import { categories } from "@/data/mockData";

interface CategoryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <nav aria-label="Food categories" className="w-full overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-3 no-scrollbar" role="list">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    return (
                        <button
                            key={category.id}
                            type="button"
                            role="listitem"
                            aria-pressed={isSelected}
                            aria-label={`Filter by ${category.name}${isSelected ? ", selected" : ""}`}
                            onClick={() => onSelectCategory(category.id)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] sm:text-sm font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isSelected
                                ? "bg-[#3d4152] text-white border-[#3d4152] shadow-sm scale-95"
                                : "bg-white text-[#3d4152] border-gray-200 hover:border-gray-400"
                                }`}
                        >
                            {category.name}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
