export default interface IService {
  name: string;
  description: string;
  images: string[];
  price: number;
  datesAvailabe: Date[];
  isActive: boolean;
}
