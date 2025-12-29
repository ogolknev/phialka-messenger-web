import { File } from "./File";

export interface Profile {
    firstname: string;
    lastname?: string;
    photo: File["id"] | null;
}
