import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { MenuItem } from "@/types";
import { categories } from "@/data/mockData";

export function MenuManagement() {
    const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, resetMenuToDefaults } = useStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [formData, setFormData] = useState<Partial<MenuItem>>({
        isVeg: true,
        rating: 4.5
    });

    const handleSubmit = () => {
        if (editingItem) {
            updateMenuItem({ ...editingItem, ...formData } as MenuItem);
        } else {
            addMenuItem(formData as any);
        }
        setIsDialogOpen(false);
        setEditingItem(null);
        setFormData({ isVeg: true, rating: 4.5 });
    };

    const openAdd = () => {
        setEditingItem(null);
        setFormData({ isVeg: true, rating: 4.5 });
        setIsDialogOpen(true);
    }

    const openEdit = (item: MenuItem) => {
        setEditingItem(item);
        setFormData(item);
        setIsDialogOpen(true);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Menu Items</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => {
                        if (confirm('Are you sure you want to reset the menu to default images? All your custom changes will be lost.')) {
                            resetMenuToDefaults();
                        }
                    }}>
                        Reset Defaults
                    </Button>
                    <Button onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-lg overflow-y-auto max-h-[85vh]">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Input
                            placeholder="Item Name"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Textarea
                            placeholder="Description"
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                type="number"
                                placeholder="Price"
                                value={formData.price || ''}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            />
                            <Select
                                value={formData.category}
                                onValueChange={(val) => setFormData({ ...formData, category: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.filter(c => c.id !== 'all').map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            placeholder="Image URL"
                            value={formData.image || ''}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                        <div className="flex items-center gap-2">
                            <label className="text-sm">Vegetarian?</label>
                            <input
                                type="checkbox"
                                checked={formData.isVeg}
                                onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                                className="h-4 w-4"
                            />
                        </div>
                        <Button className="w-full" onClick={handleSubmit}>Save</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="border rounded-md overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="whitespace-nowrap">Image</TableHead>
                            <TableHead className="whitespace-nowrap">Name</TableHead>
                            <TableHead className="whitespace-nowrap">Category</TableHead>
                            <TableHead className="whitespace-nowrap">Price</TableHead>
                            <TableHead className="whitespace-nowrap">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {menuItems.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                                </TableCell>
                                <TableCell className="whitespace-nowrap">{item.name}</TableCell>
                                <TableCell className="capitalize whitespace-nowrap">{item.category}</TableCell>
                                <TableCell className="whitespace-nowrap">Rs. {item.price}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMenuItem(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
