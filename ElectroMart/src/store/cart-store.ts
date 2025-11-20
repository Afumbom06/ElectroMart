import { create } from 'zustand';
import { Laptop } from './products';
import { toast } from 'sonner@2.0.3';

export interface CartItem extends Laptop {
  quantity: number;
  selectedColor: string;
  cartItemId: string; // Unique identifier combining id and color
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (laptop: Laptop, color: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (laptop, color) => {
    const cartItemId = `${laptop.id}-${color}`;
    set((state) => {
      const existingItem = state.items.find(
        item => item.cartItemId === cartItemId
      );
      
      if (existingItem) {
        toast.success(`Added another ${laptop.name} to cart`, {
          description: `${color} • Quantity: ${existingItem.quantity + 1}`
        });
        return {
          items: state.items.map(item =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      toast.success(`${laptop.name} added to cart!`, {
        description: `${color} • $${laptop.price.toLocaleString()}`
      });
      
      return {
        items: [...state.items, { ...laptop, quantity: 1, selectedColor: color, cartItemId }]
      };
    });
  },
  
  removeItem: (cartItemId) => {
    const item = get().items.find(i => i.cartItemId === cartItemId);
    if (item) {
      toast.error(`${item.name} removed from cart`, {
        description: item.selectedColor
      });
    }
    set((state) => ({
      items: state.items.filter(item => item.cartItemId !== cartItemId)
    }));
  },
  
  updateQuantity: (cartItemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(cartItemId);
      return;
    }
    
    set((state) => ({
      items: state.items.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    }));
  },
  
  clearCart: () => set({ items: [] }),
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  }
}));
