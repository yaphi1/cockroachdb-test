import { UUID } from "crypto";

export type ListEntry = {
  id: UUID;
  title: string;
  watched: boolean;
  rating?: string | null;
  where_to_watch?: string | null;
};
