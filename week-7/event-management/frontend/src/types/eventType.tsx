type CreatedBy = {
  _id: string;
  name: string;
  email: string;
};

export interface EventType {
  _id: string;
  _v: string;
  updatedAt: string;
  createdAt: string;
  createdBy: CreatedBy;
  venueImageKey: string;
  venueImageUrl?:string;
  title: string;
  description: string;
  date: string;
  venue: string;
  capacity: number;
  status: "draft" | "published";
  bannerUrl?: string | null;
}
