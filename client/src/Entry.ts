export type Entry = {
  id: string;
  title: string;
  coverUrl?: string;
  quant: number;
  tags: string[];
}

export type Series = {
  id: string;
  title: string;
  coverUrl: string;
  volumes: Entry[];
  tags: string[];
}

export const addTagToMangaList = (mangaList: Entry[], title: string, tag: string): Entry[] => {

  const updatedList = mangaList.map(manga => {
    if (manga.title.includes(title)) {
      return {...manga, tags: [...manga.tags, tag]} as Entry
    }

    return manga;
  })

  return updatedList;
}


export const addTagToSeriesList = (mangaList: Series[], title: string, tag: string): Series[] => {

  const updatedList = mangaList.map(manga => {
    if (manga.title.includes(title)) {

      const updatedVolumes = manga.volumes.map(vol => 
        vol.title === title ?
        { ...vol, tags: [...vol.tags, tag]} : vol
      )
      return {...manga, tags: [...manga.tags, tag], volumes: updatedVolumes} as Series
    }

    return manga;
  })

  return updatedList;

}