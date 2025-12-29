import { Channel } from "./Channel";
import { File } from "./File";
import { User } from "./User";

export interface Chat {
    id: string;
    title: string;
    channel: Channel["id"] | null;
    user: User["id"] | null;
    description: string | null;
    photo: File["id"] | null;
}
