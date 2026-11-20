
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchMatches() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase Error:", error.message);
      setError(error.message);
    } else {
      console.log("Matches received:", data);
      setMatches(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches",
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredMatches =
    selectedTeam === "All"
      ? matches
      : matches.filter(
          (match) =>
            match.team1.includes(selectedTeam) ||
            match.team2.includes(selectedTeam)
        );

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="matches-section" id="matches">
        <h2>Upcoming IPL Matches</h2>

        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="All">All Teams</option>
          <option value="Chennai">Chennai Super Kings</option>
          <option value="Bengaluru">Royal Challengers Bengaluru</option>
          <option value="Mumbai">Mumbai Indians</option>
          <option value="Kolkata">Kolkata Knight Riders</option>
          <option value="Sunrisers">Sunrisers Hyderabad</option>
          <option value="Rajasthan">Rajasthan Royals</option>
        </select>

        {loading && <p>Loading matches...</p>}

        {error && (
          <p style={{ color: "red" }}>
            Unable to load matches: {error}
          </p>
        )}

        {!loading && !error && matches.length === 0 && (
          <p>No matches found in the database.</p>
        )}

        <div className="matches-container">
          {filteredMatches.map((match) => (
            <MatchCard
  key={match.id}
  match={match}
  onBookingComplete={fetchMatches}
/>
          ))}
        </div>
      </section>

      <footer id="guidelines">
        <p>© 2026 IPL Ticket Booking</p>
      </footer>
    </div>
  );
}

export default App;
