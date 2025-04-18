import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () =>{
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
    <div className="card" key={card.id}>
    <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front of the card" />
        <img className="back"
         src="/img/pytanie.png"
         onClick={handleClick}
         alt="back of the card" />
     </div>
    </div>
    )
}