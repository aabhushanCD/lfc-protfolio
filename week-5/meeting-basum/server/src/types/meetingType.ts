export interface Meeting {
  id: number;
  title: string;
  host: string;
  date: string;
}

export type CreateMeetingDto = Omit<Meeting, "id">;
