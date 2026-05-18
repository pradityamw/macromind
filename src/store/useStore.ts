import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedItem {
  id: string;
  title: string;
  type: 'article' | 'module';
  url: string;
  savedAt: number;
}

interface UserProfile {
  name: string;
  interest: 'Tech' | 'Economy' | 'Both';
  level: string;
  xp: number;
}

interface AppState {
  profile: UserProfile;
  savedItems: SavedItem[];
  setProfile: (profile: Partial<UserProfile>) => void;
  saveItem: (item: Omit<SavedItem, 'savedAt'>) => void;
  removeItem: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: {
        name: 'Trader Joe',
        interest: 'Both',
        level: 'Curious Learner',
        xp: 120,
      },
      savedItems: [],
      setProfile: (newProfile) => 
        set((state) => ({ profile: { ...state.profile, ...newProfile } })),
      saveItem: (item) => {
        const currentItems = get().savedItems;
        if (!currentItems.some(i => i.id === item.id)) {
          set({ savedItems: [...currentItems, { ...item, savedAt: Date.now() }] });
        }
      },
      removeItem: (id) => 
        set((state) => ({ savedItems: state.savedItems.filter(i => i.id !== id) })),
      isSaved: (id) => get().savedItems.some(i => i.id === id),
    }),
    {
      name: 'macromind-storage',
    }
  )
);
