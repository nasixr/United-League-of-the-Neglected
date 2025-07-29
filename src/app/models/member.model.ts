export interface Member {
  id: string;
  name: string;
  image: string;
  description: string;
  specialty: string;
  joinDate?: string;
  lateDate?: string;
  sleepQuotes?: string[];
}

export interface TeamData {
  members: Member[];
}