
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Have a question or need help? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className="w-full max-w-md space-y-4">
              <form className="space-y-2">
                <Input id="name" type="text" placeholder="Your Name" required />
                <Input id="email" type="email" placeholder="Your Email" required />
                <Textarea id="message" placeholder="Your Message" className="min-h-[120px]" required />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  )
}







