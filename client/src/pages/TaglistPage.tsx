import { useEffect, useState } from "react";
import type { Entry, Series } from "../Entry";
import Accordion from "../components/Accordion";
import Alert from "../components/Alert";

interface Props {
    selectFunctions: [((manga: Entry) => void), ((manga: Series) => void)]
    tagMap: Map<string, Array<Entry | Series>>;
}

type SortKind = "alpha_desc" | "alpha_asc" | "count_asc" | "count_desc"

type Sort = {kind: SortKind, label: string}
            | undefined


function TaglistPage({selectFunctions, tagMap}: Props) {


    /**the information stored about the various genres/tags, maps each tag to the work */
    const [tagList, setTagList] = useState<string[]>(Array.from(tagMap.keys()).sort());

    const [filter, setFilter] = useState<string>("");
    const [sort, setSort] = useState<Sort>(undefined)

    /**filters manga by the name of the tag */
    const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setFilter(evt.target.value)

        const newTagArray: string[] = [];

        for (const tag of Array.from(tagMap.keys())) {

            if (tag.includes(evt.target.value)) {
                newTagArray.push(tag);
            }
        }

        setTagList(newTagArray.sort())
    }

    /**switches the way the pages are sorted */
    const handleSortClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {

        const sortValue = evt.currentTarget.value as SortKind;
        const label: string = evt.currentTarget.dataset.label ?? ''

        setSort({kind: sortValue, label: label})
    }

    /**called whenever sort type changes */
    useEffect(() => {

        if (sort !== undefined) {

            if (sort.kind === "alpha_desc") {
                setTagList(tagList.slice().sort())
            } else if (sort.kind === "alpha_asc") {
                setTagList(tagList.slice().sort().toReversed())
            } else {

                const entries = Array.from(tagMap.entries());

                if (sort.kind === "count_asc") {
                    entries.sort((a, b) => a[1].length - b[1].length)
                } else {
                    entries.sort((a, b) => b[1].length - a[1].length)
                }

                const sortedList = entries.map(([tagName, _]) => tagName)

                /**make sure the ones added to the sortedlist are only the ones matching the filter */

                const filteredList = [];

                for (const tag of sortedList) {

                    if (tagList.includes(tag)) {
                        filteredList.push(tag);
                    }
                }
                
                setTagList(filteredList);
            }

        }

    }, [sort])

    return (
        <div style = {{padding: '30px'}}>
            <div>
                <h1 style = {{fontFamily: 'mangaka'}}>All Genres</h1>
                <Alert><strong>Disclaimer: </strong>The following genre tags assigned to each manga are based its respective listing under <a href ='https://myanimelist.net'>MyAnimeList</a>. The 
                assignment or inclusion of certain tags/genres for certain manga is not reflective of the curator's views</Alert>
                <h4 style = {{marginBottom: '20px'}}>Sort & Filter</h4>
            </div>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
            }}>
                <span style = {{float: 'left'}}>Search tags: 
                    <input
                        value = {filter}
                        style = {{marginLeft: '8px'}}
                        onChange = {handleFilterChange}
                        placeholder={'e.g., \'comedy\' or \'fantasy\''}>
                    </input>
                </span>
                <span style = {{float: 'right'}}>
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                             <svg style = {{color: 'white', marginRight: '10px'}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                            </svg>
                             <span style = {{marginRight: '10px'}}>Sort by {sort !== undefined && sort.label}</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><button value = "alpha_desc" data-label = "genre name A-Z" className="dropdown-item" onClick = {handleSortClick}>
                                Genre name A-Z
                                    <svg style = {{marginLeft: '10px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/>
                                        <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                                    </svg>
                            </button></li>
                            <li><button value = "alpha_asc" data-label = "genre name Z-A" className="dropdown-item" onClick = {handleSortClick}>
                                Genre name Z-A
                                <svg style = {{marginLeft: '10px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-alpha-up-alt" viewBox="0 0 16 16">
                                    <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z"/>
                                    <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z"/>
                                    <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z"/>
                                </svg>
                            </button></li>
                            <li><button value = "count_desc" data-label = "manga count desc." className="dropdown-item" onClick = {handleSortClick}>
                                Manga count desc.
                                <svg style = {{marginLeft: '10px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
                                    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                                </svg>
                            </button></li>
                            <li><button value = "count_asc" data-label = "manga count asc." className="dropdown-item" onClick = {handleSortClick}>
                                Manga count asc.
                                <svg style = {{marginLeft: '10px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up-alt" viewBox="0 0 16 16">
                                    <path d="M3.5 13.5a.5.5 0 0 1-1 0V4.707L1.354 5.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 4.707zm4-9.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5"/>
                                </svg>
                            </button></li>
                        </ul>
                    </div>
            </span>
            </div>
            <div style = {{marginTop: '30px'}}>
            {tagList.length > 0 && <Accordion list = {tagList} tagMap = {tagMap} selectFunctions = {selectFunctions}>
                Showing all available manga for
            </Accordion>}
            {tagList.length === 0 && <p style = {{marginTop: '20px'}}>No results found for: '<strong>{filter}</strong>'</p>}
            </div>
        </div>
    )
}

export default TaglistPage