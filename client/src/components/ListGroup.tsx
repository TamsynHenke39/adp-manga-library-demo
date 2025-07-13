import { useState, type ReactNode } from "react";
import type { Entry, Series } from "../Entry";

interface ListGroupProps {
    availabilityVisible?: boolean;
    children?: ReactNode,
    heading?: string;
    mangas: Array<Entry | Series>,
    onSelectItem?: (manga: Entry) => void,
    onSelectSeries?: (manga: Series) => void,
}

function ListGroup({children, mangas, heading, onSelectItem , onSelectSeries, availabilityVisible = true} : ListGroupProps) {

    //Hook
    const [selectedIndex, setSelectedIndex] = useState(-1);


    return (
        <div className = "border border-dark border-2 shadow p-3 bg-body"
             style = {{
                height: '100%',       // <-- new
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'}}>
        <div>
            {heading !== 'undefined' && <h3 style ={{fontFamily: 'mangaka'}}>{heading}</h3>}
            {children !== 'undefined' && <p >{children}</p>}
            {mangas.length === 0 && <p>No item found</p> }
            <div className = "scrollable-list-wrapper" style = {{overflowY: 'auto', flexGrow: 1}}>
                <ol className="list-group list-group-flush">
            {mangas.map((manga, index)=>
                <li key = {manga.id}> 
                    <a href = {"#" + manga.title}
                        className = {selectedIndex === index ? 
                            'list-group-item list-group-item-action active-select d-flex justify-content-between align-items-center flex-wrap' : 
                            'list-group-item list-group-item-action  d-flex justify-content-between align-items-center flex-wrap'}
                        onMouseOver= {() => { setSelectedIndex(index) }}
                        onMouseLeave = {() => { setSelectedIndex(-1) }}

                        onClick = {() => {
                            if ('quant' in manga && typeof onSelectItem !== 'undefined') {
                                onSelectItem(manga as Entry)
                            } else if (typeof onSelectSeries !== 'undefined') {
                                onSelectSeries(manga as Series)
                            }
                        }}
                        >
                        {manga.title}
                        {availabilityVisible && <span 
                            className = 'no-active'
                            style ={{display: 'flex', paddingRight: '5%', color: 'quant' in manga ? 'green' : 'red'}}
                                >{'quant' in manga ? 'Available: ' + manga.quant : 'None available'}
                        </span>}
                    </a>
                </li>
                )}
            </ol>
            </div>
        </div>
     </div>
    );
}

export default ListGroup;
