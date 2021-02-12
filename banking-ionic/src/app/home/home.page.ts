import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {SifraNamjeneStore} from '../../stores/sifra-namjene.store';
import {Racun} from '../../models/racun';
import {SifraNamjene} from '../../models/sifraNamjene';
import {KeycloakAuthService} from '@cmotion/ionic-keycloak-auth';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {take} from 'rxjs/operators';
import {Stranka} from '../../models/stranka';
import {Adresa} from '../../models/adresa';
import {Grad} from '../../models/grad';
import {RacunStore} from '../../stores/racun.store';
import {Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    racunGroup: FormGroup;
    sifra: Observable<SifraNamjene[]> = of([]);
    racun: Racun = new Racun();
    scannedCode = null;
    rbr: number;
  constructor(private sifraStore: SifraNamjeneStore, private racunStore: RacunStore, private barcodeScanner: BarcodeScanner, private authService: KeycloakAuthService, private router: Router) {
    this.sifra = this.sifraStore.sifraNamjene$;
    this.sifraStore.getAll();
    this.racunGroup = new FormGroup({
          uplatiteljNaziv: new FormControl(this.racun.uplatitelj?.naziv, [Validators.required]),
          uplatiteljAdresa: new FormControl(this.racun.uplatitelj?.adresa.adresa, [Validators.required]),
          uplatiteljGrad: new FormControl(this.racun.uplatitelj?.adresa.grad.naziv, [Validators.required]),
          uplatiteljPost: new FormControl(this.racun.uplatitelj?.adresa.grad.post, [Validators.required]),
          primateljNaziv: new FormControl(this.racun.primatelj?.naziv, [Validators.required]),
          primateljAdresa: new FormControl(this.racun.primatelj?.adresa.adresa, [Validators.required]),
          primateljGrad: new FormControl(this.racun.primatelj?.adresa.grad.naziv, [Validators.required]),
          primateljPost: new FormControl(this.racun.primatelj?.adresa.grad.post, [Validators.required]),
          primateljIban: new FormControl(this.racun.primatelj?.iban, [Validators.required]),
          valuta: new FormControl(this.racun.valuta, [Validators.required]),
          iznos: new FormControl(+this.racun.iznos ? +this.racun.iznos / 100 : null, [Validators.required]),
          model: new FormControl(this.racun.model, [Validators.required]),
          poziv: new FormControl(this.racun.pozivNaBroj, [Validators.required]),
          sifra: new FormControl(this.racun.sifraNamjene?.sifra, [Validators.required]),
          opis: new FormControl(this.racun.opis, [Validators.required])
      });
  }

    scanQr() {
        this.barcodeScanner.scan({
            formats: 'PDF_417',
        }).then((res) => {
            const r = res.text.split('\n');
            this.racun.uplatnica = r[0];
            this.racun.valuta = r[1];
            this.racun.iznos = r[2];
            this.racun.uplatitelj = new Stranka();
            this.racun.uplatitelj.adresa = new Adresa();
            this.racun.uplatitelj.adresa.grad = new Grad();
            this.racun.uplatitelj.naziv = this.utf8Decode(r[3]);
            this.racun.uplatitelj.adresa.adresa = this.utf8Decode(r[4]);
            let g = r[5].split(' ');
            this.racun.uplatitelj.adresa.grad.post = g[0];
            this.racun.uplatitelj.adresa.grad.naziv = this.utf8Decode(g[1]);
            this.racun.primatelj = new Stranka();
            this.racun.primatelj.adresa = new Adresa();
            this.racun.primatelj.adresa.grad = new Grad();
            this.racun.primatelj.naziv = this.utf8Decode(r[6]);
            this.racun.primatelj.adresa.adresa = this.utf8Decode(r[7]);
            g = r[8].split(' ');
            this.racun.primatelj.adresa.grad.post = g[0];
            this.racun.primatelj.adresa.grad.naziv = this.utf8Decode(g[1]);
            this.racun.primatelj.iban = r[9];
            this.racun.model = r[10];
            this.racun.pozivNaBroj = r[11];
            this.racun.opis = this.utf8Decode(r[13]);
            this.sifra.pipe(
                take(1)
            ).subscribe(sif => {
                this.racun.sifraNamjene = sif.filter(f => r[12].includes(f.sifra))[0];
                this.racunGroup = new FormGroup({
                    uplatiteljNaziv: new FormControl(this.racun.uplatitelj?.naziv, [Validators.required]),
                    uplatiteljAdresa: new FormControl(this.racun.uplatitelj?.adresa.adresa, [Validators.required]),
                    uplatiteljGrad: new FormControl(this.racun.uplatitelj?.adresa.grad.naziv, [Validators.required]),
                    uplatiteljPost: new FormControl(this.racun.uplatitelj?.adresa.grad.post, [Validators.required]),
                    primateljNaziv: new FormControl(this.racun.primatelj?.naziv, [Validators.required]),
                    primateljAdresa: new FormControl(this.racun.primatelj?.adresa.adresa, [Validators.required]),
                    primateljGrad: new FormControl(this.racun.primatelj?.adresa.grad.naziv, [Validators.required]),
                    primateljPost: new FormControl(this.racun.primatelj?.adresa.grad.post, [Validators.required]),
                    primateljIban: new FormControl(this.racun.primatelj?.iban, [Validators.required]),
                    valuta: new FormControl(this.racun.valuta, [Validators.required]),
                    iznos: new FormControl(+this.racun.iznos ? +this.racun.iznos / 100 : null, [Validators.required]),
                    model: new FormControl(this.racun.model, [Validators.required]),
                    poziv: new FormControl(this.racun.pozivNaBroj, [Validators.required]),
                    sifra: new FormControl(this.racun.sifraNamjene?.sifra, [Validators.required]),
                    opis: new FormControl(this.racun.opis, [Validators.required])
                });
            });

        });
    }

    utf8Decode(utf8String) {
        if (typeof utf8String != 'string') { throw new TypeError('parameter ‘utf8String’ is not a string'); }
        // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
        const unicodeString = utf8String.replace(
            /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
            function(c) {  // (note parentheses for precedence)
                const cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | ( c.charCodeAt(2) & 0x3f);
                return String.fromCharCode(cc); }
        ).replace(
            /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
            function(c) {  // (note parentheses for precedence)
                const cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                return String.fromCharCode(cc); }
        );
        return unicodeString;
    }

    spremi() {
        const r = new Racun();
        let s = new Stranka();
        let a = new Adresa();
        let g = new Grad();
        g.naziv = this.racunGroup.get('uplatiteljGrad').value;
        g.post = this.racunGroup.get('uplatiteljPost').value;
        a.grad = g;
        a.adresa = this.racunGroup.get('uplatiteljAdresa').value;
        s.adresa = a;
        s.naziv = this.racunGroup.get('uplatiteljNaziv').value;
        r.uplatitelj = s;
        s = new Stranka();
        a = new Adresa();
        g = new Grad();
        g.naziv = this.racunGroup.get('primateljGrad').value;
        g.post = this.racunGroup.get('primateljPost').value;
        a.grad = g;
        a.adresa = this.racunGroup.get('primateljAdresa').value;
        s.adresa = a;
        s.naziv = this.racunGroup.get('primateljNaziv').value;
        s.iban = this.racunGroup.get('primateljIban').value;
        r.primatelj = s;
        r.iban = this.racunGroup.get('primateljIban').value;
        r.valuta = this.racunGroup.get('valuta').value;
        r.iznos = (this.racunGroup.get('iznos').value * 100).toFixed(0);
        r.opis = this.racunGroup.get('opis').value;
        r.pozivNaBroj = this.racunGroup.get('poziv').value;
        r.model = this.racunGroup.get('model').value;
        r.uplatnica = 'HRVHUB30';
        this.sifra.pipe(
            take(1)
        ).subscribe(res => {
            let sif = this.racunGroup.get('sifra').value.toString();
            r.sifraNamjene = res.filter(f => sif.includes(f.sifra))[0];
            this.racunStore.saveIngoing(r).subscribe(() => {
                this.racun = new Racun();
                this.racunGroup = new FormGroup({
                    uplatiteljNaziv: new FormControl(this.racun.uplatitelj?.naziv, [Validators.required]),
                    uplatiteljAdresa: new FormControl(this.racun.uplatitelj?.adresa.adresa, [Validators.required]),
                    uplatiteljGrad: new FormControl(this.racun.uplatitelj?.adresa.grad.naziv, [Validators.required]),
                    uplatiteljPost: new FormControl(this.racun.uplatitelj?.adresa.grad.post, [Validators.required]),
                    primateljNaziv: new FormControl(this.racun.primatelj?.naziv, [Validators.required]),
                    primateljAdresa: new FormControl(this.racun.primatelj?.adresa.adresa, [Validators.required]),
                    primateljGrad: new FormControl(this.racun.primatelj?.adresa.grad.naziv, [Validators.required]),
                    primateljPost: new FormControl(this.racun.primatelj?.adresa.grad.post, [Validators.required]),
                    primateljIban: new FormControl(this.racun.primatelj?.iban, [Validators.required]),
                    valuta: new FormControl(this.racun.valuta, [Validators.required]),
                    iznos: new FormControl(+this.racun.iznos ? +this.racun.iznos / 100 : null, [Validators.required]),
                    model: new FormControl(this.racun.model, [Validators.required]),
                    poziv: new FormControl(this.racun.pozivNaBroj, [Validators.required]),
                    sifra: new FormControl(this.racun.sifraNamjene?.sifra, [Validators.required]),
                    opis: new FormControl(this.racun.opis, [Validators.required])
                });
            });
        });

    }

    logout() {
        this.authService.logout().then(() => {
            this.router.navigate(['loading']);
        });
    }
}
