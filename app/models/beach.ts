export interface BeachClub {
  id: string | number;
  name: string;
  location: string;
}

export interface BeachArea {
  id: string | number;
  clubId: string | number;
  type: '2' | '4' | '6-12';
  meta: {
    vista_mar: boolean;
    sombra: boolean;
  };
  coordenadas: string;
}
