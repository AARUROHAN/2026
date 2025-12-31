import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Mail, Home, Star, Calendar } from 'lucide-react';

const LoveWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [nameFound, setNameFound] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (canvasRef.current && currentPage === 'game') {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      setCtx(context);
      
      context.fillStyle = '#fff0f5';
      context.font = 'bold 48px Arial';
      context.textAlign = 'center';
      context.fillText('AARUHAN', canvas.width / 2, canvas.height / 2);
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'letter') {
      setTimeout(() => setLetterRevealed(true), 500);
    }
  }, [currentPage]);

  const startDrawing = (e) => {
    setDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setDrawing(false);
    ctx?.beginPath();
    checkIfNameRevealed();
  };

  const draw = (e) => {
    if (!drawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkIfNameRevealed = () => {
    const canvas = canvasRef.current;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    
    if (transparent / (pixels.length / 4) > 0.4) {
      setNameFound(true);
      setShowFireworks(true);
      setTimeout(() => setGameCompleted(true), 2000);
    }
  };

  const Firework = ({ delay }) => (
    <div 
      className="absolute animate-ping"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: '1.5s'
      }}
    >
      <Star className="text-yellow-400" size={32} fill="currentColor" />
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated starry background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20"
            size={Math.random() * 30 + 20}
            fill="currentColor"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              top: '100%'
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-100vh) rotate(360deg); }
        }
      `}</style>
      
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16 max-w-3xl w-full text-center relative z-10 border-4 border-pink-200">
        <div className="mb-6">
          <Calendar className="mx-auto text-purple-600 mb-4 animate-bounce" size={56} />
          <div className="text-6xl mb-2 animate-pulse">🎊</div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 mb-4 leading-tight">
          Happy New Year 2026
        </h1>
        
        <div className="my-8 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
        
        <p className="text-gray-700 text-xl md:text-2xl mb-6 font-medium leading-relaxed">
          My cututut puttt,
        </p>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          As we step into this new year together, I wanted to create something special that shows just how much you mean to me. This is more than just a website—it's a piece of my heart, wrapped up just for you.
        </p>
        
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl mb-8 border-2 border-pink-200">
          <p className="text-gray-700 text-lg italic">
            "In 2025 and every year that follows, I want to be the reason you smile, the hand you hold, and the heart that loves you unconditionally."
          </p>
        </div>
        
        <button
          onClick={() => setCurrentPage('game')}
          className="w-full bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 text-white py-5 rounded-full font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse"
        >
          Begin Our Journey Together ✨
        </button>
        
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(9)].map((_, i) => (
            <Heart
              key={i}
              className="text-red-500 animate-bounce"
              fill="currentColor"
              size={20}
              style={{animationDelay: `${i * 0.15}s`}}
            />
          ))}
        </div>
        
        <p className="mt-6 text-sm text-gray-500 italic">
          Made with endless love, just for you 💕
        </p>
      </div>
    </div>
  );

  const GamePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Firework key={i} delay={i * 0.2} />
          ))}
        </div>
      )}
      
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl w-full relative z-10">
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Home size={20} />
          Back
        </button>
        
        {!gameCompleted ? (
          <div>
            <div className="text-center mb-8">
              <Sparkles className="mx-auto text-yellow-500 mb-4 animate-spin" size={48} style={{animationDuration: '3s'}} />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                Find What's Hidden in My Heart
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Use your finger or mouse to gently scratch away the surface...<br/>
                What you'll find is the name that means everything to me 💝
              </p>
            </div>
            
            <div className="relative mb-6">
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full border-4 border-pink-400 rounded-2xl cursor-pointer touch-none shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              />
              {!nameFound && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <p className="text-white text-2xl font-bold opacity-50 animate-pulse">
                    Scratch here...
                  </p>
                </div>
              )}
            </div>
            
            {nameFound && (
              <div className="text-center animate-fadeIn space-y-4">
                <div className="text-6xl animate-bounce">💕</div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  Yes! That's you, my love!
                </p>
                <p className="text-gray-600 text-lg">
                  The most beautiful name in my world...
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center animate-fadeIn space-y-6 py-8">
            <div className="text-8xl animate-bounce">🎆</div>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              You Found It! 🎉
            </h2>
            <p className="text-2xl text-gray-700 font-medium">
              aarururururur... the name that makes my heart skip a beat
            </p>
            <div className="h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent my-6" />
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Now, let me share something I've been wanting to tell you...<br/>
              Something that comes straight from the deepest part of my soul.
            </p>
            <button
              onClick={() => setCurrentPage('letter')}
              className="mt-8 bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 text-white py-5 px-12 rounded-full font-bold text-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 shadow-lg animate-pulse"
            >
              Read My Heart 💌
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const LetterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gentle floating hearts in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-200 opacity-10"
            size={Math.random() * 40 + 20}
            fill="currentColor"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `gentleFloat ${Math.random() * 15 + 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 10}s`,
              top: '100%'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gentleFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.1; }
          90% { opacity: 0.1; }
          100% { transform: translateY(-110vh) rotate(180deg); opacity: 0; }
        }
      `}</style>
      
      <div className={`bg-white rounded-3xl shadow-2xl p-8 md:p-14 max-w-4xl w-full relative z-10 border-4 border-pink-300 transition-all duration-1000 ${letterRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Home size={20} />
          Back
        </button>
        
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <Mail className="mx-auto text-red-500 mb-4 animate-bounce" size={64} />
            <div className="absolute -top-2 -right-2 text-4xl animate-pulse">💝</div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 leading-tight">
            To My Beautiful wifeeee my loveee
          </h2>
          <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          <p className="text-gray-500 mt-4 text-lg italic">New Year 2025 • A Love Letter</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-10 rounded-3xl border-2 border-pink-200 shadow-inner">
            <p className="text-gray-800 text-xl md:text-2xl leading-relaxed mb-6 font-serif">
              Aaruhan, Meri Jaan, Mera Bacha,
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              I don't even know where to start, Aaruru! HAPPIEST 2ND NEW YEAR TOGETHER! Can you believe it? Two years with you—two incredible, beautiful years! 
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              You know what? On your birthday I showered you with love, but now I wanted to do something different, something special that you'll definitely love! I LOVE YOU SO MUCH, JANAN! But this New Year deserves something unique, something that shows you just how deeply you've touched my soul.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Do you remember the first time I heard your voice? Aaruru, from that very moment, I fell in love with you. And you know what? There hasn't been a single day when I haven't craved to talk to you, to hear your voice, to just be with you. I mean, what can I even say, beta? I LOVE YOU SO MUCH!
            </p>

            <div className="my-8 p-6 bg-white rounded-2xl border-l-4 border-pink-500 shadow-md">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "March 23rd, 2024 was the turning point of my life, Janan. That was the day I finally saw you, not just in photos, but right there in front of me..."
              </p>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Until that day, I had only seen your photos, imagined you, dreamed about you. But when I finally met you, when I saw you, Aaruru... I was acting so confident on the outside, being all "besharamm" because I thought I had to impress you. I even brought another guy with me, and honestly? I was so insecure! He was fairer than me, and I kept thinking "what if she likes him better?"
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              But then I saw you. Your eyes were down, and when you looked up at me, I saw the shyness in you too, Janan. I swear on everything, Aaruru, I got literal goosebumps. It felt like I had seen something divine, like my entire soul was showering in bliss. My hair stood on end, and even though my eyes were looking down, they kept finding their way back to you (and yes, okay, to your beautiful self 😄). I LOVE YOU SO MUCH, JANAN! When I was leaving, I kept looking back at you, I swear!
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              After that day, it felt like Shyam Baba, Nanak Ji, Guru Ji—all of them together aligned our destinies. Our love, Aarururu, you know what made it grow? Not just water and air like a plant, but our emotions, our ups and downs, our struggles, Janan. That's what made our love story what it is today—our two-year-old baby! You are more than anything to me, sweetheart. Money? Fame? I don't have much, but even if I had everything in the world without you, what would be the point?
            </p>

            <div className="my-8 text-center">
              <div className="text-6xl mb-4">💕</div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                YOU ARE MY WEALTH, SHONANA
              </p>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Beta, as long as I have you, I have everything. And without you, even with everything, I'd be in vairag. You are my wealth, Shonana! You know what wealth means? They say people spend their entire lives earning wealth to maintain their health. Well, I've already earned mine—YOU! I LOVE YOU SO MUCH, SHONANA!
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Since you came into my life, my timetable got fixed, all my bad habits disappeared—everything changed, beta! I have only the support of your love, your presence. You are my pooja, my amritvela, my meditation. What else can I say, Aaruru? Even Kalka Mai knows about us! I think everyone knows about us, and I truly believe that all the Gods are walking with us, protecting us. And of course, if Guru Ji is with us, then everything else is there too, right? He's so powerful, Dudu!
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              I've listened to so many satsangs, and Guru Ji listens to everyone, doesn't he? You know what I want? I want to stay glued to your chest 24/7, to take you everywhere with me. When I go to the office, I want you there to feed me. When I come home, I want to surprise you, Janan. After office, we'll do pooja together, sit together, roam together. Wake up together for amritvela, take care of everything together, Aaruru! I LOVE YOU SO MUCH, MERA BACHA, MERI GUDIYA!
            </p>

            <div className="my-8 p-6 bg-white rounded-2xl border-l-4 border-pink-500 shadow-md">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "Our first scene together—we could have stopped there, but it wasn't our decision, it was Bhagwan Ji's will that we kept coming together again and again, Janan."
              </p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              I just pray to Bhagwan that this year fills our lives with happiness. But I'm also scared because when happiness comes, sadness follows—like the two sides of a coin, heads and tails, Aaruru. I just want that if sadness comes, let us fight through it together, but Bhagwan Ji, please never let us be separated! I LOVE YOU SO MUCH, MERA BACHA! You are my everything, sachi beta!
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Look at everything we've faced together—it's all making our roots stronger! Bhagwan Ji, please, Janan has to keep tolerating my anger. I'm still such a baby, Dudu! You're so sensitive, and I'm probably 1000x worse! I know I have so many tantrums, please bear with me because I'm your bacha, right Janan?
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Mera bacha, this year, may all my luck, all my happiness go to you, meri gudiya! And all your sorrows, let them come to me, Aaruru, because I'm strong, hehe! I LOVE YOU SO MUCH, MERA BACHA! I know I can't give you princess treatment, you know how I am—a red forest guy, rough around the edges. I have so many flaws, but THANK YOU, THANK YOU SO MUCH for staying with me, for always loving me, Aaruru! I LOVE YOU SO MUCH, BETA!
            </p>

            <div className="my-8 text-center">
              <div className="text-6xl mb-4">❤️</div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                MERI GUDIYA, MERI DHADKAN
              </p>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Just a few more years, right? I LOVE YOU SO MUCH, MERA BACHA! My everything, my heart, my soul! HAPPY NEW YEAR, MY LADDOO! 🎊✨
            </p>

            <div className="text-center mt-10 pt-6 border-t-2 border-pink-200">
              <p className="text-gray-600 text-lg mb-3">Forever and always,</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 mb-4">
                Yours completely haina?
              </p>
              <div className="text-5xl">❤️</div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          {[...Array(15)].map((_, i) => (
            <Heart
              key={i}
              className="text-red-500 animate-pulse"
              fill="currentColor"
              size={28}
              style={{animationDelay: `${i * 0.15}s`}}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 italic text-lg">
            Happy New Year 2025, my love 🎆✨
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'game' && <GamePage />}
      {currentPage === 'letter' && <LetterPage />}
    </div>
  );
};

export default LoveWebsite;