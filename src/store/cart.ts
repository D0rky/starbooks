import {computed, map} from 'nanostores'
import type { Book, CartItem } from '../types'
import { object } from 'astro/zod';

export const $cart = map<Record<number, CartItem>>({});


export function addBookToCart(book: Book) {
    const cartItem = $cart.get()[book.id];
    const quantity = cartItem ? cartItem.quantity : 0;


    $cart.setKey(book.id, {item: book, quantity: quantity + 1});
}


export function removeBookFromCart(itemId: number) {
    // @ts-ignore
    $cart.setKey(itemId, undefined);
}

export const total = computed($cart, (entries) => {
    let total = 0;
    Object.values(entries).forEach((entry) => {
        if (!entry) return;

        total += entry.quantity * entry.item.price;
    })
    return total;
})