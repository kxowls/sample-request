'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 장바구니에 들어갈 책 타입 정의
export type CartItem = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  image: string;
};

// 장바구니 컨텍스트 타입 정의
type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
};

// 장바구니 컨텍스트 생성
const CartContext = createContext<CartContextType | null>(null);

// 장바구니 컨텍스트 프로바이더 컴포넌트
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 장바구니에 아이템 추가
  const addItem = (item: CartItem) => {
    // 이미 있는 아이템이면 추가하지 않음
    if (isInCart(item.id)) {
      return;
    }
    setItems((prev) => [...prev, item]);
  };

  // 장바구니에서 아이템 제거
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 장바구니 비우기
  const clearCart = () => {
    setItems([]);
  };

  // 장바구니에 특정 아이템이 있는지 확인
  const isInCart = (id: string) => {
    return items.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 장바구니 컨텍스트 사용을 위한 훅
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 