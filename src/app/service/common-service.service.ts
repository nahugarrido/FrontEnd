import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export interface Contacto {
    id: number;
    mail_contacto: String;
    github_url: String;
    linkedin_url: String;
}

@Injectable({ providedIn: 'root' })

export class CommonService {
    private sharingObservablePrivate: BehaviorSubject<Contacto> = new BehaviorSubject<Contacto>({id:1, mail_contacto: "garridonahuel8@gmail.com", github_url:"https://www.github.com/nahugarrido", linkedin_url: "https://www.linkedin.com/in/nahuel-garrido-b585b6226/"});
  commonService: { github_url: string; linkedin_url: string; mail_contacto: string; id: number; };
  static sharingObservableData: { github_url: string; linkedin_url: string; mail_contacto: string; id: number; };


    get sharingObservable() {
        return this.sharingObservablePrivate.asObservable();
    }

    set sharingObservableData(data: Contacto) {
        this.sharingObservablePrivate.next(data);
    }

}
