export default function Footer({carsArray}) {
  return (
    <footer>
      <p className="carName">
        {carsArray[1].year}, {carsArray[1].name}
      </p>
      <p className="price">
        Current Bid : <span>{carsArray[1].price}</span>
      </p>
      <p className="bid">BID</p>
    </footer>
  );
}
