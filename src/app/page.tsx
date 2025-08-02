import PatternGame from "./components/PatternGame";

export default function Home() {
  return (
    <div className="  min-h-screen mx-auto  px-4 py-8 transition-colors duration-300 bg-linear-to-br from-[#fef9e7] via-[#daf0f7] to-[#ffe5ec] dark:from-neutral-900 dark:via-[#0c4a6e] dark:to-[#701a75]">
    
      <PatternGame />
    </div>
  );
}
