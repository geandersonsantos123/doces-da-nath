"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import {
  addOrGroupCartItem,
  calculateCartSubtotalCents,
  createCartItemIdentity,
} from "@/lib/cart-calculations";
import {
  createEmptyCartState,
  deserializeCart,
  serializeCart,
} from "@/lib/cart-storage";
import type { CartItem, CartOrderDetails, CartState } from "@/types/cart";

const CART_STORAGE_KEY = "doces-da-nath:cart:v1";

type CartContextValue = {
  cart: CartState;
  itemCount: number;
  subtotalCents: number;
  isHydrated: boolean;
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  updateItemQuantity: (identity: string, quantity: number) => void;
  removeItem: (identity: string) => void;
  clearCart: () => void;
  updateOrderDetails: (details: Partial<CartOrderDetails>) => void;
  openCart: (trigger?: HTMLElement | null) => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartState>(createEmptyCartState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let storedState = createEmptyCartState();

    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart !== null) {
        storedState = deserializeCart(storedCart);
      }
    } catch {
      storedState = createEmptyCartState();
    }

    queueMicrotask(() => {
      if (!isCancelled) {
        setCart(storedState);
        setIsHydrated(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(cart));
    } catch {
      // The in-memory cart remains usable when browser storage is unavailable.
    }
  }, [cart, isHydrated]);

  const addItem = useCallback((item: CartItem) => {
    setCart((current) => ({
      ...current,
      items: addOrGroupCartItem(current.items, item),
    }));
  }, []);

  const updateItemQuantity = useCallback(
    (identity: string, quantity: number) => {
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        return;
      }

      setCart((current) => ({
        ...current,
        items: current.items.map((item) =>
          createCartItemIdentity(item) === identity
            ? { ...item, quantity }
            : item,
        ),
      }));
    },
    [],
  );

  const removeItem = useCallback((identity: string) => {
    setCart((current) => ({
      ...current,
      items: current.items.filter(
        (item) => createCartItemIdentity(item) !== identity,
      ),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart(createEmptyCartState());
  }, []);

  const updateOrderDetails = useCallback(
    (details: Partial<CartOrderDetails>) => {
      setCart((current) => ({
        ...current,
        order: {
          ...current.order,
          ...details,
        },
      }));
    },
    [],
  );

  const openCart = useCallback((trigger?: HTMLElement | null) => {
    if (trigger) {
      cartTriggerRef.current = trigger;
    }
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    requestAnimationFrame(() => cartTriggerRef.current?.focus());
  }, []);

  const itemCount = useMemo(
    () => cart.items.reduce((total, item) => total + item.quantity, 0),
    [cart.items],
  );
  const subtotalCents = useMemo(
    () => calculateCartSubtotalCents(cart.items),
    [cart.items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      itemCount,
      subtotalCents,
      isHydrated,
      isCartOpen,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
      updateOrderDetails,
      openCart,
      closeCart,
    }),
    [
      addItem,
      cart,
      clearCart,
      closeCart,
      isCartOpen,
      isHydrated,
      itemCount,
      openCart,
      removeItem,
      subtotalCents,
      updateOrderDetails,
      updateItemQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart deve ser usado dentro de CartProvider.");
  }

  return context;
}
