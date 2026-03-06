-- 1. Create Categories Table (optional, or use as enum/metadata)
-- For now, we'll keep it simple and focus on Menu Items and Orders.

-- 2. Create Menu Items Table
CREATE TABLE menu_items (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    is_veg BOOLEAN DEFAULT true,
    rating DECIMAL(2, 1) DEFAULT 4.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Orders Table
CREATE TABLE orders (
    id TEXT PRIMARY KEY, 
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_method TEXT,
    is_new BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Order Items Table (for relational data)
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id BIGINT REFERENCES menu_items(id),
    quantity INTEGER NOT NULL,
    price_at_order DECIMAL(10, 2) NOT NULL
);

-- 5. Enable Real-time for Orders
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- 6. Insert initial data (Seed)
INSERT INTO menu_items (name, description, price, category, image_url, is_veg, rating)
VALUES 
('Hyderabadi Dum Biryani', 'Authentic long-grain basmati rice cooked with succulent meat and traditional spices.', 320, 'Biryanis', 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80', false, 4.8),
('Guntur Karam Chicken', 'Spicy pan-seared chicken with ground Guntur chilies and curry leaves.', 280, 'Starters', 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80', false, 4.6),
('Pesarattu Upma', 'Green gram crepe stuffed with semolina upma, served with ginger chutney.', 120, 'Breakfast', 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80', true, 4.5),
('Gongura Paneer', 'Cottage cheese cubes tossed in spicy and tangy sorrel leaves gravy.', 260, 'Main Course', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80', true, 4.4);
