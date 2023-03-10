import uuid from "react-uuid";

export const displayData = (data) => {
  return data ? data : "No data";
};

export const displayArrayData = (data, key) => {
  if (data.length === 0) {
    return <p>No data</p>;
  }

  return data.map((item, index) => {
    return (
      <p key={index}>
        {item[key.name]} {item[key.url]}
      </p>
    );
  });
};