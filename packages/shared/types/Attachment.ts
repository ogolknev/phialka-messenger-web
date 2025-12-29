import { File } from "./File";
import { Message } from "./Message";

export interface Attachment {
    message: Message["id"];
    file: File["id"];
}
