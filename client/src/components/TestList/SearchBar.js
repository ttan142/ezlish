import React from "react";
import { useEffect, useState } from "react";
import {
  listTests,
  listIELTSTests,
  getAllTest,
} from "../../actions/testAction";
import { useDispatch, useSelector } from "react-redux";

function SearchBar(props) {
  const [testYear, setTestYear] = useState([]);
  const dispatch = useDispatch();
  const testList = useSelector((state) => state.testList);
  const { tests, loadding, error } = testList; // testsHave testList
  const [click, setClick] = useState(false);

  // filter test by name get only distinct for buttone
  const getToeicTest = () => {
    setClick(false);
    dispatch(listTests());
    console.log(tests);
  };

  const getAll = () => {
    setClick(false);
    dispatch(getAllTest());
    console.log(tests);
  };

  const getIeltsTest = () => {
    setClick(false);
    dispatch(listIELTSTests());
    console.log(tests);
  };

  useEffect(() => {
    if (click === false) {
      props.setTest(tests);
      let t = tests.filter(
        (value, index, self) =>
          self.findIndex((m) => m.tag === value.tag) === index
      );
      let result = t.map((a) => a.tag);
      setTestYear(result);
    }
  }, [tests, props, click]);

  const handleTestName = (e) => {
    setClick(true);
    props.setTest(() => {
      return tests.filter((z) => {
        return z.tag === e.target.value;
      });
    });
  };

  const handleGetAll = () => {
    setTestYear([]);
    dispatch(getAllTest());
    console.log(tests);
    setClick(true);
  };

  return (
    <div className="search">
      <h1>Exam</h1>
      <div className="btn-group">
        <button onClick={getAll}>All</button>
        {/* <button onClick={getToeicTest}>TOEIC</button>
                <button onClick={getIeltsTest}>IELTS</button> */}
      </div>
      <div className="btn-group 1">
        {testYear &&
          testYear.map((dis) => (
            <button onClick={handleTestName} key={dis} value={dis}>
              {dis}{" "}
            </button>
          ))}
      </div>
      <div class="mt-3 input-group rounded" id="search-bar">
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
