/**for individual manga in a series */
export type Volume = {
    vol?: number | "Omnibus"
    //isbn?: string,
    quant: number,
    //language: string,
}

export type Standalone = {
    title: string,
    //isbn?: string,
    quant: number,
}

/**for manga series */
export type Series = {
    title: string,
    volumes: Array<Volume>,
    //language: string,
}

/**type guard - checks whether x is a series or Standalone */
export const isSeries = (x: Series | Standalone): x is Series => {
  return 'volumes' in x;
};


//I hardcoded some of the selections from the current manga library since
//our club is not recieving new manga that often, so this is a legacy, archival collection

export const MANGA_LIBRARY: Array<Series | Standalone> = [
    {title: '.hack//Legend of The Twilight', volumes: 
        [{vol: 1, quant: 1}]},
    {title: '07-GHOST', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 1}
    ]},
    {title: 'A.I. Love You', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 1},
        {vol: 3, quant: 1},
        {vol: 4, quant: 1},
        {vol: 5, quant: 1},
        {vol: 6, quant: 1},
        {vol: 7, quant: 1},
        {vol: 8, quant: 1}
    ]},
    {title: 'Abenobashi Magical Shopping Arcade', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 1},
    ]},
    {title: 'Ace Attorney Official Casebook', volumes: [
        {vol: 1, quant: 1},
    ]},
     {title: 'Alice 19th', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 1},
        {vol: 3, quant: 1},
        {vol: 4, quant: 1},
        {vol: 5, quant: 1},
        {vol: 6, quant: 1},
    ]},
     {title: 'Angelic Layer', volumes: [
        {vol: 1, quant: 1},
    ]},
     {title: 'Arcana', volumes: [
        {vol: 2, quant: 1},
        {vol: 3, quant: 1},
        {vol: 4, quant: 1},
    ]},
    {title: 'Astral Project', volumes: [
        {vol: 4, quant: 1},
    ]},
    {title: 'Azumanga Daioh', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 2},
        {vol: 3, quant: 1},
        {vol: 4, quant: 1},
        {vol: "Omnibus", quant: 1}
    ]},
    {title: 'Bamboo Blade', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 1},
    ]},
    {title: 'Basara', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 1},
        {vol: 13, quant: 1},
    ]},
    {title: 'Beyond My Touch', quant: 1},
    {title: 'Bleach', volumes: [
        {vol: 1, quant: 1},
        {vol: 2, quant: 1},
        {vol: 13, quant: 1},
    ]},
    {title: 'Blood: The Last Vampire (2002)', quant: 1},
    {title: 'Cardcaptor Sakura (Masters of the Clow)', volumes: [
        {vol: 7, quant: 1},
        {vol: 8, quant: 1},
    ]},
    {title: 'Comic Party Time', quant: 1},
]
