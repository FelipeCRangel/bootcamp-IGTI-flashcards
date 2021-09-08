import { read, exclude, create, edit } from './httpServices';
import { getNewId } from './idService';

export async function apiGetAllFlashCards() {
  const allFlasCards = await read('/flashcards');
  return allFlasCards;
}

export async function apiDeleteAllFlashCards(cardId) {
  await exclude(`/flashcards/${cardId}`);
}

export async function apiCreateAllFlashCards(title, description) {
  const newFlashCard = create('/flashcards', {
    id: getNewId(),
    title,
    description,
  });
  return newFlashCard;
}

export async function apiUpdateAllFlashCards(cardId, title, description) {
  const updatedFlashCard = edit(`/flashcards/${cardId}`, {
    title,
    description,
  });
  return updatedFlashCard;
}
