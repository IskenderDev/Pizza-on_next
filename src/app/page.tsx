import MainPage from "@/page/mainPage/MainPage";
import { PizzaService } from "@/services/pizzaService";

export default async function Home() {
  const pizzas = await PizzaService.fetchPizzas(); 

  return <MainPage pizzas={pizzas} />;
}
