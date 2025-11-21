import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Trophy, Info, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

type StartScreenProps = {
  onStart: (playerName: string) => void;
  onViewLeaderboard: () => void;
};

export function StartScreen({ onStart, onViewLeaderboard }: StartScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStart = () => {
    const name = playerName.trim() || 'Anonymous Hacker';

    // 🔥 Save alias for backend submission later
    localStorage.setItem("player_alias", name);

    onStart(name);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 overflow-hidden">

      {/* Animated cyber background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1 bg-cyan-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {!showInstructions ? (
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <Card className="bg-slate-900/90 border-cyan-900 backdrop-blur-sm overflow-hidden">

              {/* Header */}
              <div className="relative bg-gradient-to-r from-cyan-950 to-blue-950 p-8 border-b border-cyan-800">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div
                  className="relative text-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div
                    className="inline-block text-6xl mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎮
                  </motion.div>

                  <h1 className="text-cyan-400 mb-2">CYBER HEIST</h1>

                  <motion.p
                    className="text-2xl text-cyan-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Break Into the Vault Before the System Locks Down
                  </motion.p>

                  <motion.div
                    className="flex justify-center gap-4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Badge className="bg-red-600">⏱️ 45 Minutes</Badge>
                    <Badge className="bg-amber-600">🧩 4 Rooms</Badge>
                    <Badge className="bg-green-600">🧠 Mind-Bending Puzzles</Badge>
                  </motion.div>
                </motion.div>
              </div>

              <div className="p-8 space-y-6">
                
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-2"
                >
                  <label className="text-slate-300 text-sm">
                    Enter Your Hacker Alias
                  </label>

                  <Input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Anonymous Hacker"
                    className="bg-slate-950 border-slate-700 text-lg h-12 text-white placeholder:text-slate-500"
                    maxLength={20}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleStart();
                    }}
                  />
                </motion.div>

                {/* Buttons */}
                <motion.div
                  className="grid gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button
                    onClick={handleStart}
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg h-14 group"
                  >
                    <Play className="size-5 mr-2 group-hover:scale-110 transition-transform" />
                    START HEIST
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setShowInstructions(true)}
                      variant="outline"
                      size="lg"
                      className="border-slate-700 hover:border-cyan-600"
                    >
                      <Info className="size-5 mr-2" />
                      How to Play
                    </Button>

                    <Button
                      onClick={onViewLeaderboard}
                      variant="outline"
                      size="lg"
                      className="border-slate-700 hover:border-amber-600"
                    >
                      <Trophy className="size-5 mr-2" />
                      Leaderboard
                    </Button>
                  </div>
                </motion.div>

              </div>
            </Card>
          </motion.div>
        ) : (
          /* Instructions Page */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* ...instructions markup unchanged... */}
          </motion.div>
        )}
      </div>
    </div>
  );
}
