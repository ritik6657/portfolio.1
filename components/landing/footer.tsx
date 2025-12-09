import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold">About</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We create exceptional digital experiences that drive growth.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Links</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Contact</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Email: ritikraghuwanshi@gmail.com
              <br />
              Phone:+91 7354487112
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
