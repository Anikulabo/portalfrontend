export const Splitkey = ({ refobject }) => {
  let allelement = [];
  // Iterate over the entries of refobject
  for (const [key, value] of Object.entries(refobject)) {
    allelement.push(
      <span key={key} style={{marginRight:"15px"}}>
        {key}: {value}
      </span>
    );
  }

  // Render the elements
  return (
    <div>
      {allelement}
    </div>
  );
};

