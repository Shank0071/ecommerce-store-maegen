import Link from "next/link";
import Container from "./ui/container";
import { Facebook, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white border-t">
      <Container>
        <div className="flex flex-wrap gap-6 justify-between">
          <div className="p-4">
            <h3 className="font-bold text-xl">Quick Links</h3>
            <ul>
              <li>
                <Link
                  className="hover:text-blue-900 transition-colors"
                  href="#"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-900 transition-colors"
                  href="#"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-900 transition-colors"
                  href="#"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-900 transition-colors"
                  href="#"
                >
                  Return and Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-900 transition-colors"
                  href="#"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-xl">Contact</h3>
            <ul>
              <li>
                Mobile:{" "}
                <Link
                  className="hover:text-blue-900 transition-colors"
                  href="tel:9894712950"
                >
                  +91 9894712950
                </Link>{" "}
                <span className="hidden md:inline-block">(Primary)</span>
              </li>
              <li>
                Mobile:{" "}
                <Link
                  className="hover:text-blue-900 transition-colors"
                  href="tel:9994446822"
                >
                  +91 9894037570
                </Link>{" "}
              </li>
            </ul>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-xl my-1">Socials</h3>
            <div className="flex gap-1 ">
              <Link href="#">
                <img className="h-6 w-6" src="/instagram.svg" alt="instagram" />
              </Link>
              <Link href="#">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto py-10">
          <p className="text-center text-xs text-black">
            &copy; 2024 Maegen, All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
