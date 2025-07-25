import type { Page } from "../App";

interface Props {
  onHomeClick: () => void;
  onTagPageClick: () => void;
  onCataloguePageClick: (heading: string) => void;
  page: Page;
}

function Navbar({onHomeClick, onTagPageClick, onCataloguePageClick, page}: Props) {

  const handleCataloguePageClick = (evt: React.MouseEvent<HTMLAnchorElement>): void => {

    const heading = evt.currentTarget.dataset.heading

    if (heading) {
        onCataloguePageClick(heading);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"> 
      <div className="container-fluid">
        <a className="navbar-brand" href="#Home" onClick = {onHomeClick}>
          <img src="/favicon.svg" alt="Logo" style = {{width: '30px', height: '24px', marginRight: '10px', marginTop: '2px'}} className="d-inline-block align-text-top"></img>
          {page.kind === "Home" ? "Home" : "Manga Library"}
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className= "nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="#Browse">
                Browse the Library
              </a>
              <ul className = "dropdown-menu">
                <li><a className="dropdown-item" href="#All_Manga" data-heading = "Complete Manga Catalogue" onClick = {handleCataloguePageClick}>Complete Manga Catalogue</a></li>
                <li><a className="dropdown-item" href="#All_Series" data-heading = "All Series" onClick = {handleCataloguePageClick}>All Series</a></li>
                <li><a className="dropdown-item" href="#All_One_Shots" data-heading = "All One-Shots" onClick = {handleCataloguePageClick}>All One-Shots</a></li>
                <li><a className="dropdown-item" href="#All_Genres" data-heading = "Mangas by Genre" onClick = {onTagPageClick}>Mangas by Genre</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="#Browse">
                Social Links
              </a>
              <ul className = "dropdown-menu">
                <li><a className="dropdown-item" href="#">Join our Discord!
                  <svg style = {{marginLeft: '10px', marginBottom: '3px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
                  </svg>
                </a></li>
                <li><a className="dropdown-item" href="https://adp.moe/">ADP Home Webiste</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navbar