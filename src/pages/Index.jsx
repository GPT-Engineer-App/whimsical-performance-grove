import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Cat } from 'lucide-react';

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  if (isLoading) return <Skeleton className="h-[100px] w-full" />;
  if (error) return <p>Error loading cat fact</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cat className="h-6 w-6" />
          Cat Fact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.fact}</p>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">All About Cats</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Why Cats Make Great Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Independent and low-maintenance</li>
                <li>Quiet and suitable for apartments</li>
                <li>Natural pest control</li>
                <li>Affectionate companions</li>
                <li>Long lifespan (12-18 years on average)</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Cat Breeds</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="secondary">Siamese</Badge>
              <Badge variant="secondary">Persian</Badge>
              <Badge variant="secondary">Maine Coon</Badge>
              <Badge variant="secondary">Bengal</Badge>
              <Badge variant="secondary">Sphynx</Badge>
              <Badge variant="secondary">British Shorthair</Badge>
              <Badge variant="secondary">Scottish Fold</Badge>
              <Badge variant="secondary">Ragdoll</Badge>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <img
            src="https://placekitten.com/800/400"
            alt="Cute cat"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        
        <CatFactCard />
      </div>
    </div>
  );
};

export default Index;