import React, { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { RefreshCw } from "lucide-react";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getLeaderboard();
      setLeaderboardData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError("Failed to fetch leaderboard data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately
    fetchLeaderboard();

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(fetchLeaderboard, 15000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="archivo-light text-brown-primary flex flex-col items-center h-full py-10 px-4">
      <h1 className="bokor text-[36px] text-center leading-[40px] mb-6">
        Leaderboard 🏆
      </h1>

      {isLoading && leaderboardData.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <RefreshCw color="brown" size={60} className="animate-spin mb-4" />
          <p className="text-center text-xl">Loading leaderboard data...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="bokor bg-brown-primary text-white px-6 py-2 rounded-md">
            Try Again
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {isLoading && (
            <div className="flex justify-center items-center mb-14 mt-10">
              <RefreshCw
                color="brown"
                size={46}
                className="animate-spin mr-4"
              />
              <p className="text-3xl bokor">Refreshing...</p>
            </div>
          )}
          <div className="rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-brown-primary text-white flex justify-between">
              <span className="font-bold w-16 text-center">Rank</span>
              <span className="font-bold flex-1 text-center">Participant</span>
            </div>

            <div className="">
              {leaderboardData.length > 0 ? (
                leaderboardData.map((item) => {
                  const isTopThree = item.rank <= 3;
                  return (
                    <div
                      key={item.rank}
                      className={`px-4 rounded-xl ${
                        isTopThree ? "py-4 bg-yellow-500 my-4" : "my-4 py-3"
                      } flex justify-between items-center ${
                        isTopThree ? "bg-cream-secondary" : "bg-white"
                      }`}>
                      <span
                        className={`w-16 text-center font-bold ${
                          isTopThree
                            ? "text-[28px] bokor text-brown-primary"
                            : "bokor text-xl"
                        }`}>
                        {item.rank}
                      </span>
                      <span
                        className={`flex-1 bokor text-center ${
                          isTopThree
                            ? "text-[28px] font-semibold"
                            : "text-[22px]"
                        }`}>
                        {item.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  No leaderboard data available
                </div>
              )}
            </div>
          </div>
          <div className="text-center mt-4 mb-10">
            <button
              onClick={fetchLeaderboard}
              className="text-brown-primary flex items-center justify-center mx-auto"
              disabled={isLoading}>
              <RefreshCw
                size={16}
                className={isLoading ? "animate-spin mr-2" : "mr-2"}
              />
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
