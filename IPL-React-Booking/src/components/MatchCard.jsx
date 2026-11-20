
import { useState } from "react";
import { supabase } from "../supabase";

function MatchCard({ match, onBookingComplete }) {
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = match.price * Number(tickets);

  async function handleBooking(e) {
    e.preventDefault();

    const quantity = Number(tickets);

    if (!userName.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      setMessage("Enter a valid ticket quantity.");
      return;
    }

    if (quantity > match.available_seats) {
      setMessage("Not enough seats available.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          match_id: match.id,
          user_name: userName.trim(),
          match_title: `${match.team1} vs ${match.team2}`,
          tickets: quantity,
          total_price: totalPrice,
        },
      ]);

    if (bookingError) {
      setMessage("Booking failed: " + bookingError.message);
      setLoading(false);
      return;
    }

    const { error: seatError } = await supabase
      .from("matches")
      .update({
        available_seats: match.available_seats - quantity,
      })
      .eq("id", match.id);

    if (seatError) {
      setMessage(
        "Booking saved, but seat update failed: " + seatError.message
      );
      setLoading(false);
      return;
    }

    setShowForm(false);
    setUserName("");
    setTickets(1);
    setMessage("Booking successful!");
    setLoading(false);

    if (onBookingComplete) {
      onBookingComplete();
    }
  }

  return (
    <div className="match-card">
      <h3>{match.team1} vs {match.team2}</h3>

      <p>📅 {match.date}</p>
      <p>🏟️ {match.venue}</p>
      <p>⏰ {match.time}</p>
      <p>💰 Ticket Price: ₹{match.price}</p>
      <p>🎟️ Available Seats: {match.available_seats}</p>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setMessage("");
        }}
      >
        {showForm ? "Cancel" : "Book Tickets"}
      </button>

      {showForm && (
        <form onSubmit={handleBooking}>
          <p>
            <label>Your Name: </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </p>

          <p>
            <label>Number of Tickets: </label>
            <input
              type="number"
              min="1"
              max={match.available_seats}
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              required
            />
          </p>

          <p>Total Price: ₹{totalPrice}</p>

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default MatchCard;
