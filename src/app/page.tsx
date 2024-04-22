import * as BreadCrumb from "@/components/ui/breadcrumb";
import ListPokemons from "@/components/pokemons/ListPokemons";

export default function Home() {
  return (
    <div className="space-y-6">
      <BreadCrumb.Breadcrumb>
        <BreadCrumb.BreadcrumbList>
          <BreadCrumb.BreadcrumbItem>
            <BreadCrumb.BreadcrumbPage>Pokedex</BreadCrumb.BreadcrumbPage>
          </BreadCrumb.BreadcrumbItem>
        </BreadCrumb.BreadcrumbList>
      </BreadCrumb.Breadcrumb>
      <ListPokemons />
    </div>
  );
}
