export interface EventType {
  _id: string;
  _v: string;
  updatedAt: string;
  createdAt: string;
  createdBy: { _i: string; name: string; email: string };
  venueImageKey:;
  title: string;
  description: string;
  date: string;
  venue: string;
  capacity: number;
  status: "draft" | "published";
  bannerUrl?: string | null;
}
