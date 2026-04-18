import { useState, useEffect, useMemo, useRef } from "react";
import { BsFillBalloonHeartFill, BsBalloonFill } from "react-icons/bs";
import { FaHeart, FaBookOpen, FaTimes, FaMusic } from "react-icons/fa";
import makatiCake from "./assets/makati-cake.mp4";
import pangasinanCake from "./assets/pangasinanCake.mp4"
import pic1 from './assets/pics/1.jpg'
import pic2 from './assets/pics/2.jpg'
import pic3 from './assets/pics/3.jpg'
import pic4 from './assets/pics/4.jpg'
import pic5 from './assets/pics/5.jpg'
import pic6 from './assets/pics/6.jpg'
import pic7 from './assets/pics/7.jpg'
import pic8 from './assets/pics/8.jpg'
import pic9 from './assets/pics/9.jpg'
import pic10 from './assets/pics/10.jpg'
import pic11 from './assets/pics/11.jpg'
import pic12 from './assets/pics/12.jpg'
import pic13 from './assets/pics/13.jpg'
import Fallen from './assets/Fallen.mp3'

const App = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(Fallen);
    audio.loop = true;
    audioRef.current = audio;

    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startCelebration = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error("Audio playback failed:", err);
      }
    }
    setHasStarted(true);
    setShowOverlay(false);
  };

  const pauseMusic = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  const playMusic = () => {
    if (hasStarted && !isBookOpen && audioRef.current) {
      audioRef.current.play().catch((err: Error) => console.log("Resume failed:", err));
    }
  };

  const happy = "Happy".split("");
  const birthday = "Birthday".split("");

  const letterSpeed = 0.16;
  const totalLetters = happy.length + birthday.length;
  const ribbonDelay = totalLetters * letterSpeed + 0.8;
  const carouselDelay = ribbonDelay + 0.8;
  const balloonEntranceDelay = carouselDelay + 0.5;

  const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13];

  const [{ currentIndex, prevIndex }, setIndices] = useState({
    currentIndex: 0,
    prevIndex: images.length - 1,
  });

  useEffect(() => {
    if (!hasStarted) return;
    const timer = setInterval(() => {
      setIndices((prev) => ({
        currentIndex: prev.currentIndex === images.length - 1 ? 0 : prev.currentIndex + 1,
        prevIndex: prev.currentIndex,
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length, hasStarted]);

  const floatingItems = useMemo(() => {
    const count = 100;
    const sparkleColors = ["#FFD700", "#FFF8DC", "#FFB6C1", "#E6E6FA", "#FFFFFF", "#F0FFFF"];
    const shapes = ["shape-crystal", "shape-heart", "shape-star", "shape-diamond-gem"];

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 10,
      left: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -25,
      sparkleColor: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      shapeClass: shapes[Math.floor(Math.random() * shapes.length)],
      spinSpeed: Math.random() * 10 + 5,
      drift: (Math.random() - 0.5) * 150,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  const balloonBundle = useMemo(() => {
    const colors = ["text-pink-400", "text-indigo-400", "text-sky-400", "text-rose-400", "text-fuchsia-400", "text-purple-400"];
    return Array.from({ length: 19 }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      delay: i * 0.1,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 40,
      rotate: (Math.random() - 0.5) * 20,
    }));
  }, []);

  return (
    <div className="h-screen w-screen grid place-items-center bg-linear-to-br from-violet-950 to-purple-900 overflow-hidden relative font-sans isolate">

      {showOverlay && !hasStarted && (
        <div
          onClick={startCelebration}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center cursor-pointer transition-opacity duration-500"
        >
          <div className="bg-white/10 p-12 rounded-full border-2 border-white/30 text-center animate-bounce shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <FaMusic className="text-white text-6xl mb-4 mx-auto opacity-90" />
            <p className="text-white font-black tracking-[0.3em] uppercase text-xl">For You</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes letter-entrance {
          0% { opacity: 0; transform: translateY(20px) scale(0); filter: brightness(1.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: brightness(1.0); }
        }
        @keyframes letter-idle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-letter-combined {
          opacity: 0;
          animation: 
            letter-entrance 0.5s ease-out forwards,
            letter-idle-bounce 2s ease-in-out infinite 0.5s;
        }
        @keyframes floatUpField {
          0% { transform: translateY(110vh) translateX(0); }
          100% { transform: translateY(-30vh) translateX(var(--drift)); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; filter: brightness(1); transform: scale(1); }
          50% { opacity: 0.4; filter: brightness(1.8); transform: scale(0.8); }
        }
        @keyframes spinAround {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .floating-item {
          position: absolute;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(1px);
          animation: floatUpField infinite linear;
          z-index: 0;
        }
        .shape-crystal { clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%); }
        .shape-heart { clip-path: polygon(50% 15%, 75% 0%, 100% 15%, 100% 40%, 50% 100%, 0% 40%, 0% 15%, 25% 0%); }
        .shape-star { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }
        .shape-diamond-gem { clip-path: polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%); }
        .item-sparkle {
          position: absolute;
          width: 45%; height: 45%;
          top: 20%; left: 25%;
          border-radius: 50%;
          animation: sparkle 2.5s infinite ease-in-out;
        }
        .inner-rotator {
            width: 100%; height: 100%;
            animation: spinAround infinite linear;
        }
        @keyframes entrance {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-entrance-custom { animation: entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-spin-slow-custom { animation: spinAround 12s linear infinite; }
        @keyframes float-side {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-balloon-bundle {
          animation: 
            entrance 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            float-side 3s ease-in-out infinite;
        }
      `}</style>

      {hasStarted && (
        <>
          <div className="absolute inset-0 z-0">
            {floatingItems.map((item) => (
              <div
                key={item.id}
                className={`floating-item ${item.shapeClass}`}
                style={{
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  left: `${item.left}vw`,
                  opacity: item.opacity,
                  // @ts-ignore
                  "--drift": `${item.drift}px`,
                  animationDuration: `${item.duration}s`,
                  animationDelay: `${item.delay}s`,
                }}
              >
                <div className="inner-rotator" style={{ animationDuration: `${item.spinSpeed}s` }}>
                  <div
                    className="item-sparkle"
                    style={{
                      backgroundColor: item.sparkleColor,
                      boxShadow: `0 0 10px ${item.sparkleColor}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="h-[70vh] w-[80vw] md:w-[60vw] xl:w-[40vw] xl:h-[80vh] shadow-2xl rounded-3xl bg-linear-to-tr from-purple-500/80 via-violet-600/80 to-fuchsia-500/80 backdrop-blur-md border border-white/20 flex flex-col items-center justify-start pt-8 relative z-10 animate-in fade-in duration-1000">

            {["left-[-30px]", "right-[30px]"].map((pos, sideIdx) => (
              <div key={sideIdx} className={`absolute ${pos} bottom-1/4 z-20`}>
                <div className="relative">
                  {balloonBundle.map((b) => (
                    <div
                      key={b.id}
                      className="absolute opacity-0 animate-balloon-bundle flex flex-col items-center"
                      style={{
                        animationDelay: `${balloonEntranceDelay + b.delay}s`,
                        left: `${b.x}px`,
                        top: `${b.y}px`,
                        transform: `rotate(${b.rotate}deg)`
                      }}
                    >
                      <div className="relative">
                        <BsBalloonFill className={`text-5xl ${b.color} drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]`} />
                        <FaHeart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white/50" />
                      </div>
                      <div className="w-0.5 h-32 bg-white/20 -mt-1 rounded-full origin-top" style={{ transform: `rotate(${-b.rotate / 2}deg)` }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center select-none relative">
              <div className="flex gap-1 relative z-10">
                {happy.map((char, i) => (
                  <span key={i} className="inline-block text-5xl md:text-6xl xl:text-7xl font-black text-purple-50 animate-letter-combined text-[shadow:4px_4px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]" style={{ animationDelay: `${i * letterSpeed}s` }}>{char}</span>
                ))}
              </div>
              <div className="flex gap-1 -mt-4 mb-4 relative z-10">
                {birthday.map((char, i) => (
                  <span key={i} className="inline-block text-6xl md:text-7xl xl:text-8xl font-black text-purple-300 animate-letter-combined text-[shadow:6px_6px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,1px_1px_0_#000]" style={{ animationDelay: `${(i + happy.length) * letterSpeed}s` }}>{char}</span>
                ))}
              </div>

              <div className="relative mb-8 animate-entrance-custom opacity-0" style={{ animationDelay: `${ribbonDelay}s` }}>
                <div className="absolute -left-8 top-[-2px] h-10 w-16 bg-purple-900 -z-10 [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_0%_100%,_25%_50%)]" />
                <div className="relative bg-purple-600 w-[180px] lg:w-[250px] flex justify-between items-center px-6 py-1.5 text-white font-bold italic border-y-2 border-white/30 shadow-xl z-10 overflow-hidden">
                  <BsFillBalloonHeartFill className="text-xl animate-bounce text-pink-300" />
                  <span className="text-sm tracking-widest">19 April ...</span>
                  <BsFillBalloonHeartFill className="text-xl animate-bounce text-pink-300" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="absolute -right-8 top-[-2px] h-10 w-16 bg-purple-900 -z-10 [clip-path:polygon(0%_0%,_100%_0%,_75%_50%,_100%_100%,_0%_100%)]" />
              </div>

              <div className="relative mt-2 animate-entrance-custom opacity-0" style={{ animationDelay: `${carouselDelay}s` }}>
                <div className="relative border-4 border-white rounded-full h-[260px] w-[260px] overflow-hidden bg-black/20 shadow-2xl z-10">
                  {images.map((img, index) => {
                    const isActive = index === currentIndex;
                    const isExiting = index === prevIndex;
                    let transformClasses = "translate-x-full -translate-y-full opacity-0 scale-110";
                    if (isActive) transformClasses = "translate-x-0 translate-y-0 opacity-100 scale-100";
                    else if (isExiting) transformClasses = "translate-x-full translate-y-full opacity-0 scale-90";
                    return (
                      <img key={index} src={img} alt="slide" className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out transform rounded-full overflow-hidden ${transformClasses}`} />
                    );
                  })}
                </div>

                <div className="absolute top-4 -right-12 h-28 w-28 z-50">
                  <div className="absolute inset-0 bg-purple-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <FaHeart className="text-red-600 text-2xl animate-pulse" />
                  </div>
                  <div className="absolute inset-0 animate-spin-slow-custom">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs><path id="badgePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
                      <text style={{ letterSpacing: '0.22em' }} className="text-[9px] fill-black uppercase">
                        <textPath href="#badgePath">HAPPY BIRTHDAY • HAPPY BIRTHDAY •</textPath>
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
                  <div className="bg-purple-500 border-4 border-white px-10 py-1.5 rounded-full shadow-[4px_4px_0_#FFF] flex items-center gap-6 relative">
                    <h1 className="text-3xl font-black text-white italic tracking-tighter drop-shadow-[2px_2px_0_#000]">Eah_</h1>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBookOpen(true)}
              className="mt-16 bg-white text-purple-700 px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-pink-100 transition-colors shadow-lg animate-bounce hover:cursor-pointer"
            >
              <FaBookOpen /> Open
            </button>
          </div>
        </>
      )}

      {/* UPDATED MODAL SECTION */}
      {isBookOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          {/* Main Book Container - Added max-h and overflow-y-auto */}
          <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl flex flex-col md:flex-row max-h-[90vh] border-[8px] md:border-[16px] border-[#3d2422] overflow-y-auto">
            <button
              onClick={() => {
                setIsBookOpen(false);
                playMusic();
              }}
              className="fixed top-6 right-6 text-gray-800 z-[110] hover:scale-125 transition-transform bg-white/80 rounded-full p-2 shadow-md hover:cursor-pointer"
            >
              <FaTimes size={28} />
            </button>

            {/* Left Page */}
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-start border-b md:border-b-0 md:border-r border-gray-200 bg-[#fdfbf7]">
              <h3 className="mb-6 font-serif italic text-gray-800 text-xl font-bold">April 4, 2025</h3>
              <div className="w-full relative bg-black rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                <video
                  className="w-full h-auto max-h-[300px] object-cover" // Reduced Height
                  controls
                  playsInline
                  onPlay={pauseMusic}
                  onPause={playMusic}
                  onEnded={playMusic}
                >
                  <source src={pangasinanCake} type="video/mp4" />
                </video>
              </div>
              <p className="mt-6 text-gray-700 font-serif leading-relaxed text-center italic">
                {/* A beautiful moment captured in Makati... */}
              </p>
            </div>

            {/* Right Page */}
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-start bg-[#fdfbf7]">
              <h3 className="mb-6 font-serif italic text-gray-800 text-xl font-bold">March 18, 2026</h3>
              <div className="w-full relative bg-black rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                <video
                  className="w-full h-auto max-h-[300px] object-cover" // Reduced Height
                  controls
                  playsInline
                  onPlay={pauseMusic}
                  onPause={playMusic}
                  onEnded={playMusic}
                >
                  <source src={makatiCake} type="video/mp4" />
                </video>
              </div>
              <p className="mt-6 text-gray-700 font-serif leading-relaxed text-center italic">
                {/* Another year, another memory. */}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;