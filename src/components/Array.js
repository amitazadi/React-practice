import { useState, useEffect } from "react";
import Footer from "./Footer";

function Array() {
  const [data, setData] = useState([]);
  const [displaydata, setDisplaydata] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [totalpage, setTotalpage] = useState();
  const [filterdata, setFilterdata] = useState([]);
  const URL = "https://api.publicapis.org/entries";

  const pagination = (firstcount, secondcount, pagedata) => {
    const nextdata = pagedata.slice(firstcount, secondcount);
    return nextdata;
  };

  const getData = async () => {
    const tempData = await fetch(URL);
    const jsonData = await tempData.json();

    setData(jsonData.entries);
    setFilterdata(jsonData.entries);

    const nextData = jsonData?.entries?.slice(0, 10);
    setDisplaydata(nextData);
    setTotalpage(Math.ceil(jsonData.entries.length / 10));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const querry = search.trim();
    let size = data.length;
    let temp = [...data];

    if (querry.length === 0) {
      setFilterdata(data);
    } else {
      temp = data?.filter((element) => {
        return element.API.toLowerCase().includes(search.toLowerCase());
      });
      size = temp.length;
      setFilterdata(temp);
    }

    setCount(0);
    setTotalpage(Math.ceil(size / 10));
    if (size >= 10) {
      const nextData = pagination(0, 10, temp);
      setDisplaydata(nextData);
    } else setDisplaydata(temp);
  }, [search]);

  const nexthandlechange = () => {
    const tempcount = count + 1;
    setCount(count + 1);
    const nextData = pagination(
      tempcount * 10,
      tempcount * 10 + 10,
      filterdata
    );
    setDisplaydata(nextData);
  };

  const prevhandlechange = () => {
    setCount(count - 1);
    const prevData = pagination(count * 10 - 10, count * 10, filterdata);
    setDisplaydata(prevData);
  };

  const sortAZ = () => {
    const temp = [...filterdata];

    temp.sort((a, b) => {
      let fa = a.API.toLowerCase();
      let fb = b.API.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    setCount(0);
    setTotalpage(Math.ceil(data.length / 10));
    setFilterdata(temp);
    const tempData = pagination(0, 10, temp);
    setDisplaydata(tempData);
    // setSearch("");
  };

  const sortZA = () => {
    const temp = [...filterdata];

    temp.sort((a, b) => {
      let fa = a.API.toLowerCase();
      let fb = b.API.toLowerCase();

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });

    setCount(0);
    setTotalpage(Math.ceil(data.length / 10));
    setFilterdata(temp);
    const tempData = pagination(0, 10, temp);
    setDisplaydata(tempData);
    // setSearch("");
  };

  const reset = () => {
    const temp = [...data];
    setCount(0);
    setTotalpage(Math.ceil(data.length / 10));
    setFilterdata(temp);
    const tempData = pagination(0, 10, temp);
    setDisplaydata(tempData);
    setSearch("");
  };

  console.log(count);

  return (
    <div className="App">
      <div className="input-body">
        <div className="searchbar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
          />
        </div>

        <div className="sortbox">
          <button onClick={sortAZ} className="sort">
            Sort A-Z
          </button>
          <button onClick={sortZA} className="sort">
            Sort Z-A
          </button>
          <button onClick={reset} className="sort">
            Reset
          </button>
        </div>
      </div>

      <div className="middle-container">
        {data.length === 0 ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <div className="data">
            <div className="table">
              {displaydata?.map((data, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="contentBox">
                      <div className="dataApi">{data.API}</div>
                      <div className="dataDescription">{data.Description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="button">
        {count <= 0 ? null : (
          <button
            disabled={count <= 0}
            onClick={() => {
              prevhandlechange();
            }}
            className="prevbutton"
          >
            Prev
          </button>
        )}

        {count >= totalpage ? null : (
          <button
            disabled={count >= totalpage}
            onClick={() => {
              nexthandlechange();
            }}
            className="nextbutton"
          >
            Next
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Array;
