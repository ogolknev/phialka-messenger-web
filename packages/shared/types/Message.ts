import { Chat } from "./Chat";
import { User } from "./User";

export interface Message {
    id: string;
    chat: Chat["id"];
    author: User["id"];
    text: string | null;
    sentAt: Date;
    editedAt: Date | null;
}
