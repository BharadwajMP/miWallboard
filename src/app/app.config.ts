import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { settingsFile } from './interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class AppConfig {

    /*Init default values for config*/
    private config: settingsFile = {
        refreshTime: 30,
        serverUrl: "127.0.0.1",
        apiUsername: "test",
        apiPassword: "somethingstrong",
        activeQ: 0,
        wallBanner: "MiCCB Wallboard"
    }

    private file: string = "./assets/settings.json";

    constructor(private http: HttpClient) { }

    /**
     * Use to get the data found in the config file
     */
    public getConfig(){
        return this.config;
    }

    /**
     * This method:
     *   Loads "config.json" to get settings
     */
    public load() {
        const settingsObservable = new Observable((observer) => {
            var set = this.http.get<settingsFile>(this.file).subscribe((setB: settingsFile) => {
                observer.next(this.config = setB);
            }, (error: string) => {
                console.log("Failed to load settings.json")
                observer.error(error);
            }, () => {
                console.log("Success loading settings.json")
                observer.complete();
            }
            );
        });

        return settingsObservable
    }
}
