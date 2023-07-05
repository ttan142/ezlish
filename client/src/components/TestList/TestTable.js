import React from 'react'
import CardBlog from '../CardBlog/CardBlog'
function TestTable(props) {
  return (
    <>
    
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-4">
            {props.tests.map((test) => (
              <CardBlog
                key={test.id}
                name={test.name}
                numberQuestion={test.numberQuestion}
                test={test.test}
                part={test.part}
                tag={test.tag}
                time={test.time}
                _id={test._id}
                audio={test.audio}
              ></CardBlog>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TestTable