export function sayHello(name: string) {
    return `Hello from ${name}`;
}

interface CacheData
{
    id: string;
    name: string;
}

export abstract class CacheGetter
{
    webClient: any;
    cache: Array<CacheData>;

    static create<T extends CacheGetter>(a: {new(webClient:any): T}, webClient:any): Promise<T>
    {
        var getter = new a(webClient);
        return getter.createCache().then(() => getter);
    }
    
    constructor(webClient:any) {
        this.webClient = webClient;
    }

    abstract createCache(): Promise<any>;

    public getById(id: string) {
        return this.cache.find(c => c.id == id);
    }

    public getByName(name: string) {
        return this.cache.find(c => c.name == name);
    }
}

export class ChannelGetter extends CacheGetter
{
    constructor(webClient:any) {
        super(webClient);
    }

    createCache(): Promise<any> {
        return new Promise((resolve:any, reject:any) => {
            this.webClient.channels.list({}, (err:any, res:any) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.cache = res.channels;
                resolve(this.cache);
            });
        });      
    }
}

export class MemberGetter extends CacheGetter
{
    constructor(webClient:any) {
        super(webClient);
    }

    createCache(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.webClient.users.list({}, (err:any, res:any) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.cache = res.members;
                resolve(this.cache);
            });          
        });
    }
}