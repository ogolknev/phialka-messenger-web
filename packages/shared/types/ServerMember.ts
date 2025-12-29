import { Server } from "./Server";
import { User } from "./User";

export interface ServerMember {
    user: User["id"];
    server: Server["id"];
}
