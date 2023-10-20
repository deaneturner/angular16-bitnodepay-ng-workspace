import { Message } from './message';

export interface User {
    id: number;
    email: string;
    name: string;
    image?: string;
    status?: string;
    messages: Message[];
    lastSeen?: string;
    roles?: any[];
}
