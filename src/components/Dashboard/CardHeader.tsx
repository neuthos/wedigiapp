import Image from "../Common/Image";
import Typography from "../Common/Typography";
import CardList from "./CardList";

const CardHeader = () => {
  const dummy = {
    me: {
      name: "Ami",
      mood: "NEUTRAL",
    },
    partner: {
      name: "Galang",
      mood: "Good",
    },
    cardItems: [
      {
        id: 1,
        date: new Date(), // Current time (will show as "X minutes ago")
        title: "Getting Started with React",
        description:
          "Learn how to build modern web applications with React. This comprehensive guide covers everything from setting up your environment to advanced patterns.",
      },
      {
        id: 2,
        date: new Date(Date.now() - 3600000 * 3), // 3 hours ago
        title: "TypeScript Best Practices",
        description:
          "Discover how to leverage TypeScript in your projects for better code quality and developer experience.",
      },
      {
        id: 3,
        date: new Date(Date.now() - 86400000), // Yesterday
        title: "Introduction to Tailwind CSS",
        description:
          "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
      },
      {
        id: 4,
        date: "2023-03-15", // Specific date
        title: "Building Responsive Layouts",
        description:
          "Learn techniques for creating responsive layouts that work seamlessly across all devices and screen sizes.",
      },
      {
        id: 5,
        date: "2023-02-28",
        title: "State Management in React",
        description:
          "Compare different state management solutions for React applications including Context API, Redux, and more.",
      },
      {
        id: 6,
        date: "2023-01-15",
        title: "Performance Optimization",
        description:
          "Tips and tricks to improve the performance of your web applications for better user experience.",
      },
    ],
  };

  return (
    <section className="bg-white w-full rounded-b-2xl shadow-lg max-w-lg mx-auto p-6">
      <div className="flex items-center border rounded">
        <Image
          width={60}
          height={60}
          src={`/assets/mood/${dummy.me.mood}.webp`}
        />

        <Typography.Text>Feel Neutral</Typography.Text>
      </div>

      <div className="w-full flex flex-col items-center">
        <Image
          width={200}
          height={200}
          src={`/assets/mood/${dummy.partner.mood}.webp`}
        />
        <Typography.Text>
          {dummy.partner.name} Feel {dummy.partner.mood}
        </Typography.Text>
      </div>
      <CardList
        items={dummy.cardItems}
        onCardClick={console.log}
        className=""
      />
    </section>
  );
};

export default CardHeader;
