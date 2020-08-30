import React from "react";

export default function DjiaGraph({ djia, getDjia, djiaAverage }) {
  // React.useEffect(() => {
  //   getDjia();
  // }, [getDjia]);
  return (
    <div>
      <h1>DOW J</h1>
      {console.log(djia)}
      {console.log(djiaAverage)}
      {JSON.stringify(djia)}
    </div>
  );
}
