import {SifraNamjene} from './sifraNamjene';
import {Stranka} from './stranka';

export class Racun {
  id: string;
  uplatnica: string;
  valuta: string;
  iznos: string;
  iban: string;
  model: string;
  pozivNaBroj: string;
  opis: string;
  sifraNamjene: SifraNamjene;
  uplatitelj: Stranka;
  primatelj: Stranka;

  constructor() {
  }
}
