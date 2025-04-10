export default interface IService {
  name: string;
  description: string;
  categoryId: string;
  images: string[];
  price: number;
  datesAvailable: Date[];
  isActive: boolean;
}
