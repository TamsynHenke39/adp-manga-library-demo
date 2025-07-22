import ListGroup from './components/ListGroup'
import { addTagToMangaList, addTagToSeriesList, sortByTitle, type Entry, type Series } from './Entry';
import { useState, useEffect} from 'react'
import { isRecord } from './record';
import Alert from './components/Alert';
import Button from './components/Button';
import './App.css'
import EntrySeriesPage from './pages/EntrySeriesPage';
import TaglistPage from './pages/TaglistPage';
import Navbar from './components/Navbar';
import Catalogue from './pages/Catalogue';

const apiUrl = import.meta.env.VITE_API_URL;

export type Page = 
{kind: "Loading"} 
| {kind: "Home"} 
| {kind: "Series", series: Series} 
| {kind: "Standalone", standalone: Entry} 
| {kind: "Tag Page"}
| {kind: "Catalogue", list: Entry[] | Series[], heading: string}

function App() {

  /**the lists stored about the available manga */
  const [mangaList, setMangaList] = useState<Entry[]>([]);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [standalonesList, setStandalonesList]= useState<Entry[]>([]);

  const [tagMap, setTagMap] = useState<Map<string, Array<Entry | Series>>>(new Map());


  /**switching between pages */
  const [page, setPage] = useState<Page>({kind: "Loading"})

  /**alert button*/
  const [alertVisible, setAlertVisibility] = useState<boolean>(false)

  const [isLoaded, setLoad] = useState<boolean>(false);


  /**fetches the manga*/
  useEffect(() =>{

    fetch(`${apiUrl}/api/manga`)
      .then(handleMangaResponse)
      .catch(() => handleMangaError('failed to connect to server'))

  }, []);


  /**response handler for fetching manga */
  const handleMangaResponse = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(handleMangaJson)
        .catch(() => handleMangaError("200 response is not valid JSON"));
    } else if (res.status === 400){
      res.text().then(handleMangaError)
        .catch(() => handleMangaError("400 response is not text"));
    } else {
      handleMangaError(`bad status code ${res.status}`)
    }
  }

  /**error handling for the fetching the manga */
  const handleMangaError = (msg: string): void => {
    console.error(`Error fetching /api/manga: ${msg}`)
  }

  /**json handler for the manga fetch */
  const handleMangaJson = (val: unknown): void => {

    //type checks
    if (!isRecord(val)) {
      handleMangaError(`val is not a record-type: ${typeof val}`);
      return;
    } else if (typeof val.manga === 'undefined' || !Array.isArray(val.manga)) {
      handleMangaError(`val.manga is not an array: ${typeof val.manga}`)
      return;
    } else if (!val.manga.every(item => isRecord(item))) {
        handleMangaError(`val.manga items are not records`)
        return;
    } else if (!val.manga.every(item => typeof item.id === 'string' && typeof item.title === 'string' && typeof item.coverUrl === 'string')) {
      handleMangaError(`val.manga has incorrect types for values inside`)
      return;
    } else if (!val.manga.every(item => 
              typeof item.volumes === 'undefined'
              || (Array.isArray(item.volumes) 
              && item.volumes.every(ind => (typeof ind.vol === 'number' || typeof ind.vol === 'string') && typeof ind.id === 'string' && typeof ind.quant === 'number')))) {
      
        handleMangaError(`bad type for manga.volumes`)
    }

    const typedManga = val.manga as Array<{
      id: string;
      title: string;
      coverUrl: string;
      quant?: number;
      tags: [],
      volumes?: Array<{
        vol: number,
        id: string,
        quant: number,
        tags: [],
      }>;
    }>;

    let validManga: Entry[] = [];
    let validSeries: Series[] = [];
    let validStandalones: Entry[] = [];

    for (const entry of typedManga) {
      //if standalone
      if (typeof entry.quant === 'number') {

        const standalone = {
          id: entry.id,
          title: entry.title,
          coverUrl: entry.coverUrl,
          quant: entry.quant,
          tags: [],
        }

        validManga.push(standalone);
        validStandalones.push(standalone);

      } else if (typeof entry.volumes !== 'undefined') {

        const currVols: Entry[] = [];

        for (const vol of entry.volumes) {

          const volume = {
            id: vol.id, 
            title: entry.title + " - " + (typeof vol.vol === 'number' ? ' Vol. ': "") +vol.vol,
            quant: vol.quant,
            tags: [],
          }

          validManga.push(volume)
          currVols.push(volume);
        }

        validSeries.push({
          id: entry.id,
          title: entry.title,
          coverUrl: entry.coverUrl,
          volumes: currVols,
          tags: []
        })
      }
    }

    setMangaList(validManga)
    setSeriesList(validSeries)
    setStandalonesList(validStandalones)
    setPage({kind: "Home"})
    setLoad(true);
  }

  /**fetches the tags*/
  useEffect(() => {

    if (isLoaded) {
      fetch(`${apiUrl}/description/descriptions.json`)
        .then(handleTagResponse)
        .catch(() => handleTagError('failed to connect to server'))
    }
  }, [isLoaded])

  /**response handler for fetching tags */
  const handleTagResponse = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(handleTagJson)
        .catch(() => handleTagError("200 response is not valid JSON"));
      } else if (res.status === 400){
      res.text().then(handleTagError)
          .catch(() => handleTagError("400 response is not text"));
      } else {
      handleTagError(`bad status code ${res.status}`)
      }
  }

  /**error handling for the fetching the tags */
  const handleTagError = (msg: string): void => {
      console.error(`Error fetching /description/descriptions.json: ${msg}`)
  }

  /**handles the tag json response*/
  const handleTagJson = (val: any): void => {

      if (!isRecord(val)) {
        handleTagError(`bad type for val: ${typeof val}`)
        return;
      }

      const tagKeys = Object.keys(val);

      if (!tagKeys.every((item) => typeof item === 'string' )) {
        handleTagError(`bad type for value inside of keys`)
      }

      let updatedSeriesList = [...seriesList]
      let updatedStandaloneList = [...standalonesList]
      const tagMap: Map<string, Array<Entry | Series>> = new Map();


      //loop through the titles in the json file
      for (const title of tagKeys) {

        //get the record containing the information for each title
        const details = val[title];

        if (!details || !isRecord(details)) {
            handleTagError(`bad type for values associated at each key ${typeof details}`)
            return;
        } else if (!Array.isArray(details.genres)) {
            handleTagError(`bad type for genres: ${typeof details.genres}`)
            return;
        } else if (!details.genres.every((item) => typeof item === 'string')) {
            handleTagError(`type of values inside of genres is not a string`)
            return;
        }

        const genres = details.genres;
        const isSeries = updatedSeriesList.some(manga => manga.title === title);

        if (isSeries) {
          for (const tag of genres) {
            updatedSeriesList = addTagToSeriesList(updatedSeriesList, title, tag)
          }
        } else {
          for (const tag of genres) {
            updatedStandaloneList = addTagToMangaList(updatedStandaloneList, title, tag)
          }
        }
      }

      for (const title of tagKeys) {

        const details = val[title]

        if (!details || !isRecord(details) || !Array.isArray(details.genres)) {
            handleTagError(`bad type for values associated at each key ${typeof details}`)
            return;
        }
        
        const genres = details.genres;
        const updatedManga =
          updatedSeriesList.find(series => series.title === title) ??
          updatedStandaloneList.find(entry => entry.title === title);

        
        if (!updatedManga) continue;

        //loop through the tags in genres
        for (const tag of genres) {

          if (tagMap.has(tag)) {
            tagMap.get(tag)!.push(updatedManga);
          } else {
            tagMap.set(tag, [updatedManga])
          }
        }
      }

      updatedSeriesList.sort(sortByTitle);
      updatedStandaloneList.sort(sortByTitle);

      const allVolumes = updatedSeriesList.flatMap(series => 
        series.volumes.map(volume => ({
          ...volume, tags: [...series.tags]
        }))
      );
      const newMangaList = [...updatedStandaloneList, ...allVolumes];

      newMangaList.sort(sortByTitle)
      
      setSeriesList(updatedSeriesList)
      setStandalonesList(updatedStandaloneList)
      setMangaList(newMangaList);
      setTagMap(new Map(tagMap));

  }
  
  /**called when we select a manga volume to open a dedicated page*/
  const handleSelectItem = (manga: Entry): void => {

    const resolved = standalonesList.find( s => s.title === manga.title);
    if (resolved) {
      setPage({kind: "Standalone", standalone: resolved});
    } else {
      console.warn("Could not find matching standalone in seriesList for:", manga.title)
    }
  }

  /** called when select a manga series to open a dedicated page*/
  const handleSelectSeries = (manga: Series): void => {

    const resolved = seriesList.find( s => s.title === manga.title);
    if (resolved) {
      setPage({kind: "Series", series: manga});
    } else {
      console.warn("Could not find matching series in seriesList for:", manga.title)
    }
  }

  /**called when you click this button to go to a catalogue of items */
  const handleCataloguePageClick = (heading: string): void => {

    if (heading === "Complete Manga Catalogue") {
      setPage({kind: "Catalogue", list: mangaList, heading: heading})

    } else if (heading === "All Series") {
      setPage({kind: "Catalogue", list: seriesList, heading: heading})
      
    } else if (heading === "All One-Shots") {
      setPage({kind: "Catalogue", list: standalonesList, heading: heading})
    }
  }

    return (
      <>
        <Navbar 
          page = {page}
          onHomeClick = {() => setPage({kind: "Home"})}
          onTagPageClick = {() => setPage({kind: "Tag Page"})}
          onCataloguePageClick = {handleCataloguePageClick}
          
          >
          </Navbar>

      {page.kind === "Home" && (
        <>
        <div className="image-container-banner">
          <img
            style={{ height: '200px' }}
            src={'/adpbanner.png'}
            alt='ADP Banner'
          />
        <div className='text-block-banner'>
          <h1 style={{ fontFamily: 'mangaka', fontSize: '6vw' }}>
            ADP Manga Library
          </h1>
        </div>
      </div>

      <div style = {{paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}><div>
          {alertVisible && (
            <Alert onAlertClick = { () => setAlertVisibility(false)}>
              <p>
                The <a className = "link-danger" href="https://adp.moe/">
                  <strong>Anime Discovery Project</strong>
                </a> (ADP) at the University of Washington in Seattle is a student-run organizaiton that welcomes all anime lovers for more than 30 years. In our time as 
                an organization, we've acquired a substantial collection manga that we're excited to make <strong>free </strong> and publicly 
                available to all ADP members. From retro 90s/2000s shoujo & shounen to classics like Bleach & One Piece, we hope you find 
                something to enjoy reading!</p>
            </Alert>
            )}
            <div style = {{paddingBottom: '10px'}}>
              <Button onClick ={() => setAlertVisibility(true)}>
                Click here to learn more!
              </Button>
            </div>
          </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                marginBottom: '30px',
              }}
              >
              <div style = {{width: '47%', maxHeight: '400px'}}>
                <ListGroup mangas = {seriesList} heading = 'All Series' onSelectSeries={handleSelectSeries} availabilityVisible = {false}>
                  Click on a series to see all available <i>tankobon</i> volumes.
                </ListGroup>
              </div>

            <div style = {{ width: '47%', maxHeight: '400px'}}>
                <ListGroup mangas = {standalonesList} heading = "All one-shots" onSelectItem={handleSelectItem}>
                  Click on an individual oneshot <i>(yomikiri)</i> to check it out
                </ListGroup>
            </div>
          </div>
        </div>

        <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingBottom: '30px' }}>
          <Button onClick={() => setPage({kind: "Tag Page"})}>Want to find something more specific? Click here see all titles by genre/demographic!</Button>
        </div>
      </>
      )}

      {page.kind === "Series" && page.series && (
        <EntrySeriesPage manga = { page.series } volumes = {page.series.volumes}></EntrySeriesPage>
      )}

      {page.kind === "Standalone" && page.standalone && (
        <EntrySeriesPage manga = {page.standalone}></EntrySeriesPage>
      )}

      {page.kind === "Tag Page" && (
        <TaglistPage selectFunctions= {[handleSelectItem, handleSelectSeries]} tagMap = {tagMap}></TaglistPage>
      )}

      {page.kind === "Catalogue" && (
        <Catalogue list = {page.list} selectFunctions = {[handleSelectItem, handleSelectSeries]}>{page.heading}</Catalogue>
      )}

      {!["Home", "Series", "Standalone", "Tag Page", "Catalogue"].includes(page.kind) && (
        <div className="d-flex align-items-center">
          <strong role="status">Loading...</strong>
          <div className="spinner-border ms-auto" aria-hidden="true"></div>
      </div>
      )}
  </>
  );
}

export default App;
