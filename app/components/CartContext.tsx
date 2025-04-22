'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  image: string;
  description: string;
  category: string;
  isbn: string;
}

interface CartContextType {
  items: Book[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Book[]>([]);

  // 로컬 스토리지에서 카트 정보 불러오기
  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('장바구니 데이터 파싱 오류:', error);
        setItems([]);
      }
    }
  }, []);

  // 카트 업데이트 시 로컬 스토리지 저장
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (book: Book) => {
    // 이미 카트에 있는지 확인
    if (!isInCart(book.id)) {
      setItems([...items, book]);
    }
  };

  const removeItem = (bookId: string) => {
    setItems(items.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (bookId: string) => {
    return items.some(item => item.id === bookId);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 