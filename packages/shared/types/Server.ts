import { File } from "./File";

export interface Server {
    id: string;
    title: string;
    description?: string;
    photo: File["id"] | null;
}
