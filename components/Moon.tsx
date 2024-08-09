const MOONS = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌑"];

const moon = MOONS[Math.floor(Math.random() * (MOONS.length - 1))];

export const Moon = () => {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: "70px",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
    >
      {moon}
    </div>
  );
};
