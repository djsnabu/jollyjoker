import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated blob background */}
      <div className="absolute inset-0 bg-black">
        {/* Large moving blobs */}
        <div className="hero-blob-1 absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="hero-blob-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet/20 blur-[120px]" />
        <div className="hero-blob-3 absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold/15 blur-[100px]" />

        {/* Extra accent blobs */}
        <div className="hero-blob-2 absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
        <div className="hero-blob-1 absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-violet/15 blur-[90px]" />

        {/* SVG wave overlay */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            className="animate-wave"
            fill="#7C3AED"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,213.3C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            className="animate-wave-slow"
            fill="#DC2626"
            fillOpacity="0.5"
            d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,224C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,176L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Decorative playing card suits - floating */}
        <div className="absolute top-20 left-10 text-4xl opacity-5 animate-float">♠</div>
        <div className="absolute top-40 right-20 text-5xl opacity-5 animate-float" style={{ animationDelay: "1s" }}>♥</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-5 animate-float" style={{ animationDelay: "2s" }}>♦</div>
        <div className="absolute bottom-20 right-10 text-5xl opacity-5 animate-float" style={{ animationDelay: "3s" }}>♣</div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-4">
          <span className="text-primary glow-red">JOLLY</span>{" "}
          <span className="text-gold glow-gold">JOKER</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-2 font-light">
          Porin kuumin yökerho
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Yrjönkatu 10, 28100 Pori
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/keikat"
            className="btn-glow bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-sm uppercase tracking-wider transition-all"
          >
            Keikat
          </Link>
          <Link
            href="/poytavaraus"
            className="border border-gold/50 hover:border-gold text-gold hover:bg-gold/10 font-bold py-3 px-8 rounded-lg text-sm uppercase tracking-wider transition-all"
          >
            Varaa pöytä
          </Link>
        </div>
      </div>
    </section>
  );
}
