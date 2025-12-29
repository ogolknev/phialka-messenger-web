import { File } from "./File";
import { Server } from "./Server";

export interface Channel {
    id: string;
    server: Server["id"];
    title: string;
    description: string | null;
    photo: File["id"] | null;
}
