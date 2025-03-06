// src/pages/LandingPage.tsx
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface WeddingProject {
  id: string;
  bride: string;
  groom: string;
  date: string;
  venue: string;
  coverImage: string;
  downloads: number;
}

const LandingPage: React.FC = () => {
  const [weddingProjects, setWeddingProjects] = useState<WeddingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch wedding projects from API (mocked for now)
    const fetchProjects = async () => {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data
        const mockProjects: WeddingProject[] = [
          {
            id: "12345",
            bride: "Sarah Johnson",
            groom: "Michael Smith",
            date: "2025-05-15",
            venue: "Sunset Gardens",
            coverImage:
              "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            downloads: 156,
          },
          {
            id: "67890",
            bride: "Emma Wilson",
            groom: "Daniel Brown",
            date: "2025-06-20",
            venue: "Ocean View Resort",
            coverImage:
              "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            downloads: 89,
          },
          {
            id: "24680",
            bride: "Jennifer Davis",
            groom: "Christopher Lee",
            date: "2025-07-10",
            venue: "Mountain Creek Lodge",
            coverImage:
              "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            downloads: 212,
          },
          {
            id: "13579",
            bride: "Jessica Martinez",
            groom: "Andrew Taylor",
            date: "2025-08-05",
            venue: "Golden Palace",
            coverImage:
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            downloads: 178,
          },
        ];

        setWeddingProjects(mockProjects);
      } catch (error) {
        console.error("Error fetching wedding projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero section */}
      <section className="relative h-96 bg-gradient-to-b from-primary-dark to-primary flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-script text-white mb-4">
            Wedding App Platform
          </h1>
          <p className="text-xl font-display text-text-light mb-6">
            Create your personalized wedding app
          </p>
        </div>
      </section>

      {/* Featured weddings */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-display text-text-primary mb-8 text-center">
          Featured Wedding Apps
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary-light opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weddingProjects.map((project) => (
              <Link
                key={project.id}
                to={`/d/${project.id}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-card transition-all duration-300 group-hover:shadow-lg">
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={`${project.bride} & ${project.groom}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-display text-xl mb-1">
                      {project.bride} & {project.groom}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">
                        {new Date(project.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="py-12 px-4 bg-secondary-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display text-text-primary mb-8 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-light p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-display text-lg mb-2">Find Your Wedding</h3>
              <p className="text-text-secondary text-sm">
                Browse through our collection of wedding apps or search for a
                specific couple.
              </p>
            </div>

            <div className="glass-light p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-display text-lg mb-2">Enter Password</h3>
              <p className="text-text-secondary text-sm">
                Access your wedding app with the password provided by the
                couple.
              </p>
            </div>

            <div className="glass-light p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-display text-lg mb-2">Enjoy the App</h3>
              <p className="text-text-secondary text-sm">
                View photos, timeline, venue details and more in one beautiful
                app.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
