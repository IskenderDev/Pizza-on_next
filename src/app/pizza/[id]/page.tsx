import PizzaDetail from "@/components/pizzaComponents/pizzaDetail/PizzaDetail";
import { PizzaService } from "@/services/pizzaService";
import { notFound } from "next/navigation";

interface PizzaPageProps {
  params: { id: string };
}

export default async function PizzaPage({ params }: PizzaPageProps) {
  const pizza = await PizzaService.fetchPizzaById(params.id);

  if (!pizza) {
    notFound(); 
  }

  return <PizzaDetail pizza={pizza} />;
}
