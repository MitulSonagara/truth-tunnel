import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Github } from "lucide-react";

interface Contributor {
  avatar_url: string;
  contributions: number;
  html_url: string; // GitHub profile
  login: string; // Contributor name
}

interface ContributorCardProps {
  contributor: Contributor;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ contributor }) => {
  return (
    <div className="flex items-center justify-center w-full">
    <Card className="w-full max-w-sm shadow-lg border border-gray-300 hover:shadow-2xl transition-transform transform hover:scale-105">
      <CardHeader className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
          <AvatarFallback>{contributor.login.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-semibold">{contributor.login}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {contributor.contributions} Contributions
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700">
          Thank you for your valuable contributions to our community! 
        </p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          onClick={() => window.open(contributor.html_url, "_blank")}
        >
          <Github className="h-5 w-5" />
          GitHub Profile
        </Button>
        {/* <Button variant="outline" className="hover:bg-blue-500 hover:text-white">
          <Linkedin className="h-5 w-5" />
          LinkedIn
        </Button> */}
      </CardFooter>
    </Card>
    </div>
  );
};

export default ContributorCard;
