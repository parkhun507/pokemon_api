export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  liked?: boolean;  // ❤️ 추가
}
