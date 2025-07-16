import ListGroup from "../components/ListGroup";
import type { Entry, Series } from "../Entry";

interface Props {
    children: string,
    list: Entry[] | Series[];
    selectFunctions: [((manga: Entry) => void), ((manga: Series) => void)]

}

function Catalogue({children, selectFunctions, list}: Props) {

    const [selectItem, selectSeries] = selectFunctions;

    return (
        <div style = {{padding: '30px'}}>
            <h1>{children}</h1>
            <ListGroup onSelectItem = {selectItem} onSelectSeries={selectSeries}
            mangas = {list} fullPage = {true}
            availabilityVisible = {!list.every((manga) => "volumes" in manga)}></ListGroup>
        </div>
    )
}

export default Catalogue