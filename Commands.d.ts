import { Client, Message, ApplicationCommandOptionData, Collection } from "discord.js";

type CategoryTypes = "Jeux" | "Modération" | "Owner" | "Picsou" | "Informations";

interface IData {
    name: string;
    description: string;
    category: CategoryTypes;
    owner: boolean;
    args: boolean;
    slash: boolean;
    options?: ApplicationCommandOptionData[];
}

interface IUtils {
    readonly fileInfos: any;
    readonly client: Client & I;
    readonly colors: {
        red: "#E11515",
        green: "#4F9721"
    };
    loadCommands(dirCommands?: string): void;
    loadEvents(dirEvent?: string): void;
    sleep(ms: number): Promise<void>;
}

interface I {
    readonly commands: Collection<string, Commands>;
    readonly utils: IUtils;
    readonly config: any;
}

declare class Commands {
    public constructor(client: Client, data: IData);
    public readonly client: Client & I;
    public readonly name: string;
    public readonly description: string;
    public readonly category: CategoryTypes;
    public readonly owner: boolean;
    public readonly args: boolean;
    public readonly slash: boolean;
    public readonly options?: ApplicationCommandOptionData[];
}

export = Commands;