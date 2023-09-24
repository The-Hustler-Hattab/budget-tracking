import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class TokenService{

    token: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();



    

    
}