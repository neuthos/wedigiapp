// src/pages/Dashboard.tsx
import React from "react";
import {useOutletContext} from "react-router-dom";
import {WeddingProject} from "../services/MockApiService";
import CardHeader from "../components/Dashboard/CardHeader";

interface LayoutContext {
  weddingData: WeddingProject;
  userRole: string;
}

const Dashboard: React.FC = () => {
  const {weddingData, userRole} = useOutletContext<LayoutContext>();

  // Get the appropriate user data based on role
  const userData = userRole === "bride" ? weddingData.bride : weddingData.groom;
  const partnerData =
    userRole === "bride" ? weddingData.groom : weddingData.bride;

  // Calculate days until wedding
  const today = new Date();
  const weddingDate = new Date(weddingData.date);
  const timeDiff = weddingDate.getTime() - today.getTime();
  const daysUntilWedding = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className="flex flex-col space-y-6">
      <CardHeader />
      {/* Welcome section */}
      <section>
        <div className="bg-gradient-to-r from-primary-dark to-primary rounded-xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl font-display mb-2">
              Welcome, {userData.name}
            </h1>
            <p className="opacity-90">
              {daysUntilWedding > 0
                ? `${daysUntilWedding} days until your wedding!`
                : daysUntilWedding === 0
                ? "Today is your wedding day!"
                : "Congratulations on your wedding!"}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl">
            {userRole === "bride" ? "👰" : "🤵"}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-2 gap-4">
        <div className="glass-light p-4 rounded-xl flex flex-col items-center text-center">
          <div className="text-3xl mb-2">📸</div>
          <h2 className="font-medium text-text-primary">Photo Gallery</h2>
          <p className="text-sm text-text-secondary mt-1">
            {weddingData.gallery.length} photos
          </p>
        </div>

        <div className="glass-light p-4 rounded-xl flex flex-col items-center text-center">
          <div className="text-3xl mb-2">📅</div>
          <h2 className="font-medium text-text-primary">Timeline</h2>
          <p className="text-sm text-text-secondary mt-1">
            {weddingData.schedule.length} events
          </p>
        </div>
      </section>

      {/* Venue */}
      <section>
        <h2 className="text-lg font-display text-text-primary mb-3">Venue</h2>
        <div className="glass-light rounded-xl overflow-hidden">
          <div className="h-40 relative">
            <img
              src={weddingData.venue.photo}
              alt={weddingData.venue.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-text-primary">
              {weddingData.venue.name}
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {weddingData.venue.address}
            </p>

            <button className="mt-3 bg-primary text-white text-sm py-2 px-4 rounded-lg">
              View Map
            </button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section>
        <h2 className="text-lg font-display text-text-primary mb-3">
          Our Story
        </h2>
        <div className="glass-light p-4 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={userData.photo}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-0.5 flex-1 bg-primary-light"></div>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={partnerData.photo}
                alt={partnerData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed">
            {weddingData.story.length > 250
              ? weddingData.story.substring(0, 250) + "..."
              : weddingData.story}
          </p>

          {weddingData.story.length > 250 && (
            <button className="mt-2 text-primary font-medium text-sm">
              Read More
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
