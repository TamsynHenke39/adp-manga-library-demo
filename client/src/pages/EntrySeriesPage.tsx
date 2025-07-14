import { useEffect, useState } from "react";
import type { Entry, Series } from "../Entry";
import ListGroup from "../components/ListGroup";
import { isRecord } from "../record";

interface Props {
  manga: Entry | Series;
  volumes?: Entry[];
  onSelectItem?: (manga: Entry) => void,
  onSelectSeries?: (manga: Series) => void,
}

function EntrySeriesPage({manga, volumes}: Props) {

  const [description, setDescription] = useState("Loading...");
  
  useEffect(() => {

    fetch('description/descriptions.json')
      .then(handleDescriptionResponse)
      .catch(() => handleDescriptionError("failed to connect to server"))
  }, [manga.title])

  const handleDescriptionResponse = (res: Response): void =>  {
    if (res.status === 200) {
      res.json().then(handleDescriptionJson)
        .catch(() => handleDescriptionError("200 response is not valid JSON"))
    } else if (res.status === 400) {
      res.text().then(handleDescriptionError)
        .catch(() => handleDescriptionError("400 response is not text"))
    } else {
      handleDescriptionError(`bad status code ${res.status}`)
    }
  }

  const handleDescriptionJson = (val: any): void => {

    if (!isRecord(val)) {
      handleDescriptionError(`bad type for val: ${typeof val}`)
      return;
    }

    const key = manga.title;
    const entry = val[key];

    if (!entry || !isRecord(entry) || typeof entry.description !== 'string') {
      console.log('error here');
      handleDescriptionError(`bad type for val: ${typeof val}`)
      return;
    }

    setDescription(entry.description)
  }

  const handleDescriptionError = (msg: string): void => {
    console.error(`Error loading description: ${msg}`)
  }

  return (
    <div style = {{paddingBottom:'30px'}}>
      <div className = "image-container-series">
        <img
          src = {'/covers/' + manga.coverUrl}
          alt = {manga.title}>
        </img>
        <div className = "text-block-series">
          <h1 style ={{fontFamily: 'plotholes bold', fontSize: '7v'}}>{manga.title}</h1>
          <p style = {{fontSize: '3v'}}>{description}</p>
        </div>
      </div>
      {
        typeof volumes !== 'undefined' ? <div style ={{paddingLeft: "30px", paddingRight: "30px", marginTop: '20px'}}>
          <ListGroup mangas={volumes} heading={"All volumes"}>
            Click on a volume to check out
          </ListGroup>
        </div>
        : <p>test test test</p>}
        <div style = {{padding: '30px'}}>
          <p>{manga.tags.length}</p>
          <h5>Tags:</h5>
          {manga.tags.map((tag)=>
          <span className="badge text-bg-warning">{tag}</span>)}
        </div>
    </div>
  );


  
}

export default EntrySeriesPage