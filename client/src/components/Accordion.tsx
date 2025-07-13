import { type ReactNode } from "react";
import type { Entry, Series } from "../Entry";
import ListGroup from "./ListGroup";

interface Props {
    list: string[];

    //optional data strcuture
    tagMap?: Map<string, any>
    children?: ReactNode;

    //optional series select function
    selectFunctions?: [((manga: Entry) => void), ((manga: Series) => void)]
}

function Accordion({list, tagMap, children, selectFunctions =  [() => {}, () => {}]}: Props) {

    const [selectItem, selectSeries] = selectFunctions;

    return (
        <div className="accordion border border-dark-subtle" id="accordionPanelsStayOpen" style = {{marginTop: '20px', display: 'flex', flexDirection: 'column'}}>
            {list.map((item, index) => {

                const collapseId = `panelsStayOpen-collapse-${index}`
                const headingId = `heading-${index}`
                return ( 
                    <div className="accordion-item border border-light-subtle" key = {index}>
                        <h2 className= 'accordion-header' id = {headingId}>
                            <button 
                                className="accordion-button collapsed"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target={`#${collapseId}`}
                                aria-expanded="true"
                                aria-controls={collapseId}
                                >
                                    <span className = 'w-100 d-flex justify-content-between align-items-center'><strong>{item}</strong></span>
                                    <span className="badge rounded-pill text-bg-mangaCount" style = {{marginRight: '3%', fontFamily: 'anime3 reg'}}>{tagMap?.get(item)!.length + ' manga'}</span>
                            </button>
                        </h2>
                        <div id={collapseId} className="accordion-collapse collapse" aria-labelledby={headingId}>
                        <div className="accordion-body">
                            {typeof tagMap !== 'undefined' && 
                            <ListGroup 
                                mangas={tagMap.get(item)!}
                                availabilityVisible = {false}
                                onSelectItem={selectItem}
                                onSelectSeries={selectSeries}
                                >
                                {children} '<strong style = {{color: '#FF7083'}}>{item}</strong>'
                            </ListGroup>}
                        </div>
                        </div>
                    </div>
            )})}
        </div>
    );
}

export default Accordion;