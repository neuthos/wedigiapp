// src/services/MockApiService.ts

// Interfaces for our data types
export interface WeddingProject {
  id: string;
  bride: {
    name: string;
    photo: string;
    description: string;
  };
  groom: {
    name: string;
    photo: string;
    description: string;
  };
  date: string;
  venue: {
    name: string;
    address: string;
    mapUrl: string;
    photo: string;
  };
  coverImage: string;
  gallery: string[];
  story: string;
  schedule: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  password: string;
  isActive: boolean;
  downloads: number;
}

export interface WeddingProjectSummary {
  id: string;
  bride: string;
  groom: string;
  date: string;
  venue: string;
  coverImage: string;
  downloads: number;
}

/**
 * Mock API service for wedding data
 * This simulates API calls to a backend
 */
class MockApiService {
  /**
   * Get a list of all wedding projects (summary data only)
   * @returns Promise with array of wedding project summaries
   */
  public async getAllProjects(): Promise<WeddingProjectSummary[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return Object.values(this.mockData).map((project) => ({
      id: project.id,
      bride: project.bride.name,
      groom: project.groom.name,
      date: project.date,
      venue: project.venue.name,
      coverImage: project.coverImage,
      downloads: project.downloads,
    }));
  }

  /**
   * Get detailed data for a specific wedding project
   * @param id The project ID
   * @returns Promise with the wedding project data or null if not found
   */
  public async getProjectById(id: string): Promise<WeddingProject | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return this.mockData[id] || null;
  }

  /**
   * Verify password for a wedding project
   * @param id The project ID
   * @param password The password to verify
   * @returns Promise with boolean indicating if password is correct
   */
  public async verifyPassword(id: string, password: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const project = this.mockData[id];
    if (!project) {
      return false;
    }

    return project.password === password;
  }

  /**
   * Record a new download for a wedding project
   * @param id The project ID
   * @returns Promise with the updated download count
   */
  public async recordDownload(id: string): Promise<number> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const project = this.mockData[id];
    if (!project) {
      throw new Error("Project not found");
    }

    project.downloads += 1;
    return project.downloads;
  }

  // Mock data for wedding projects
  private mockData: Record<string, WeddingProject> = {
    "12345": {
      id: "12345",
      bride: {
        name: "Sarah Johnson",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Sarah is a kindergarten teacher who loves painting and hiking on weekends.",
      },
      groom: {
        name: "Michael Smith",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Michael works as a software engineer and enjoys playing guitar and cooking.",
      },
      date: "2025-05-15",
      venue: {
        name: "Sunset Gardens",
        address: "123 Garden Rd, Charleston, SC 29401",
        mapUrl: "https://goo.gl/maps/example1",
        photo:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      coverImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1522673607200-164d1b09ce29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1537907510278-a4936e4a4a4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1470816692786-37612ec97bce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      ],
      story:
        "Sarah and Michael met at a local coffee shop where they both happened to be working remotely. After catching each other's eye several times, Michael finally struck up a conversation about the book Sarah was reading. They discovered they shared many interests and have been inseparable ever since. Three years later, Michael proposed during a sunset hike at their favorite mountain overlook.",
      schedule: [
        {
          time: "3:00 PM",
          title: "Ceremony",
          description: "Garden pavilion",
        },
        {
          time: "4:00 PM",
          title: "Cocktail Hour",
          description: "West terrace with live music",
        },
        {
          time: "5:30 PM",
          title: "Dinner & Reception",
          description: "Main ballroom",
        },
        {
          time: "9:00 PM",
          title: "Sparkler Send-off",
          description: "Front entrance",
        },
      ],
      password: "amicantik",
      isActive: true,
      downloads: 156,
    },
    "67890": {
      id: "67890",
      bride: {
        name: "Emma Wilson",
        photo:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Emma is a marine biologist with a passion for ocean conservation and scuba diving.",
      },
      groom: {
        name: "Daniel Brown",
        photo:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Daniel owns a local brewery and loves hiking, camping, and craft beer.",
      },
      date: "2025-06-20",
      venue: {
        name: "Ocean View Resort",
        address: "456 Coastal Hwy, Malibu, CA 90265",
        mapUrl: "https://goo.gl/maps/example2",
        photo:
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      coverImage:
        "https://images.unsplash.com/photo-1529636444744-adffc9135a5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506812574058-fc75fa93fead?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      ],
      story:
        "Emma and Daniel's love story began when they met at a beach cleanup event. Daniel was volunteering from his brewery while Emma was leading the marine conservation initiative. They bonded over their shared love for the ocean, and their first date was a sunset kayak tour. Daniel proposed during a surprise scuba diving trip, revealing an underwater sign asking Emma to marry him.",
      schedule: [
        {
          time: "4:30 PM",
          title: "Ceremony",
          description: "Beachfront ceremony site",
        },
        {
          time: "5:15 PM",
          title: "Sunset Cocktail Hour",
          description: "Ocean terrace",
        },
        {
          time: "6:30 PM",
          title: "Dinner & Reception",
          description: "Lighthouse pavilion",
        },
        {
          time: "10:00 PM",
          title: "Bonfire & S'mores",
          description: "South beach",
        },
      ],
      password: "amicantik",
      isActive: true,
      downloads: 89,
    },
    "24680": {
      id: "24680",
      bride: {
        name: "Jennifer Davis",
        photo:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Jennifer is a pastry chef who owns a small bakery specializing in artisanal desserts.",
      },
      groom: {
        name: "Christopher Lee",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Christopher is an architect with a passion for sustainable design and mountain biking.",
      },
      date: "2025-07-10",
      venue: {
        name: "Mountain Creek Lodge",
        address: "789 Pine Ridge Way, Aspen, CO 81611",
        mapUrl: "https://goo.gl/maps/example3",
        photo:
          "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      coverImage:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      ],
      story:
        "Jennifer and Christopher's paths crossed when he was hired to redesign her bakery. Throughout the renovation project, they found themselves looking forward to their meetings more than either would admit. After the bakery reopened, Christopher continued to stop by each morning 'for coffee,' and Jennifer always had a special pastry waiting for him. He proposed with a ring hidden inside a custom-designed cake topper on the anniversary of the bakery's grand reopening.",
      schedule: [
        {
          time: "2:00 PM",
          title: "Ceremony",
          description: "Mountain overlook",
        },
        {
          time: "3:15 PM",
          title: "Cocktail Hour",
          description: "Lodge terrace",
        },
        {
          time: "5:00 PM",
          title: "Dinner & Reception",
          description: "Grand hall",
        },
        {
          time: "9:30 PM",
          title: "Lantern Release",
          description: "Lakeside",
        },
      ],
      password: "amicantik",
      isActive: true,
      downloads: 212,
    },
    "13579": {
      id: "13579",
      bride: {
        name: "Jessica Martinez",
        photo:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Jessica is a travel photographer who has documented landscapes in over 40 countries.",
      },
      groom: {
        name: "Andrew Taylor",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "Andrew is a travel writer and documentary filmmaker who specializes in cultural storytelling.",
      },
      date: "2025-08-05",
      venue: {
        name: "Golden Palace",
        address: "321 Gold St, San Francisco, CA 94133",
        mapUrl: "https://goo.gl/maps/example4",
        photo:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      coverImage:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1519741347686-c1e0917af82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1522673607200-164d1b09ce29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1507504031003-b417219a0fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      ],
      story:
        "Jessica and Andrew met while working on a travel documentary in Bali. Jessica was capturing still photography for the project while Andrew was writing and directing. They spent three weeks exploring the island together for work, but it wasn't until the wrap party that Andrew finally asked Jessica to dinner. Over the next two years, they coordinated their travel schedules to meet in different countries around the world. Andrew proposed in Santorini, at the exact spot where they had taken their first photo together during a joint assignment.",
      schedule: [
        {
          time: "5:00 PM",
          title: "Ceremony",
          description: "Golden Hall",
        },
        {
          time: "6:00 PM",
          title: "Global Cocktail Hour",
          description: "International food and drink stations",
        },
        {
          time: "7:30 PM",
          title: "Dinner & Reception",
          description: "Grand Ballroom",
        },
        {
          time: "11:00 PM",
          title: "Late Night Snacks",
          description: "Street food inspired stations",
        },
      ],
      password: "amicantik",
      isActive: true,
      downloads: 178,
    },
  };
}

export default new MockApiService();
