
import { Injectable, OnInit } from '@angular/core';
import { ConfigDomainService } from '../apiGateway/config.domain.service';
import { ConfigurationModel } from '../model/configuration.model';

@Injectable({
    providedIn: 'root'
})
export class ConfiguratioService implements OnInit {

    configs: ConfigurationModel[];
    configtest: any;
    constructor(private configDomainService: ConfigDomainService) { }

    ngOnInit() {
        // this.configs = new ConfigurationModel();
    }


    getConfiguration() {
        this.configDomainService.getConfig().subscribe(
            data => {
                this.configtest = data;
                console.error(data);
            },
            err => console.error(err),
            () => console.log('users loaded.'));

        // return new Promise(resolve => resolve(Configurations));
    }

    add(data) {
        return new Promise(resolve => {
            // Configurations.push(data);
            resolve(data);
        });
    }

    put(changed) {
        // return new Promise(resolve => {
        //     // const index = Configurations.findIndex(c => c.Id === changed.Id);
        //     // Configurations[index].source = changed.source;
        //     // Configurations[index].category = changed.category;
        //     // Configurations[index].commodity = changed.commodity;
        //     // Configurations[index].metric = changed.metric;
        //     // Configurations[index].thresholeBechmark = changed.thresholeBechmark;
        //     // Configurations[index].email = changed.email;
        //     // resolve(changed);
        // });
    }
}
