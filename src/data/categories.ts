export interface MenuCategory {
    id: string;
    name: string;
}

export const categories: MenuCategory[] = [
    { id: 'all', name: 'All Items' },
    { id: 'biryani', name: 'Biryani' },
    { id: 'curries', name: 'Curries' },
    { id: 'meals', name: 'Meals' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
];
