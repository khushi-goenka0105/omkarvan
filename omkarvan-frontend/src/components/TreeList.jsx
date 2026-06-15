import QRCode from "react-qr-code";

function TreeList({ trees }) {
  return (
    <div>
      <h2>All Trees</h2>

      {trees.map((tree) => (
        <div key={tree.id}>
          <h3>{tree.species}</h3>

          <p>Code: {tree.treeCode}</p>
          <p>Section: {tree.section}</p>
          <p>Source: {tree.source}</p>

          <QRCode
            size={120}
            value={`http://localhost:5173/tree/${tree.treeCode}`}
          />

          <hr />
        </div>
      ))}
    </div>
  );
}

export default TreeList;