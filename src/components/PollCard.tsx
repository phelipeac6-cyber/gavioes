import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Poll } from "@/types";
import { showSuccess } from "@/utils/toast";

interface PollCardProps {
  poll: Poll;
}

export const PollCard = ({ poll }: PollCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption !== null) {
      setHasVoted(true);
      showSuccess("Voto computado com sucesso!");
      // Em um aplicativo real, você enviaria o voto para um servidor aqui.
    }
  };

  const getPercentage = (votes: number) => {
    // Adiciona o voto ao total para o cálculo da porcentagem após o voto
    const currentTotal = poll.totalVotes + (hasVoted ? 1 : 0);
    if (currentTotal === 0) return 0;
    
    const currentVotes = votes + (hasVoted && selectedOption === poll.options.find(o => o.id === selectedOption)?.id ? 1 : 0);
    return Math.round((currentVotes / currentTotal) * 100);
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{poll.question}</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasVoted ? (
          <div className="space-y-4">
            <RadioGroup onValueChange={(value) => setSelectedOption(Number(value))}>
              {poll.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={String(option.id)} id={`option-${poll.id}-${option.id}`} className="border-white text-red-500 focus:ring-red-500" />
                  <Label htmlFor={`option-${poll.id}-${option.id}`} className="text-base">{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleVote}
              disabled={selectedOption === null}
              className="w-full bg-white text-black font-bold rounded-lg hover:bg-gray-200 mt-4"
            >
              Votar
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {poll.options.map((option) => {
              const percentage = getPercentage(option.votes);
              return (
                <div key={option.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{option.text}</span>
                    <span className="text-sm text-gray-300">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            <p className="text-sm text-gray-400 text-center pt-4">Total de votos: {poll.totalVotes + 1}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};