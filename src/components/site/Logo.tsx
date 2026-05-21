import Link from "next/link";
const logoImg = "/assets/LogoIncuba.png";

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Incuba Cocina">
      <img src={logoImg} alt="Incuba Cocina" className="h-16 lg:h-20 w-auto object-contain transition-all duration-300" />
    </Link>
  );
}
