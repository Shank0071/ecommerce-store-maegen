import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";
import { MobileNav } from "./mobile-nav";

async function Navbar() {
  const categories = await getCategories();
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <div className="md:hidden">
            <MobileNav data={categories} />
          </div>
          <Link href="/" className="ml-4 flex lg:ml-0 self-center justify-self-center gap-x-2">
            <p className="font-bold text-xl">MAEGEN</p>
          </Link>
          <div className="hidden md:block">
            <MainNav data={categories} />
          </div>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
