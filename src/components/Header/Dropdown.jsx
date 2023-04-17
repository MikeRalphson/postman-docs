import React from 'react';
import { useEffect, useRef, useState } from "react";

/* AI search Imports */
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
} from 'react-instantsearch-dom';
import { SearchWrapperStyling } from '../Search/searchStyles.jsx';
import { CustomHits } from '../Search/searchPreview.jsx';
import { searchClient } from '../../utils/searchClient.js';

const searchIndex = process.env.NODE_ENV === 'development' ? 'dev_docs' : 'docs';

const Dropdown = () => {
  const ref = useRef();
  const [refresh, setRefresh] = useState(false);
  const [hasInput, setHasInput] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If clicked target is outside the open dropdown, close the dropdown
      if (hasInput && ref.current && !ref.current.contains(e.target)) {
        setHasInput(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [hasInput]);

  return (
    <SearchWrapperStyling className="form-inline header__search">
      <div className="wrapper" ref={ref}>
        <InstantSearch
          searchClient={searchClient}
          indexName={searchIndex}
          refresh={refresh}
        >
          <Configure hitsPerPage={5} />

          {/* forcefeed className because component does not accept natively as prop */}
          <SearchBox
            id="search-lc"
            className="searchbox"
            class="ais-SearchBox-input"
            submit={<></>}
            reset={<></>}
            translations={{
              placeholder: 'Search Postman Docs',
            }}
            onKeyUp={(event) => {
              setHasInput(event.currentTarget.value.length > 2)
            }}
          />
          <div className={!hasInput ? 'input-empty' : 'input-value'}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <CustomHits hitComponent={Hits} />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Pagination
                    translations={{
                      previous: '← Previous',
                      next: 'Next →',
                      first: '«',
                      last: '»',
                      ariaPrevious: 'Previous page',
                      ariaNext: 'Next page',
                      ariaFirst: 'First page',
                      ariaLast: 'Last page',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </SearchWrapperStyling>
  );
}

export default Dropdown;
