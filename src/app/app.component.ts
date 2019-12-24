import { Component, OnInit } from '@angular/core';

interface Colonne {
  header: string;
  header2: string;
  cleDonnee: string;
  total?: number;
  totalEcart?: number;
}

interface ValEtDiff {
  valeur: number;
  diff?: number;
}

interface DateHeure {
  data: Map<string, ValEtDiff>;
  dateHeure: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public cols: Colonne[];
  public dataParHeure: DateHeure[];
  public dateHeure: Date[];

  public ngOnInit(): void {

    this.cols = [];
    this.dataParHeure = [];
    this.dateHeure = [];

    for (let i = 1; i <= 24; i++) {
      const nd = new Date();
      nd.setHours(i, 0, 0, 0);
      this.dateHeure.push(nd);

      this.dataParHeure.push({
        dateHeure: nd,
        data: new Map<string, ValEtDiff>()
      });
    }

    this.addColl();
    this.addColl();
    this.addColl();
    this.addColl();
    this.addColl();
    this.addColl();
  }

  public onEnleverColonne(cleDonnee: any) {
    this.cols = this.cols.filter( c => c.cleDonnee !== cleDonnee);
    this.dataParHeure.forEach( dph => {
      dph.data.delete(cleDonnee);
    });
  }

  private addColl() {
    const cleDonnee = AppComponent.genererNomUnique();
    this.cols.push({
      cleDonnee: cleDonnee,
      total: 2222,
      header: 'col1',
      header2: ''
    });

    for (let i = 1; i <= 24; i++) {
      this.dataParHeure[i - 1].data.set(cleDonnee, {
        valeur: +cleDonnee + i,
      });
    }
  }

  private static genererNomUnique(): string {
    return `${new Date().getTime()}${Math.round(Math.random() * 100)}`;
  }
}
